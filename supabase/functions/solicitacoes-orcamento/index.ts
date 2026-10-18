import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const requestLog = new Map<string, number[]>();

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const clean = (value: unknown, maxLength: number) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const checkRateLimit = (ip: string) => {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) return false;
  recent.push(now);
  requestLog.set(ip, recent);
  return true;
};

const validateCaptcha = async (token: string, remoteIp: string) => {
  const secret = Deno.env.get("TURNSTILE_SECRET_KEY");
  if (!secret) return token === "dev-7";

  if (!token) return false;
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token, remoteip: remoteIp }),
  });
  const result = await response.json();
  return result.success === true;
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Método não permitido." }, 405);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!checkRateLimit(ip)) return json({ error: "Muitas tentativas. Tente novamente mais tarde." }, 429);

  try {
    const body = await request.json();
    if (clean(body.website, 100)) return json({ ok: true });

    const captchaValid = await validateCaptcha(clean(body.captchaToken, 500), ip);
    if (!captchaValid) return json({ error: "CAPTCHA inválido." }, 400);

    const nome = clean(body.nome, 120);
    const email = clean(body.email, 180).toLowerCase();
    const telefone = clean(body.telefone, 40);
    const empresa = clean(body.empresa, 160);
    const origem = clean(body.origem, 160);
    const descricao = clean(body.descricao, 5000);
    const consentimentoMarketing = body.consentimentoMarketing === true;

    if (nome.length < 2) return json({ error: "Nome inválido." }, 400);
    if (!isValidEmail(email)) return json({ error: "E-mail inválido." }, 400);
    if (!origem) return json({ error: "Origem obrigatória." }, 400);
    if (descricao.length < 5) return json({ error: "Descrição inválida." }, 400);

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceRoleKey) return json({ error: "Serviço indisponível." }, 500);

    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { error } = await adminClient.from("solicitacoes_orcamento").insert({
      nome,
      email,
      telefone: telefone || null,
      empresa: empresa || null,
      origem,
      descricao,
      consentimento_marketing: consentimentoMarketing,
      consentimento_marketing_em: consentimentoMarketing ? new Date().toISOString() : null,
      metadados_auditoria: {
        canal: "landing_page",
        ip_hash_available: false,
        user_agent: request.headers.get("user-agent")?.slice(0, 500) ?? null,
      },
    });

    if (error) {
      console.error("solicitacoes_orcamento insert failed", error);
      return json({ error: "Não foi possível registrar a solicitação." }, 500);
    }

    return json({ ok: true });
  } catch (error) {
    console.error("solicitacoes-orcamento unexpected error", error);
    return json({ error: "Requisição inválida." }, 400);
  }
});
