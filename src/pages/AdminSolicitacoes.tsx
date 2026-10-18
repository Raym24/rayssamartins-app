import { useEffect, useState } from "react";
import { LogOut, RefreshCw, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const statuses = ["novo", "em_atendimento", "convertido", "cancelado", "arquivado"] as const;
type Status = (typeof statuses)[number];
type Solicitacao = {
  id: number;
  nome: string;
  email: string;
  telefone: string | null;
  empresa: string | null;
  origem: string;
  descricao: string;
  status: Status;
  observacoes: string | null;
  criado_em: string;
};

const db = supabase as any;

const AdminSolicitacoes = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState<any>(null);
  const [items, setItems] = useState<Solicitacao[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    const { data, error: queryError } = await db.from("solicitacoes_orcamento").select("*").order("criado_em", { ascending: false });
    if (queryError) setError("Não foi possível carregar as solicitações.");
    else setItems(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const current = data.session;
      if (current?.user.app_metadata?.role === "admin") {
        setSession(current);
        void load();
      }
    });
  }, []);

  const signIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError || data.session?.user.app_metadata?.role !== "admin") {
      await supabase.auth.signOut();
      setError("Credenciais inválidas ou acesso administrativo não autorizado.");
      return;
    }
    setSession(data.session);
    await load();
  };

  const update = async (id: number, patch: Partial<Pick<Solicitacao, "status" | "observacoes">>) => {
    const { error: updateError } = await db.from("solicitacoes_orcamento").update({ ...patch, atualizado_em: new Date().toISOString() }).eq("id", id);
    if (updateError) setError("Não foi possível salvar a alteração.");
    else setItems((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item));
  };

  if (!session) {
    return (
      <main className="min-h-screen bg-background px-6 py-16 text-foreground">
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="mb-8 flex items-center gap-3"><ShieldCheck className="text-primary" /><div><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Área privada</p><h1 className="text-2xl font-semibold">Solicitações</h1></div></div>
          <form onSubmit={signIn} className="grid gap-5">
            <label className="grid gap-2 text-sm font-medium">E-mail<input className="rounded-md border border-input bg-background px-3 py-2" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
            <label className="grid gap-2 text-sm font-medium">Senha<input className="rounded-md border border-input bg-background px-3 py-2" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
            {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
            <button className="rounded-md bg-primary px-4 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90">Entrar</button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Administração</p><h1 className="text-3xl font-semibold">Solicitações de orçamento</h1></div><div className="flex gap-2"><button onClick={() => void load()} className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm hover:bg-muted"><RefreshCw size={16} /> Atualizar</button><button onClick={() => void supabase.auth.signOut().then(() => setSession(null))} className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm hover:bg-muted"><LogOut size={16} /> Sair</button></div></header>
        {error && <p className="mb-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
        <div className="grid gap-4">{loading && <p className="text-muted-foreground">Carregando…</p>}{!loading && items.length === 0 && <div className="rounded-xl border border-border p-8 text-center text-muted-foreground">Nenhuma solicitação encontrada.</div>}{items.map((item) => <article key={item.id} className="rounded-xl border border-border bg-card p-6 shadow-sm"><div className="flex flex-wrap items-start justify-between gap-4"><div><h2 className="text-xl font-medium">{item.nome}</h2><p className="text-sm text-muted-foreground">{item.email}{item.telefone ? ` · ${item.telefone}` : ""}{item.empresa ? ` · ${item.empresa}` : ""}</p></div><select value={item.status} onChange={(event) => void update(item.id, { status: event.target.value as Status })} className="rounded-md border border-input bg-background px-3 py-2 text-sm">{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></div><p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed">{item.descricao}</p><p className="mt-3 text-xs uppercase tracking-[0.15em] text-muted-foreground">Origem: {item.origem}</p><textarea aria-label={`Observações de ${item.nome}`} defaultValue={item.observacoes ?? ""} onBlur={(event) => void update(item.id, { observacoes: event.target.value })} placeholder="Adicionar observações" className="mt-5 min-h-20 w-full rounded-md border border-input bg-background p-3 text-sm" /></article>)}</div>
      </div>
    </main>
  );
};

export default AdminSolicitacoes;
