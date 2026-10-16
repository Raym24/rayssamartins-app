import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, ImageIcon } from "lucide-react";
import medgestAsset from "@/assets/medgest.png.asset.json";
import poderAsset from "@/assets/opoderdaacao.png.asset.json";

const CONTACT_EMAIL = "rayssamartins33@gmail.com";

type Project = {
  title: string;
  category: string;
  scope: string;
  description: string;
  cover?: string;
  pages: string[];
};

// Substitua os campos vazios pelas imagens reais quando forem enviadas.
const projects: Project[] = [
  {
    title: "Agroamigo — Impactos Socioeconômicos na Agricultura Familiar",
    category: "Publicação institucional",
    scope: "Diagramação",
    description: "Publicação institucional com conteúdo extenso, organizada para leitura clara entre capítulos e seções.",
    pages: [],
  },
  {
    title: "Medgest PRO — Material educacional",
    category: "Material didático",
    scope: "Diagramação",
    description: "Material educacional estruturado com hierarquia visual consistente para facilitar o estudo.",
    cover: medgestAsset.url,
    pages: [],
  },
  {
    title: "Programa de Gestão e Vendas para Clínicas e Consultórios",
    category: "Apostila",
    scope: "Diagramação",
    description: "Conteúdo de programa de capacitação organizado em módulos, com padrão gráfico aplicado a todas as páginas.",
    pages: [],
  },
  {
    title: "O Poder da Ação",
    category: "Livro",
    scope: "Ajustes editoriais de texto no Adobe InDesign",
    description: "Refinamento de texto e composição em arquivo editorial existente no Adobe InDesign.",
    cover: poderAsset.url,
    pages: [],
  },
];

const services = [
  ["Livros impressos", "Miolo diagramado com padrão tipográfico consistente e arquivo preparado para a gráfica."],
  ["Apostilas e materiais didáticos", "Conteúdos organizados em módulos, com hierarquia que facilita o estudo."],
  ["E-books em PDF", "Publicações digitais pensadas para leitura confortável em tela."],
  ["Publicações institucionais e relatórios", "Documentos extensos apresentados com clareza e identidade."],
  ["Ajustes em arquivos existentes", "Refinamentos e correções em arquivos editoriais já diagramados."],
];

const differentials = [
  "Experiência em direção de arte e design",
  "Organização de conteúdos extensos",
  "Cuidado tipográfico",
  "Hierarquia visual e legibilidade",
  "Consistência entre capítulos e seções",
  "Preparação de arquivos conforme o destino da publicação",
];

const steps = [
  "Análise do material e levantamento do escopo.",
  "Proposta comercial e definição dos prazos.",
  "Definição do padrão gráfico e diagramação.",
  "Revisões conforme escopo contratado.",
  "Finalização e entrega dos arquivos acordados.",
];

const Placeholder = ({ label, className = "" }: { label: string; className?: string }) => (
  <div className={`flex flex-col items-center justify-center gap-2 border border-dashed border-input bg-secondary text-muted-foreground ${className}`}>
    <ImageIcon size={20} aria-hidden="true" />
    <span className="text-xs uppercase tracking-[0.15em]">{label}</span>
  </div>
);

type FormState = { name: string; email: string; whatsapp: string; type: string; pages: string; deadline: string; description: string };
const empty: FormState = { name: "", email: "", whatsapp: "", type: "", pages: "", deadline: "", description: "" };

const validate = (f: FormState) => {
  const e: Partial<Record<keyof FormState, string>> = {};
  if (f.name.trim().length < 2) e.name = "Informe seu nome.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Informe um e-mail válido.";
  if (f.whatsapp && f.whatsapp.replace(/\D/g, "").length < 10) e.whatsapp = "Informe o número com DDD.";
  if (!f.type) e.type = "Selecione o tipo de publicação.";
  if (f.description.trim().length < 10) e.description = "Descreva brevemente o projeto.";
  return e;
};

const ContactForm = () => {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [opened, setOpened] = useState(false);

  const set = (k: keyof FormState) => (ev: { target: { value: string } }) => setForm({ ...form, [k]: ev.target.value });

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length) return;
    const body = [
      `Nome: ${form.name}`, `E-mail: ${form.email}`, `WhatsApp: ${form.whatsapp || "-"}`,
      `Tipo de publicação: ${form.type}`, `Páginas (aprox.): ${form.pages || "-"}`, `Prazo desejado: ${form.deadline || "-"}`,
      "", form.description,
    ].join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Orçamento de diagramação — " + form.name)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  const field = "w-full border-0 border-b border-input bg-transparent py-3 text-base focus:border-foreground focus:outline-none focus:ring-0";
  const Err = ({ k }: { k: keyof FormState }) => errors[k] ? <p id={`${k}-err`} className="mt-1 text-sm text-destructive">{errors[k]}</p> : null;
  const aria = (k: keyof FormState) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined });

  return (
    <form onSubmit={submit} noValidate className="grid gap-8 md:grid-cols-2">
      <div><label htmlFor="name" className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Nome *</label><input id="name" className={field} value={form.name} onChange={set("name")} autoComplete="name" {...aria("name")} /><Err k="name" /></div>
      <div><label htmlFor="email" className="text-xs uppercase tracking-[0.15em] text-muted-foreground">E-mail *</label><input id="email" type="email" className={field} value={form.email} onChange={set("email")} autoComplete="email" {...aria("email")} /><Err k="email" /></div>
      <div><label htmlFor="whatsapp" className="text-xs uppercase tracking-[0.15em] text-muted-foreground">WhatsApp</label><input id="whatsapp" type="tel" className={field} value={form.whatsapp} onChange={set("whatsapp")} autoComplete="tel" {...aria("whatsapp")} /><Err k="whatsapp" /></div>
      <div>
        <label htmlFor="type" className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Tipo de publicação *</label>
        <select id="type" className={field} value={form.type} onChange={set("type")} {...aria("type")}>
          <option value="">Selecione</option>
          <option>Livro impresso</option><option>Apostila / material didático</option><option>E-book em PDF</option>
          <option>Publicação institucional / relatório</option><option>Ajustes em arquivo existente</option><option>Outro</option>
        </select><Err k="type" />
      </div>
      <div><label htmlFor="pages" className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Quantidade aproximada de páginas</label><input id="pages" inputMode="numeric" className={field} value={form.pages} onChange={set("pages")} /></div>
      <div><label htmlFor="deadline" className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Prazo desejado</label><input id="deadline" className={field} placeholder="Ex.: 30 dias" value={form.deadline} onChange={set("deadline")} /></div>
      <div className="md:col-span-2"><label htmlFor="description" className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Descrição do projeto *</label><textarea id="description" rows={4} className={`${field} resize-none`} value={form.description} onChange={set("description")} {...aria("description")} /><Err k="description" /></div>
      <div className="md:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 bg-primary px-8 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85">Solicitar proposta <ArrowRight size={16} /></button>
        <p className="text-sm text-muted-foreground" role="status">
          {opened ? "Seu aplicativo de e-mail foi aberto com a mensagem pronta. Basta enviá-la para concluir." : "Ao enviar, seu aplicativo de e-mail abrirá com a mensagem preenchida."}
        </p>
      </div>
    </form>
  );
};

const EditorialLanding = () => {
  const title = "Diagramação de Livros e Apostilas | Rayssa Martins";
  const description = "Diagramação profissional de livros, apostilas, e-books e publicações institucionais. Conheça projetos editoriais de Rayssa Martins.";
  const canonical = "https://rayssamartins.app/diagramacao-de-livros";
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="editorial-theme min-h-screen">
      <Helmet>
        <html lang="pt-BR" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&display=swap" />
      </Helmet>

      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="text-sm tracking-[0.1em]"><span className="font-serif-ed text-lg">Rayssa Martins</span> <span className="text-muted-foreground">— Design Editorial</span></Link>
          <button onClick={() => go("orcamento")} className="hidden text-sm underline-offset-4 hover:underline sm:block">Solicitar orçamento</button>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-7 flex flex-col justify-center">
            <p className="mb-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">Rayssa Martins — Design Editorial</p>
            <h1 className="font-serif-ed text-4xl font-light leading-[1.08] sm:text-5xl lg:text-6xl">Seu conteúdo merece uma apresentação à altura.</h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">Diagramação profissional de livros, apostilas e publicações. Design editorial que valoriza seu conteúdo, organiza a leitura e cuida de cada detalhe.</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => go("orcamento")} className="inline-flex min-h-12 items-center justify-center gap-2 bg-primary px-8 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85">Solicitar orçamento <ArrowRight size={16} /></button>
              <button onClick={() => go("projetos")} className="inline-flex min-h-12 items-center justify-center border border-foreground px-8 text-sm font-medium transition-colors hover:bg-secondary">Conhecer projetos</button>
            </div>
          </div>
          <div className="md:col-span-5">
            <img src={medgestAsset.url} alt="Medgest PRO — material educacional diagramado por Rayssa Martins" className="aspect-[4/5] w-full object-cover" decoding="async" />
          </div>
        </section>

        {/* Portfólio */}
        <section id="projetos" className="border-t border-border py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="font-serif-ed max-w-2xl text-3xl font-light leading-tight md:text-5xl">Projetos que ganham forma em cada página.</h2>
            <div className="mt-16 grid gap-x-10 gap-y-20 md:grid-cols-2">
              {projects.map((p, i) => (
                <article key={p.title} className={i % 2 === 1 ? "md:mt-24" : ""}>
                  {p.cover
                    ? <img src={p.cover} alt={`${p.title} — capa`} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
                    : <Placeholder label="Imagem de capa em breve" className="aspect-[4/3] w-full" />}
                  <div className="mt-3 grid grid-cols-3 gap-3">
                    {(p.pages.length ? p.pages : [null, null, null]).slice(0, 3).map((src, j) =>
                      src ? <img key={j} src={src} alt={`${p.title} — página interna ${j + 1}`} loading="lazy" className="aspect-[3/4] w-full object-cover" />
                          : <Placeholder key={j} label="Página" className="aspect-[3/4] w-full" />)}
                  </div>
                  <p className="mt-6 text-xs uppercase tracking-[0.15em] text-muted-foreground">{p.category}</p>
                  <h3 className="font-serif-ed mt-2 text-2xl font-normal leading-snug">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{p.description}</p>
                  <p className="mt-4 text-sm"><span className="text-muted-foreground">Atuação: </span>{p.scope}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section className="border-t border-border bg-card py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-12">
            <h2 className="font-serif-ed text-3xl font-light leading-tight md:col-span-5 md:text-5xl">Soluções editoriais para diferentes projetos.</h2>
            <ul className="md:col-span-7 divide-y divide-border border-y border-border">
              {services.map(([t, d], i) => (
                <li key={t} className="grid grid-cols-[3rem_1fr] gap-4 py-6">
                  <span className="font-serif-ed text-muted-foreground">0{i + 1}</span>
                  <div><h3 className="text-lg font-medium">{t}</h3><p className="mt-1 text-muted-foreground">{d}</p></div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="border-t border-border py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="font-serif-ed max-w-3xl text-3xl font-light leading-tight md:text-5xl">Design editorial é mais do que organizar páginas.</h2>
            <ul className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
              {differentials.map((d) => <li key={d} className="bg-background p-8 text-lg leading-snug">{d}</li>)}
            </ul>
          </div>
        </section>

        {/* Processo */}
        <section className="border-t border-border bg-card py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="font-serif-ed text-3xl font-light leading-tight md:text-5xl">Do original ao arquivo final.</h2>
            <ol className="mt-14 grid gap-10 md:grid-cols-5">
              {steps.map((s, i) => (
                <li key={s} className="border-t border-foreground pt-6">
                  <span className="font-serif-ed text-3xl font-light">{i + 1}</span>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{s}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Sobre */}
        <section className="border-t border-border py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-12 md:items-center">
            <Placeholder label="Fotografia profissional" className="aspect-[4/5] w-full md:col-span-5" />
            <div className="md:col-span-6 md:col-start-7">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Sobre a profissional</p>
              <h2 className="font-serif-ed mt-4 text-3xl font-light md:text-5xl">Rayssa Martins</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">Diretora de Arte Sênior, com atuação em design editorial, comunicação visual e projetos digitais. Mais de 10 anos de experiência criando projetos para marcas do Brasil, Estados Unidos e Portugal, com atenção à tipografia, à hierarquia e à consistência de cada publicação.</p>
              <Link to="/" className="mt-8 inline-flex items-center gap-2 text-sm underline underline-offset-4">Ver portfólio completo <ArrowRight size={14} /></Link>
            </div>
          </div>
        </section>

        {/* Formulário */}
        <section id="orcamento" className="border-t border-border bg-card py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-serif-ed mb-14 text-3xl font-light leading-tight md:text-5xl">Vamos dar forma ao seu próximo projeto?</h2>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p><span className="font-serif-ed text-base text-foreground">Rayssa Martins</span> — Design Editorial</p>
          <nav aria-label="Contatos e redes" className="flex flex-wrap gap-6">
            <Link to="/" className="hover:text-foreground">Portfólio principal</Link>
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-foreground">E-mail</a>
            <a href="https://wa.me/5585991706850" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">WhatsApp</a>
            <a href="https://www.behance.net/rayssamartins3" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Behance</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default EditorialLanding;
