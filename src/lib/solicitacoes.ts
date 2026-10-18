import { supabase } from "@/integrations/supabase/client";

export type SolicitacaoForm = {
  nome: string;
  email: string;
  telefone?: string;
  empresa?: string;
  origem: string;
  descricao: string;
  captchaToken: string;
  website?: string;
};

export async function enviarSolicitacao(form: SolicitacaoForm) {
  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/solicitacoes-orcamento`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    },
    body: JSON.stringify(form),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error ?? "Não foi possível enviar a solicitação.");
  return result as { ok: true };
}

export async function getCurrentAdminSession() {
  const { data } = await supabase.auth.getSession();
  const session = data.session;
  return session && session.user.app_metadata?.role === "admin" ? session : null;
}
