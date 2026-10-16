import { useEffect, useRef, useState, type FormEvent, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import medgestAsset from "@/assets/medgest.png.asset.json";
import poderAsset from "@/assets/opoderdaacao.png.asset.json";
import heroCapa from "@/assets/hero-01.webp.asset.json";
import heroAberto1 from "@/assets/hero-02.webp.asset.json";
import heroAberto2 from "@/assets/hero-03.webp.asset.json";
import heroAberto3 from "@/assets/hero-04.webp.asset.json";

const CONTACT_EMAIL = "rayssamartins33@gmail.com";

type Project = {
  title: string;
  subtitle?: string;
  category: string;
  scope: string;
  description: string;
  cover?: string;
  pages: string[];
};

// Substitua os campos vazios pelas imagens reais quando forem enviadas.
const projects: Project[] = [
  {
    title: "Agroamigo",
    subtitle: "Impactos Socioeconômicos na Agricultura Familiar",
    category: "Publicação institucional",
    scope: "Diagramação",
    description: "Publicação institucional com conteúdo extenso, organizada para leitura clara entre capítulos e seções.",
    pages: [],
  },
  {
    title: "Medgest PRO",
    subtitle: "Material educacional",
    category: "Material didático",
    scope: "Diagramação",
    description: "Material educacional estruturado com hierarquia visual consistente para facilitar o estudo.",
    cover: medgestAsset.url,
    pages: [],
  },
  {
    title: "Programa de Gestão e Vendas",
    subtitle: "para Clínicas e Consultórios",
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
  ["Diagramação de livros impressos", "Miolo com padrão tipográfico consistente e arquivo preparado para a gráfica."],
  ["Diagramação de apostilas e materiais didáticos", "Conteúdos organizados em módulos, com hierarquia que favorece o estudo."],
  ["E-books em PDF", "Publicações digitais pensadas para leitura confortável em tela."],
  ["Publicações institucionais e relatórios", "Documentos extensos apresentados com clareza e identidade."],
  ["Ajustes em arquivos editoriais existentes", "Refinamentos e correções em arquivos já diagramados."],
];

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

const roman = ["I", "II", "III", "IV", "V", "VI"];

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

const useBookParallax = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".ed-book"));
    let raf = 0;
    const tick = () => {
      raf = 0;
      const y = Math.min(window.scrollY, 900);
      els.forEach((el) => el.style.setProperty("--py", `${(-y * 0.04 * Number(el.style.getPropertyValue("--p") || 1)).toFixed(1)}px`));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
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

/** Placeholder editorial: marcas de corte nos cantos, sem ícones. */
const Plate = ({ label, className = "", tone = "bg-secondary" }: { label?: string; className?: string; tone?: string }) => (
  <div className={`relative ${tone} ${className}`}>
    <span aria-hidden="true" className="absolute left-2 top-2 h-3 w-3 border-l border-t border-foreground/30" />
    <span aria-hidden="true" className="absolute right-2 top-2 h-3 w-3 border-r border-t border-foreground/30" />
    <span aria-hidden="true" className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-foreground/30" />
    <span aria-hidden="true" className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-foreground/30" />
    {label && <span className="absolute inset-x-0 bottom-5 text-center text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</span>}
  </div>
);

const Eyebrow = ({ n, children }: { n: string; children: string }) => (
  <p className="flex items-center gap-4 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
    <span className="font-serif-ed text-sm normal-case tracking-normal text-accent">{n}</span>
    <span className="h-px w-10 bg-foreground/40" aria-hidden="true" />
    {children}
  </p>
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

  const field = "w-full border-0 border-b border-input bg-transparent py-3 font-serif-ed text-xl font-light placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none focus:ring-0";
  const lbl = "text-[11px] uppercase tracking-[0.22em] text-muted-foreground";
  const Err = ({ k }: { k: keyof FormState }) => errors[k] ? <p id={`${k}-err`} className="mt-2 text-sm text-destructive">{errors[k]}</p> : null;
  const aria = (k: keyof FormState) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined });

  return (
    <form onSubmit={submit} noValidate className="grid gap-x-12 gap-y-10 md:grid-cols-2">
      <div><label htmlFor="name" className={lbl}>Nome *</label><input id="name" className={field} value={form.name} onChange={set("name")} autoComplete="name" {...aria("name")} /><Err k="name" /></div>
      <div><label htmlFor="email" className={lbl}>E-mail *</label><input id="email" type="email" className={field} value={form.email} onChange={set("email")} autoComplete="email" {...aria("email")} /><Err k="email" /></div>
      <div><label htmlFor="whatsapp" className={lbl}>WhatsApp</label><input id="whatsapp" type="tel" className={field} value={form.whatsapp} onChange={set("whatsapp")} autoComplete="tel" {...aria("whatsapp")} /><Err k="whatsapp" /></div>
      <div>
        <label htmlFor="type" className={lbl}>Tipo de publicação *</label>
        <select id="type" className={field} value={form.type} onChange={set("type")} {...aria("type")}>
          <option value="">Selecione</option>
          <option>Livro impresso</option><option>Apostila / material didático</option><option>E-book em PDF</option>
          <option>Publicação institucional / relatório</option><option>Ajustes em arquivo existente</option><option>Outro</option>
        </select><Err k="type" />
      </div>
      <div><label htmlFor="pages" className={lbl}>Quantidade aproximada de páginas</label><input id="pages" inputMode="numeric" className={field} value={form.pages} onChange={set("pages")} /></div>
      <div><label htmlFor="deadline" className={lbl}>Prazo desejado</label><input id="deadline" className={field} placeholder="Ex.: 30 dias" value={form.deadline} onChange={set("deadline")} /></div>
      <div className="md:col-span-2"><label htmlFor="description" className={lbl}>Descrição do projeto *</label><textarea id="description" rows={3} className={`${field} resize-none`} value={form.description} onChange={set("description")} {...aria("description")} /><Err k="description" /></div>
      <div className="flex flex-col gap-5 md:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-sm text-muted-foreground" role="status">
          {opened ? "Seu aplicativo de e-mail foi aberto com a mensagem pronta. Basta enviá-la para concluir." : "Ao enviar, seu aplicativo de e-mail abrirá com a mensagem preenchida."}
        </p>
        <button type="submit" className="group inline-flex min-h-12 items-center justify-center gap-3 bg-accent px-8 text-sm tracking-wide text-accent-foreground transition-colors duration-300 hover:bg-primary">
          Enviar solicitação <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  );
};

const EditorialLanding = () => {
  const title = "Diagramação de Livros e Apostilas | Rayssa Martins";
  const description = "Diagramação profissional de livros, apostilas, e-books e publicações institucionais. Conheça projetos editoriais de Rayssa Martins.";
  const canonical = "https://rayssamartins.app/diagramacao-de-livros";
  useReveal();
  useBookParallax();
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="editorial-theme min-h-screen overflow-x-hidden">
      <ScrollProgress />
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
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&display=swap" />
      </Helmet>

      {/* Topo */}
      <header className="mx-auto flex max-w-7xl items-end justify-between px-6 pb-5 pt-8 md:px-10">
        <Link to="/" className="leading-tight">
          <span className="block font-serif-ed text-lg">Rayssa Martins<span className="text-accent">.</span></span>
          <span className="block text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Design Editorial</span>
        </Link>
        <button onClick={() => go("orcamento")} className="text-sm underline decoration-accent underline-offset-[6px] transition-colors hover:text-accent">
          Solicitar orçamento
        </button>
      </header>
      <div className="mx-auto max-w-7xl px-6 md:px-10"><div className="h-px bg-foreground/80" /></div>

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-6 pb-20 pt-12 md:px-10 md:pb-28 md:pt-16">
          <div className="ed-rise flex justify-between text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            <span className="flex items-center gap-3"><span className="h-2 w-2 bg-accent" aria-hidden="true" />Livros · Apostilas · Publicações</span>
            <span className="hidden sm:inline">Fortaleza — Brasil</span>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <h1 style={{ animationDelay: "120ms" }} className="ed-rise font-serif-ed text-[2.75rem] font-light leading-[1.02] tracking-[-0.02em] sm:text-6xl lg:text-[5.25rem]">
                Seu livro começa <em className="italic">muito antes</em> da <span className="text-accent">primeira página</span>.
              </h1>
              <div style={{ animationDelay: "320ms" }} className="ed-rise mt-10 grid gap-8 sm:grid-cols-[auto_1fr] sm:gap-10">
                <span className="hidden font-serif-ed text-sm text-accent sm:block">§</span>
                <div>
                  <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
                    Diagramação profissional de livros, apostilas e publicações. Projetos editoriais pensados para valorizar o conteúdo, organizar a leitura e transformar informação em experiência.
                  </p>
                  <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
                    <button onClick={() => go("orcamento")} className="group inline-flex min-h-12 items-center justify-center gap-3 bg-accent px-7 text-sm tracking-wide text-accent-foreground transition-colors duration-300 hover:bg-primary">
                      Solicitar orçamento editorial <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </button>
                    <button onClick={() => go("projetos")} className="inline-flex min-h-12 items-center justify-center text-sm underline decoration-accent underline-offset-[6px] transition-colors hover:text-accent">
                      Ver projetos
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Vitrine editorial */}
            <div style={{ animationDelay: "480ms" }} className="ed-rise lg:col-span-5">
              <div className="ed-scene relative mx-auto aspect-[5/6] w-full max-w-[560px] lg:-mr-6 lg:max-w-none xl:-mr-12">
                <span aria-hidden="true" className="absolute left-[2%] top-[2%] z-30 h-6 w-6 border-l-2 border-t-2 border-accent" />
                {/* Livro aberto superior — plano de fundo */}
                <figure className="ed-book ed-book-back absolute right-0 top-[3%] z-0 hidden w-[52%] sm:block" style={{ "--d": "620ms", "--p": "0.4" } as CSSProperties}>
                  <img src={heroAberto1.url} alt="Livro aberto — abertura de capítulo" width={576} height={256} loading="eager" decoding="async" className="w-full" />
                </figure>
                {/* Livro principal */}
                <figure className="ed-book ed-book-main absolute left-[4%] top-[6%] z-10 w-[66%]" style={{ "--d": "480ms", "--p": "1" } as CSSProperties}>
                  <img src={heroCapa.url} alt="Capa do livro Agroamigo diagramado" width={862} height={1035} loading="eager" decoding="async" fetchPriority="high" className="w-full" />
                </figure>
                {/* Livro aberto horizontal — primeiro plano */}
                <figure className="ed-book ed-book-front absolute bottom-[2%] right-0 z-20 w-[78%]" style={{ "--d": "760ms", "--p": "1.6" } as CSSProperties}>
                  <img src={heroAberto3.url} alt="Página dupla do miolo de livro diagramado" width={1441} height={361} loading="eager" decoding="async" className="w-full" />
                </figure>
                {/* Livro aberto inferior — lateral */}
                <figure className="ed-book ed-book-side absolute right-[2%] top-[38%] z-[15] w-[40%]" style={{ "--d": "880ms", "--p": "0.8" } as CSSProperties}>
                  <img src={heroAberto2.url} alt="Livro aberto — páginas internas" width={576} height={256} loading="eager" decoding="async" className="w-full" />
                </figure>
              </div>
              <p className="mt-4 flex flex-wrap justify-between gap-x-4 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                <span><span className="text-accent">Fig. 01</span> — Acervo editorial</span><span>Projetos reais</span>
              </p>
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

            <div className="mt-20 space-y-24 md:space-y-32">
              {projects.map((p, i) => {
                const flip = i % 2 === 1;
                return (
                  <article key={p.title} data-reveal className="ed-reveal group grid gap-8 border-t border-foreground pt-6 md:grid-cols-12 md:gap-10">
                    <div className={`flex items-start justify-between md:col-span-12 text-[11px] uppercase tracking-[0.25em] text-muted-foreground`}>
                      <span><span className="font-serif-ed text-base tracking-normal text-accent">{String(i + 1).padStart(2, "0")}</span> / {String(projects.length).padStart(2, "0")}</span>
                      <span>{p.category}</span>
                    </div>

                    <div className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}>
                      <div className={`ed-img-reveal overflow-hidden p-4 md:p-8 ${i === 1 ? "bg-primary" : "bg-card"}`}>
                        {p.cover
                          ? <img src={p.cover} alt={`${p.title} — capa`} loading="lazy" decoding="async" width={1752} height={1464} className="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]" />
                          : <Plate label="Capa em breve" className="aspect-[4/3] w-full" tone="bg-secondary" />}
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-3">
                        {(p.pages.length ? p.pages : [null, null, null]).slice(0, 3).map((src, j) =>
                          src ? <img key={j} src={src} alt={`${p.title} — página interna ${j + 1}`} loading="lazy" className="aspect-[3/4] w-full object-cover" />
                              : <Plate key={j} label={`p. ${j + 1}`} className="aspect-[3/4] w-full" tone="bg-card" />)}
                      </div>
                    </div>

                    <div className={`flex flex-col md:col-span-4 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-9"}`}>
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
          </div>
        </section>

        {/* Serviços */}
        <section className="bg-primary py-20 text-primary-foreground md:py-32">
          <div data-reveal className="ed-reveal mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-12 md:px-10">
            <div className="md:col-span-4 [&_p]:text-primary-foreground/70">
              <Eyebrow n="02">Serviços</Eyebrow>
              <h2 className="mt-6 font-serif-ed text-4xl font-light leading-[1.05] md:text-5xl">Serviços editoriais<span className="text-accent">.</span></h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">Soluções para livros, apostilas, materiais didáticos e publicações profissionais.</p>
            </div>
            <ul className="md:col-span-7 md:col-start-6">
              {services.map(([t, d], i) => (
                <li key={t} className="group grid grid-cols-[2.5rem_1fr] gap-4 border-t border-primary-foreground/20 py-7 transition-colors last:border-b hover:text-accent md:grid-cols-[3.5rem_1fr_1fr] md:gap-8">
                  <span className="font-serif-ed text-sm italic text-accent">{roman[i]}.</span>
                  <h3 className="font-serif-ed text-2xl font-light leading-snug">{t}</h3>
                  <p className="col-start-2 leading-relaxed text-primary-foreground/65 md:col-start-3">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-20 md:py-32">
          <div data-reveal className="ed-reveal mx-auto max-w-7xl px-6 md:px-10">
            <Eyebrow n="03">Diferenciais</Eyebrow>
            <h2 className="mt-6 max-w-3xl font-serif-ed text-4xl font-light leading-[1.05] md:text-6xl">O que sustenta cada projeto</h2>
            <ul className="mt-16 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
              {differentials.map((d, i) => (
                <li key={d} className="border-t border-foreground py-8">
                  <span className="text-[11px] tracking-[0.2em] text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-4 font-serif-ed text-2xl font-light leading-snug">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Processo */}
        <section className="ed-paper border-y border-border py-20 md:py-32">
          <div data-reveal className="ed-reveal mx-auto max-w-7xl pl-14 pr-6 md:pl-28 md:pr-10">
            <Eyebrow n="04">Processo</Eyebrow>
            <h2 className="mt-6 font-serif-ed text-4xl font-light leading-[1.05] md:text-6xl">Como o projeto <em className="italic text-accent">acontece</em></h2>
            <ol className="mt-16 grid gap-10 md:grid-cols-5 md:gap-6">
              {steps.map(([t, d], i) => (
                <li key={t} className="border-t border-foreground pt-6">
                  <span className="font-serif-ed text-5xl font-light italic text-accent">{i + 1}</span>
                  <h3 className="mt-6 text-base font-medium">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Sobre */}
        <section className="py-20 md:py-32">
          <div data-reveal className="ed-reveal mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-12 md:px-10">
            <div className="relative md:col-span-4">
              <span aria-hidden="true" className="absolute -bottom-3 -right-3 h-full w-full border border-accent" />
              <Plate label="Fotografia profissional" className="relative aspect-[4/5] w-full" tone="bg-card" />
            </div>
            <div className="md:col-span-7 md:col-start-6 md:pt-10">
              <Eyebrow n="05">Sobre</Eyebrow>
              <h2 className="mt-6 font-serif-ed text-4xl font-light leading-[1.05] md:text-6xl">Sobre Rayssa Martins</h2>
              <p className="mt-10 font-serif-ed text-xl font-light leading-relaxed md:text-2xl">
                Diretora de Arte Sênior, com atuação em design editorial, comunicação visual e projetos digitais. Mais de 10 anos de experiência criando projetos para marcas do Brasil, Estados Unidos e Portugal, com atenção à tipografia, à hierarquia e à consistência de cada publicação.
              </p>
              <Link to="/" className="mt-10 inline-flex items-center gap-2 text-sm underline decoration-accent underline-offset-[6px] transition-colors hover:text-accent">
                Ver portfólio completo <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* Formulário */}
        <section id="orcamento" className="bg-card py-20 md:py-32">
          <div data-reveal className="ed-reveal mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-12 md:px-10">
            <div className="md:col-span-4">
              <Eyebrow n="06">Orçamento</Eyebrow>
              <h2 className="mt-6 font-serif-ed text-4xl font-light leading-[1.05] md:text-5xl">Vamos conversar sobre o seu <span className="text-accent">projeto</span>?</h2>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-7xl px-6 pb-10 pt-16 md:px-10">
        <div className="h-px bg-foreground/80" />
        <div className="mt-8 flex flex-col gap-6 text-sm text-muted-foreground md:flex-row md:items-end md:justify-between">
          <p className="leading-tight">
            <span className="block font-serif-ed text-2xl text-foreground">Rayssa Martins<span className="text-accent">.</span></span>
            <span className="text-[11px] uppercase tracking-[0.25em]">Design Editorial</span>
          </p>
          <nav aria-label="Contatos e redes" className="flex flex-wrap gap-x-8 gap-y-3">
            <Link to="/" className="ed-link">Portfólio principal</Link>
            <a href={`mailto:${CONTACT_EMAIL}`} className="ed-link">E-mail</a>
            <a href="https://wa.me/5585991706850" target="_blank" rel="noopener noreferrer" className="ed-link">WhatsApp</a>
            <a href="https://www.behance.net/rayssamartins3" target="_blank" rel="noopener noreferrer" className="ed-link">Behance</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default EditorialLanding;
