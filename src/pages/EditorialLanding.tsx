import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowUpRight, BookOpen, Building2, Check, GraduationCap, MessageCircle, Pause, PenLine, Play, Plus, type LucideIcon } from "lucide-react";

const CONTACT_EMAIL = "rayssamartins33@gmail.com";
const WHATSAPP_NUMBER = "5585991706850";
const SITE = "https://rayssamartins.app";
const CANONICAL = `${SITE}/diagramacao-de-livros`;

/** Link do WhatsApp com mensagem pré-preenchida. */
const wa = (text = "Olá, Rayssa! Vim pela página de diagramação e gostaria de um orçamento.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

type Project = {
  title: string;
  subtitle?: string;
  category: string;
  scope: string;
  description: string;
  /** Nome-base do mockup em /public/editorial (PNG original + WebP otimizado com a mesma transparência). */
  cover: string;
};

const projects: Project[] = [
  {
    title: "Agroamigo",
    subtitle: "Impactos Socioeconômicos na Agricultura Familiar",
    category: "Publicação institucional",
    scope: "Diagramação",
    description: "Publicação institucional com conteúdo extenso, organizada para leitura clara entre capítulos e seções.",
    cover: "01_agroamigo",
  },
  {
    title: "Medgest PRO",
    subtitle: "Material educacional",
    category: "Material didático",
    scope: "Design completo e diagramação",
    description: "Material educacional estruturado com hierarquia visual consistente para facilitar o estudo.",
    cover: "02_medgest_pro",
  },
  {
    title: "Programa de Gestão e Vendas",
    subtitle: "para Clínicas e Consultórios",
    category: "Apostila",
    scope: "Criação da capa, design completo e diagramação",
    description: "Conteúdo de programa de capacitação organizado em módulos, com padrão gráfico aplicado a todas as páginas.",
    cover: "03_programa_gestao_vendas",
  },
  {
    title: "O Poder da Ação",
    category: "Livro",
    scope: "Ajustes editoriais de texto no Adobe InDesign",
    description: "Refinamento de texto e composição em arquivo editorial existente no Adobe InDesign.",
    cover: "04_o_poder_da_acao",
  },
];

const audienceIcons: LucideIcon[] = [PenLine, BookOpen, Building2, GraduationCap];
const audiences = [
  ["Autores independentes", "Seu livro com padrão profissional, pronto para a gráfica ou para publicação em PDF."],
  ["Editoras", "Diagramação consistente do miolo e ajustes em arquivos editoriais já existentes."],
  ["Empresas e instituições", "Relatórios e publicações institucionais extensos, apresentados com clareza e identidade."],
  ["Cursos e educadores", "Apostilas e materiais didáticos organizados em módulos, com hierarquia que favorece o estudo."],
];

type Pack = { name: string; lead: string; items: string[]; example?: string; featured?: boolean };
const packs: Pack[] = [
  {
    name: "Diagramação",
    lead: "Para quem já tem o padrão visual definido e precisa da composição profissional das páginas.",
    items: ["Composição de todo o miolo", "Padrão tipográfico consistente", "Arquivo preparado para gráfica ou leitura digital"],
  },
  {
    name: "Projeto gráfico + diagramação",
    lead: "Para quem precisa criar a linguagem visual da publicação, além de diagramá⁠-⁠la.",
    items: ["Grid, tipografia e estilos da publicação", "Aberturas de capítulo, tabelas e gráficos", "Aplicação do padrão em todas as páginas"],
    example: "Medgest PRO",
  },
  {
    name: "Capa + projeto completo",
    lead: "Para quem quer a publicação inteira com uma única direção de arte, da capa à última página.",
    items: ["Design de capa e lombada", "Projeto gráfico e diagramação", "Unidade visual do início ao fim"],
    example: "Programa de Gestão e Vendas",
    featured: true,
  },
];

const formats = ["Livros impressos", "Apostilas e materiais didáticos", "E-books em PDF", "Publicações institucionais e relatórios"];

const differentials = [
  "Organização de conteúdos extensos",
  "Cuidado tipográfico",
  "Hierarquia visual e legibilidade",
  "Consistência entre capítulos e seções",
  "Experiência em direção de arte e design editorial",
  "Preparação de arquivos conforme o destino da publicação",
];

const steps = [
  ["Análise do material", "Leitura do conteúdo, formato e objetivo da publicação."],
  ["Definição de escopo e prazos", "Proposta comercial clara, com etapas e entregas."],
  ["Direção gráfica e diagramação", "Criação do padrão editorial e aplicação em todo o miolo."],
  ["Revisões", "Ajustes conforme o escopo contratado."],
  ["Finalização e entrega", "Arquivos preparados para impressão ou leitura digital."],
];

const faqs = [
  ["Quanto custa diagramar um livro ou uma apostila?",
    "O valor depende da quantidade de páginas, da complexidade do conteúdo (tabelas, imagens, gráficos) e do prazo. Envie essas informações e você recebe uma proposta clara, com escopo, etapas e entregas."],
  ["Quanto tempo leva?",
    "O prazo é definido na proposta, de acordo com o volume e a complexidade do material. Se você já tem uma data de lançamento ou de envio para a gráfica, informe logo no primeiro contato."],
  ["O que eu preciso enviar para começar?",
    "O conteúdo da publicação e as imagens que farão parte dela. Na análise do material, definimos juntos o formato, o destino (impresso ou digital) e o que mais for necessário."],
  ["Você também cria a capa?",
    "Sim. Além da diagramação, é possível contratar a capa e o projeto gráfico completo da publicação, como no Programa de Gestão e Vendas."],
  ["Em que formato recebo os arquivos?",
    "Os arquivos são preparados conforme o destino da publicação: para impressão na gráfica ou para leitura digital."],
  ["Quantas revisões estão incluídas?",
    "As rodadas de revisão são definidas no escopo da proposta, antes do início do projeto, para que você saiba exatamente o que está incluído."],
];

/** Adds .is-visible to every [data-reveal] element once it enters the viewport. */
const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".editorial-theme [data-reveal]");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("is-visible")); return; }
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
    }), { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
};

/**
 * Livro do hero com páginas reais do Medgest PRO.
 * Páginas pares ficam à esquerda (verso) e ímpares à direita (recto):
 * spread inicial 4 | 7 → a folha da p. 7 vira → spread 4 | 11 → volta.
 * A animação pausa fora da tela, com a aba oculta ou quando o visitante pede.
 */
const BookHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [autoPaused, setAutoPaused] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let inView = true;
    const sync = () => setAutoPaused(!inView || document.hidden);
    const io = "IntersectionObserver" in window
      ? new IntersectionObserver(([e]) => { inView = e.isIntersecting; sync(); }, { threshold: 0.1 })
      : null;
    io?.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => { io?.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, []);

  const left = "/editorial/hero_left.webp", right = "/editorial/hero_right.webp", next = "/editorial/hero_next.webp";
  const Page = ({ p, className, eager }: { p: string; className: string; eager?: boolean }) => (
    <img className={`ed-page ${className}`} src={p} alt="" width={760} height={1075} decoding="async"
      loading={eager ? "eager" : "lazy"} {...(eager ? { fetchpriority: "high" } : {})} />
  );

  return (
    <figure className="m-0">
      <div
        ref={ref}
        className={`ed-book ${userPaused || autoPaused ? "is-paused" : ""}`}
        role="img"
        aria-label="Livro Medgest PRO aberto, com páginas reais diagramadas sendo folheadas"
      >
        <div className="ed-spread">
          <Page p={left} className="ed-page-l" eager />
          <Page p={next} className="ed-page-r" />
          <div className="ed-leaf" aria-hidden="true">
            <Page p={right} className="ed-page-r" eager />
            <Page p={left} className="ed-leaf-back" />
          </div>
        </div>
      </div>
      <figcaption className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        <span><span className="text-accent">Fig. 01</span> — Acervo editorial · Projetos reais</span>
        <button
          type="button"
          onClick={() => setUserPaused((v) => !v)}
          aria-pressed={userPaused}
          className="ed-book-toggle uppercase tracking-[0.25em] transition-colors hover:text-accent"
        >
          {userPaused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
          {userPaused ? "Retomar animação" : "Pausar animação"}
        </button>
      </figcaption>
    </figure>
  );
};

const ScrollProgress = () => {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return <div aria-hidden="true" className="fixed inset-x-0 top-0 z-50 h-[2px]"><div ref={bar} className="ed-progress h-full bg-accent" /></div>;
};

/** Botão flutuante de WhatsApp: aparece depois do hero e some quando o formulário está na tela. */
const FloatingWhatsApp = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let pastHero = false, formVisible = false, raf = 0;
    const sync = () => setShow(pastHero && !formVisible);
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { raf = 0; pastHero = window.scrollY > window.innerHeight * 0.8; sync(); });
    };
    const form = document.getElementById("orcamento");
    const io = form && "IntersectionObserver" in window
      ? new IntersectionObserver(([e]) => { formVisible = e.isIntersecting; sync(); }, { threshold: 0.05 })
      : null;
    if (form) io?.observe(form);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); io?.disconnect(); cancelAnimationFrame(raf); };
  }, []);
  return (
    <a
      href={wa()}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      className={`ed-float fixed bottom-4 right-4 z-40 inline-flex min-h-12 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-medium text-background shadow-lg ring-1 ring-white/25 transition-[opacity,transform,background-color] duration-300 hover:bg-accent sm:px-5 sm:bottom-6 sm:right-6 ${show ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
    >
      <MessageCircle size={18} aria-hidden="true" />
      <span className="sm:hidden">WhatsApp</span><span className="hidden sm:inline">Orçamento pelo WhatsApp</span>
      <span className="sr-only"> — pedir orçamento (abre em nova aba)</span>
    </a>
  );
};

const Eyebrow = ({ n, children }: { n: string; children: string }) => (
  <p className="flex items-center gap-4 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
    <span className="font-serif-ed text-sm normal-case tracking-normal text-accent">{n}</span>
    <span className="h-px w-10 bg-current opacity-50" aria-hidden="true" />
    {children}
  </p>
);

const NewTab = () => <span className="sr-only"> (abre em nova aba)</span>;

const btnPrimary = "ed-btn-primary group inline-flex min-h-12 items-center justify-center gap-3 bg-accent px-7 text-sm font-medium tracking-wide text-accent-foreground transition-colors duration-300 hover:bg-primary";
const btnText = "inline-flex min-h-12 items-center justify-center text-sm underline decoration-accent underline-offset-[6px] transition-colors hover:text-accent";

type FormState = { name: string; type: string; pages: string; deadline: string; description: string };
const empty: FormState = { name: "", type: "", pages: "", deadline: "", description: "" };

const validate = (f: FormState) => {
  const e: Partial<Record<keyof FormState, string>> = {};
  if (f.name.trim().length < 2) e.name = "Informe seu nome.";
  if (!f.type) e.type = "Selecione o tipo de publicação.";
  return e;
};

const ContactForm = () => {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sent, setSent] = useState<"" | "whatsapp" | "email">("");

  const set = (k: keyof FormState) => (ev: { target: { value: string } }) => {
    const value = ev.target.value;
    setForm((f) => ({ ...f, [k]: value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const submit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const e = validate(form);
    setErrors(e);
    const first = (Object.keys(empty) as (keyof FormState)[]).find((k) => e[k]);
    if (first) { ev.currentTarget.querySelector<HTMLElement>(`#${first}`)?.focus(); return; }

    const channel = (ev.nativeEvent as SubmitEvent).submitter?.getAttribute("value") === "email" ? "email" : "whatsapp";
    const lines = [
      `Olá, Rayssa! Meu nome é ${form.name.trim()} e gostaria de um orçamento.`,
      `Tipo de publicação: ${form.type}`,
      form.pages && `Páginas (aprox.): ${form.pages}`,
      form.deadline && `Prazo desejado: ${form.deadline}`,
      form.description.trim() && `\n${form.description.trim()}`,
    ].filter(Boolean).join("\n");

    if (channel === "whatsapp") window.open(wa(lines), "_blank", "noopener,noreferrer");
    else window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Orçamento de diagramação — " + form.name.trim())}&body=${encodeURIComponent(lines)}`;
    setSent(channel);
  };

  const field = "w-full border-0 border-b border-input bg-transparent py-3 font-serif-ed text-xl font-light placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none focus:ring-0";
  const lbl = "text-[11px] uppercase tracking-[0.22em] text-muted-foreground";
  const Err = ({ k }: { k: keyof FormState }) => errors[k] ? <p id={`${k}-err`} className="mt-2 text-sm text-destructive">{errors[k]}</p> : null;
  const aria = (k: keyof FormState) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined });
  const req = { required: true, "aria-required": true } as const;

  return (
    <form onSubmit={submit} noValidate aria-label="Solicitação de orçamento editorial" className="grid gap-x-12 gap-y-10 md:grid-cols-2">
      <p className="text-sm text-muted-foreground md:col-span-2">Leva menos de um minuto. Campos com * são obrigatórios.</p>
      <div><label htmlFor="name" className={lbl}>Nome *</label><input id="name" className={field} value={form.name} onChange={set("name")} autoComplete="name" {...req} {...aria("name")} /><Err k="name" /></div>
      <div>
        <label htmlFor="type" className={lbl}>Tipo de publicação *</label>
        <select id="type" className={field} value={form.type} onChange={set("type")} {...req} {...aria("type")}>
          <option value="">Selecione</option>
          <option>Livro impresso</option><option>Apostila / material didático</option><option>E-book em PDF</option>
          <option>Publicação institucional / relatório</option><option>Capa + projeto gráfico completo</option>
          <option>Ajustes em arquivo existente</option><option>Outro</option>
        </select><Err k="type" />
      </div>
      <div><label htmlFor="pages" className={lbl}>Quantidade aproximada de páginas</label><input id="pages" inputMode="numeric" className={field} value={form.pages} onChange={set("pages")} /></div>
      <div><label htmlFor="deadline" className={lbl}>Prazo desejado</label><input id="deadline" className={field} placeholder="Ex.: 30 dias" value={form.deadline} onChange={set("deadline")} /></div>
      <div className="md:col-span-2"><label htmlFor="description" className={lbl}>Conte um pouco sobre o projeto</label><textarea id="description" rows={3} className={`${field} resize-none`} placeholder="Opcional" value={form.description} onChange={set("description")} /></div>
      <div className="flex flex-col gap-5 md:col-span-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
          <button type="submit" value="whatsapp" className={`${btnPrimary} whitespace-nowrap`}>
            <MessageCircle size={16} aria-hidden="true" /> Enviar pelo WhatsApp
          </button>
          <button type="submit" value="email" className={`${btnText} min-h-11`}>Prefiro enviar por e-mail</button>
        </div>
        <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
          {sent === "whatsapp" && "O WhatsApp foi aberto com a mensagem pronta. Basta enviá-la para concluir."}
          {sent === "email" && "Seu aplicativo de e-mail foi aberto com a mensagem pronta. Basta enviá-la para concluir."}
          {!sent && "Sua mensagem chega já preenchida. Você só confirma o envio."}
        </p>
      </div>
    </form>
  );
};

const EditorialLanding = () => {
  const title = "Diagramação de Livros, Apostilas e E-books | Rayssa Martins";
  const description = "Diagramação profissional de livros, apostilas, e-books e publicações institucionais, com capa e projeto gráfico. Projetos editoriais de Rayssa Martins, Diretora de Arte Sênior.";
  const ogImage = `${SITE}/editorial/og-diagramacao.jpg`;
  useReveal();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Rayssa Martins — Design Editorial",
      url: CANONICAL,
      image: ogImage,
      email: CONTACT_EMAIL,
      telephone: "+55 85 99170-6850",
      address: { "@type": "PostalAddress", addressLocality: "Fortaleza", addressRegion: "CE", addressCountry: "BR" },
      areaServed: "BR",
      serviceType: ["Diagramação de livros", "Diagramação de apostilas", "E-books em PDF", "Projeto gráfico editorial", "Design de capa"],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
  ];

  return (
    <div className="editorial-theme min-h-screen overflow-x-clip">
      <a href="#conteudo" className="ed-skip">Pular para o conteúdo</a>
      <ScrollProgress />
      <Helmet>
        <html lang="pt-BR" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={CANONICAL} />
        <link rel="alternate" hrefLang="pt-BR" href={CANONICAL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&display=swap" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Topo */}
      <header className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-6 pb-5 pt-8 md:px-10">
        <Link to="/" className="leading-tight">
          <span className="block font-serif-ed text-lg">Rayssa Martins<span className="text-accent">.</span></span>
          <span className="block text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Design Editorial</span>
        </Link>
        <nav aria-label="Seções da página" className="hidden items-center gap-8 text-sm lg:flex">
          <a href="#projetos" className="ed-link">Projetos</a>
          <a href="#servicos" className="ed-link">Serviços</a>
          <a href="#processo" className="ed-link">Processo</a>
          <a href="#duvidas" className="ed-link">Dúvidas</a>
        </nav>
        <a href="#orcamento" className="inline-flex min-h-11 items-center text-sm underline decoration-accent underline-offset-[6px] transition-colors hover:text-accent">
          Solicitar orçamento
        </a>
      </header>
      <div className="mx-auto max-w-7xl px-6 md:px-10"><div className="h-px bg-foreground/80" /></div>

      <main id="conteudo" tabIndex={-1} className="focus:outline-none">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-6 pb-20 pt-12 md:px-10 md:pb-28 md:pt-16">
          <div className="ed-rise flex justify-between text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            <span className="flex items-center gap-3"><span className="h-2 w-2 bg-accent" aria-hidden="true" />Livros · Apostilas · E-books</span>
            <span className="hidden sm:inline">Fortaleza — Brasil</span>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <p style={{ animationDelay: "80ms" }} className="ed-rise font-serif-ed text-lg italic text-muted-foreground md:text-xl">
                Seu livro começa muito antes da primeira página.
              </p>
              <h1 style={{ animationDelay: "160ms" }} className="ed-rise mt-5 font-serif-ed text-[2.5rem] font-light leading-[1.04] tracking-[-0.02em] sm:text-[3.5rem] lg:text-[4.25rem]">
                Diagramação de livros, apostilas e <span className="whitespace-nowrap">e-books</span> <em className="italic">prontos para</em> <span className="text-accent">imprimir e publicar</span>.
              </h1>
              <div style={{ animationDelay: "320ms" }} className="ed-rise mt-10 grid gap-8 sm:grid-cols-[auto_1fr] sm:gap-10">
                <span className="hidden font-serif-ed text-sm text-accent sm:block" aria-hidden="true">§</span>
                <div>
                  <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
                    Projetos editoriais pensados para valorizar o conteúdo, organizar a leitura e transformar informação em experiência, da capa à última página.
                  </p>
                  <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
                    <a href={wa()} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                      <MessageCircle size={16} aria-hidden="true" /> Pedir orçamento pelo WhatsApp<NewTab />
                    </a>
                    <a href="#projetos" className={btnText}>Ver projetos</a>
                  </div>
                  <dl className="mt-12 grid grid-cols-1 gap-y-5 border-t border-border pt-6 sm:grid-cols-3 sm:gap-x-6">
                    {[
                      ["+10 anos", "em direção de arte e design"],
                      ["Brasil · EUA · Portugal", "marcas atendidas"],
                      ["Capa, projeto gráfico", "e diagramação"],
                    ].map(([a, b]) => (
                      <div key={a}>
                        <dt className="font-serif-ed text-xl font-light leading-tight">{a}</dt>
                        <dd className="mt-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{b}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>

            {/* Vitrine editorial — livro com páginas reais */}
            <div style={{ animationDelay: "480ms" }} className="ed-rise relative self-center lg:col-span-5 lg:-mr-4 xl:-mr-10">
              <span aria-hidden="true" className="absolute -left-1 -top-5 h-6 w-6 border-l-2 border-t-2 border-accent sm:-left-3" />
              <BookHero />
            </div>
          </div>
        </section>

        {/* Projetos */}
        <section id="projetos" className="border-t border-border py-20 md:py-32">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="grid gap-8 md:grid-cols-12">
              <div className="md:col-span-7">
                <Eyebrow n="01">Portfólio</Eyebrow>
                <h2 className="mt-6 font-serif-ed text-4xl font-light leading-[1.05] tracking-[-0.01em] md:text-6xl">Projetos selecionados</h2>
              </div>
              <p className="self-end text-lg leading-relaxed text-muted-foreground md:col-span-4 md:col-start-9">
                Publicações desenvolvidas com atenção à leitura, à hierarquia visual e à consistência editorial.
              </p>
            </div>

            <div className="mt-16 space-y-20 md:mt-20 md:space-y-28">
              {projects.map((p, i) => {
                const flip = i % 2 === 1;
                return (
                  <article key={p.title} data-reveal className="ed-reveal group grid gap-8 border-t border-foreground pt-6 md:grid-cols-12 md:gap-10">
                    <div className="flex items-start justify-between text-[11px] uppercase tracking-[0.25em] text-muted-foreground md:col-span-12">
                      <span><span className="font-serif-ed text-base tracking-normal text-accent">{String(i + 1).padStart(2, "0")}</span><span aria-hidden="true"> / {String(projects.length).padStart(2, "0")}</span></span>
                      <span>{p.category}</span>
                    </div>

                    <div className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}>
                      <div className="ed-img-reveal ed-mockup mx-auto w-full max-w-[760px]">
                        <picture>
                          <source type="image/webp" sizes="(min-width: 768px) 58vw, 100vw"
                            srcSet={`/editorial/${p.cover}-960.webp 960w, /editorial/${p.cover}.webp 1448w`} />
                          <img src={`/editorial/${p.cover}.png`} alt={`Mockup editorial do projeto ${p.title}: capa e páginas internas diagramadas`}
                            loading="lazy" decoding="async" width={1448} height={1086}
                            className="block aspect-[4/3] h-auto w-full object-contain transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.02]" />
                        </picture>
                      </div>
                    </div>

                    <div className={`flex flex-col md:col-span-4 md:self-center ${flip ? "md:order-1 md:col-start-1" : "md:col-start-9"}`}>
                      <h3 className="font-serif-ed text-3xl font-light leading-tight transition-colors duration-500 group-hover:text-accent md:text-4xl">{p.title}</h3>
                      {p.subtitle && <p className="mt-2 font-serif-ed text-lg italic text-muted-foreground">{p.subtitle}</p>}
                      <p className="mt-6 leading-relaxed text-muted-foreground">{p.description}</p>
                      <dl className="mt-8 border-t border-border pt-4 text-sm">
                        <dt className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Atuação</dt>
                        <dd className="mt-1">{p.scope}</dd>
                      </dl>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Chamada intermediária */}
            <aside data-reveal aria-label="Pedir orçamento" className="ed-reveal ed-dark relative isolate mt-24 grid gap-8 overflow-hidden rounded-2xl p-8 md:mt-32 md:grid-cols-12 md:items-center md:p-12">
              <span aria-hidden="true" className="ed-glow ed-glow-cta" />
              <div className="md:col-span-7">
                <p className="font-serif-ed text-3xl font-light leading-tight md:text-4xl">
                  Tem um livro, apostila ou e-book <em className="italic text-accent">para diagramar</em>?
                </p>
                <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
                  Conte o formato e a quantidade aproximada de páginas e receba uma proposta clara, com escopo, etapas e entregas.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:col-span-4 md:col-start-9 md:items-end">
                <a href={wa()} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                  <MessageCircle size={16} aria-hidden="true" /> Falar no WhatsApp<NewTab />
                </a>
                <a href="#orcamento" className={btnText}>Ou preencha o formulário</a>
              </div>
            </aside>
          </div>
        </section>

        {/* Para quem é */}
        <section className="relative isolate overflow-hidden border-t border-border py-20 md:py-32">
          <span aria-hidden="true" className="ed-glow ed-glow-soft ed-glow-soft-r" />
          <div data-reveal className="ed-reveal mx-auto max-w-7xl px-6 md:px-10">
            <Eyebrow n="02">Para quem é</Eyebrow>
            <h2 className="mt-6 max-w-3xl font-serif-ed text-4xl font-light leading-[1.05] md:text-6xl">Publicações de quem leva o conteúdo a sério</h2>
            <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {audiences.map(([t, d], i) => {
                const Icon = audienceIcons[i];
                return (
                  <li key={t} className="ed-card-light flex flex-col p-7">
                    <span className="ed-icon" aria-hidden="true"><Icon size={18} strokeWidth={1.75} /></span>
                    <h3 className="mt-8 font-serif-ed text-2xl font-light leading-snug">{t}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{d}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Serviços — formas de contratar (cards em vidro) */}
        <section id="servicos" className="ed-glass-scene relative isolate overflow-hidden bg-primary py-20 text-primary-foreground md:py-32">
          <span aria-hidden="true" className="ed-glow ed-glow-a" />
          <span aria-hidden="true" className="ed-glow ed-glow-b" />
          <div data-reveal className="ed-reveal mx-auto max-w-7xl px-6 md:px-10">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="max-w-xl lg:col-span-6 [&_p]:text-primary-foreground/70">
                <Eyebrow n="03">Serviços</Eyebrow>
                <h2 className="mt-6 font-serif-ed text-4xl font-light leading-[1.05] md:text-5xl">Escolha até onde o projeto de diagramação profissional vai<span className="text-accent">.</span></h2>
              </div>
              <p className="self-end leading-relaxed text-primary-foreground/70 lg:col-span-5 lg:col-start-8">
                Da diagramação de um conteúdo já definido à publicação completa, com capa e projeto gráfico sob uma única direção de arte.
              </p>
            </div>

            <ol className="mt-16 grid gap-5 lg:grid-cols-3 lg:items-stretch lg:gap-6">
              {packs.map((pk, i) => (
                <li key={pk.name} className={`ed-glass group/card relative flex flex-col p-7 md:p-8 lg:p-9 ${pk.featured ? "ed-glass-featured" : ""}`}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="ed-chip">Pacote {String(i + 1).padStart(2, "0")}</span>
                    {pk.featured && <span className="ed-chip ed-chip-accent">Mais completo</span>}
                  </div>
                  <h3 className="mt-8 font-serif-ed text-3xl font-light leading-tight">{pk.name}</h3>
                  <p className="mt-4 leading-relaxed text-primary-foreground/70">{pk.lead}</p>
                  <ul className="mt-8 space-y-4 border-t border-primary-foreground/10 pt-7 text-sm">
                    {pk.items.map((it) => (
                      <li key={it} className="flex items-start gap-3">
                        <span className="ed-check" aria-hidden="true"><Check size={12} strokeWidth={2.5} /></span>
                        <span className="pt-0.5">{it}</span>
                      </li>
                    ))}
                  </ul>
                  {pk.example && (
                    <p className="mt-7 text-[11px] uppercase tracking-[0.2em] text-primary-foreground/55">
                      Exemplo <span className="text-primary-foreground/85">· {pk.example}</span>
                    </p>
                  )}
                  <div className="mt-auto pt-8">
                  <a href={wa(`Olá, Rayssa! Gostaria de um orçamento de ${pk.name.toLowerCase()}.`)} target="_blank" rel="noopener noreferrer"
                    className={`inline-flex min-h-12 w-full items-center justify-center gap-2 text-sm font-medium transition-colors duration-300 ${pk.featured ? "bg-accent text-accent-foreground hover:bg-background hover:text-foreground" : "ed-glass-btn"}`}
>
                    Pedir orçamento <ArrowUpRight size={15} aria-hidden="true" className="transition-transform duration-300 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5" />
                    <span className="sr-only"> de {pk.name} pelo WhatsApp (abre em nova aba)</span>
                  </a>
                  </div>
                </li>
              ))}
            </ol>

            <div className="ed-glass mt-6 flex flex-col gap-4 px-7 py-5 text-sm text-primary-foreground/75 lg:flex-row lg:items-center lg:justify-between lg:px-9">
              <p><span className="mr-3 text-[11px] uppercase tracking-[0.22em] text-primary-foreground/50">Formatos</span>{formats.join(" · ")}</p>
              <p>Também faço ajustes em arquivos editoriais existentes.</p>
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="relative isolate overflow-hidden py-20 md:py-32">
          <span aria-hidden="true" className="ed-glow ed-glow-soft ed-glow-soft-l" />
          <div data-reveal className="ed-reveal mx-auto max-w-7xl px-6 md:px-10">
            <Eyebrow n="04">Diferenciais</Eyebrow>
            <h2 className="mt-6 max-w-3xl font-serif-ed text-4xl font-light leading-[1.05] md:text-6xl">O que sustenta cada projeto</h2>
            <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {differentials.map((d, i) => (
                <li key={d} className="ed-card-light flex items-start gap-5 p-7">
                  <span className="font-serif-ed text-3xl font-light italic leading-none text-accent" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <p className="font-serif-ed text-xl font-light leading-snug md:text-2xl">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Processo */}
        <section id="processo" className="ed-paper border-y border-border py-20 md:py-32">
          <div data-reveal className="ed-reveal mx-auto max-w-7xl pl-14 pr-6 md:pl-28 md:pr-10">
            <Eyebrow n="05">Processo</Eyebrow>
            <h2 className="mt-6 font-serif-ed text-4xl font-light leading-[1.05] md:text-6xl">Como o projeto <em className="italic text-accent">acontece</em></h2>
            <ol className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
              {steps.map(([t, d], i) => (
                <li key={t} className="border-t border-foreground pt-6">
                  <span className="font-serif-ed text-5xl font-light italic text-accent" aria-hidden="true">{i + 1}</span>
                  <h3 className="mt-6 text-base font-medium">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Sobre */}
        <section className="ed-dark relative isolate overflow-hidden py-20 md:py-32">
          <span aria-hidden="true" className="ed-glow ed-glow-cool" />
          <span aria-hidden="true" className="ed-glow ed-glow-a" />
          <div data-reveal className="ed-reveal mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-12 md:px-10">
            <div className="relative mr-3 md:col-span-5 lg:col-span-4">
              <span aria-hidden="true" className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl border border-accent" />
              <picture>
                <source type="image/webp" sizes="(min-width: 768px) 34vw, 100vw"
                  srcSet="/editorial/rayssa-sobre-640.webp 640w, /editorial/rayssa-sobre-1000.webp 1000w" />
                <img src="/editorial/rayssa-sobre.jpg" alt="Retrato de Rayssa Martins sorrindo, segurando uma mesa digitalizadora"
                  width={1000} height={1250} loading="lazy" decoding="async"
                  className="relative block aspect-[4/5] w-full rounded-2xl bg-secondary object-cover object-top" />
              </picture>
            </div>
            <div className="md:col-span-7 md:col-start-6 md:self-center lg:col-start-6">
              <Eyebrow n="06">Sobre</Eyebrow>
              <h2 className="mt-6 font-serif-ed text-4xl font-light leading-[1.05] md:text-6xl">Sobre Rayssa Martins</h2>
              <p className="mt-10 font-serif-ed text-xl font-light leading-relaxed md:text-2xl">
                Diretora de Arte Sênior, com atuação em design editorial, comunicação visual e projetos digitais. Mais de 10 anos de experiência criando projetos para marcas do Brasil, Estados Unidos e Portugal, com atenção à tipografia, à hierarquia e à consistência de cada publicação.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
                <a href={wa()} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                  <MessageCircle size={16} aria-hidden="true" /> Conversar com a Rayssa<NewTab />
                </a>
                <Link to="/" className={`${btnText} gap-2`}>
                  Ver portfólio completo <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Dúvidas frequentes */}
        <section id="duvidas" className="relative isolate overflow-hidden py-20 md:py-32">
          <span aria-hidden="true" className="ed-glow ed-glow-soft ed-glow-soft-r" />
          <div data-reveal className="ed-reveal mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow n="07">Dúvidas</Eyebrow>
              <h2 className="mt-6 font-serif-ed text-4xl font-light leading-[1.05] md:text-5xl">Perguntas frequentes</h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                Não encontrou sua dúvida? <a href={wa()} target="_blank" rel="noopener noreferrer" className="underline decoration-accent underline-offset-4 hover:text-accent">Pergunte pelo WhatsApp<NewTab /></a>.
              </p>
            </div>
            <div className="space-y-3 lg:col-span-7 lg:col-start-6">
              {faqs.map(([q, a]) => (
                <details key={q} className="ed-faq ed-card-light group px-6 md:px-8">
                  <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-6 py-5 font-serif-ed text-xl font-light leading-snug transition-colors hover:text-accent md:text-2xl">
                    {q}
                    <span className="ed-icon ed-icon-sm"><Plus size={16} aria-hidden="true" className="ed-faq-icon transition-transform duration-300" /></span>
                  </summary>
                  <p className="max-w-2xl pb-7 leading-relaxed text-muted-foreground">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Formulário */}
        <section id="orcamento" className="ed-dark relative isolate overflow-hidden pb-16 pt-20 md:pb-24 md:pt-32">
          <span aria-hidden="true" className="ed-glow ed-glow-form" />
          <div data-reveal className="ed-reveal mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-12 md:px-10">
            <div className="md:col-span-4">
              <Eyebrow n="08">Orçamento</Eyebrow>
              <h2 className="mt-6 font-serif-ed text-4xl font-light leading-[1.05] md:text-5xl">Vamos conversar sobre o seu <span className="text-accent">projeto</span>?</h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                Prefere falar direto? <a href={wa()} target="_blank" rel="noopener noreferrer" className="underline decoration-accent underline-offset-4 hover:text-accent">Chame no WhatsApp<NewTab /></a> ou escreva para <a href={`mailto:${CONTACT_EMAIL}`} className="underline decoration-accent underline-offset-4 hover:text-accent">{CONTACT_EMAIL}</a>.
              </p>
            </div>
            <div className="ed-glass p-7 md:col-span-8 md:col-start-5 md:p-10 lg:col-span-7 lg:col-start-6">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="ed-dark">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-8 md:px-10 md:pb-10">
        <div className="h-px bg-foreground/15" />
        <div className="mt-8 flex flex-col gap-6 text-sm text-muted-foreground md:flex-row md:items-end md:justify-between">
          <p className="leading-tight">
            <span className="block font-serif-ed text-2xl text-foreground">Rayssa Martins<span className="text-accent">.</span></span>
            <span className="text-[11px] uppercase tracking-[0.25em]">Design Editorial</span>
          </p>
          <nav aria-label="Contatos e redes" className="flex flex-wrap gap-x-8 gap-y-3">
            <Link to="/" className="ed-link">Portfólio principal</Link>
            <a href={`mailto:${CONTACT_EMAIL}`} className="ed-link">E-mail</a>
            <a href={wa()} target="_blank" rel="noopener noreferrer" className="ed-link">WhatsApp<NewTab /></a>
            <a href="https://www.behance.net/rayssamartins3" target="_blank" rel="noopener noreferrer" className="ed-link">Behance<NewTab /></a>
          </nav>
        </div>
        </div>
      </footer>

      <FloatingWhatsApp />
    </div>
  );
};

export default EditorialLanding;
