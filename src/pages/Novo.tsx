import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { projects } from "@/data/projects";
import "./novo.css";

/**
 * Prévia da nova home (rota /novo, fora do Google).
 * Estrutura: abertura com o nome gigante e a foto recortada, manifesto que se revela
 * com a rolagem, carrossel 3D de projetos, cenas de projeto, serviços e convite final.
 */

const WHATSAPP =
  "https://wa.me/5585991706850?text=" +
  encodeURIComponent("Olá, Rayssa! Vim pelo seu site e gostaria de um orçamento.");

const CAROUSEL_IDS = [
  "lancamento-web-design",
  "ellev-saude",
  "souting-marketing",
  "newdawn-chatngift",
  "blive-ensino",
  "x1-de-rua",
];

const SCENES = [
  {
    id: "lancamento-web-design",
    kind: "Site + campanha",
    title: "Lançamento",
    text: "Landing page e peças de campanha para um lançamento digital: uma página pensada para levar o visitante do interesse ao clique.",
  },
  {
    id: "ellev-saude",
    kind: "App · UI/UX",
    title: "Ellev Saúde",
    text: "Interface de um aplicativo de saúde, com fluxos simples para quem precisa resolver rápido e sem dúvida.",
  },
  {
    id: "souting-marketing",
    kind: "Identidade visual",
    title: "Souting",
    text: "Marca completa para uma agência de marketing: logotipo, cores, tipografia e aplicações que passam profissionalismo.",
  },
];

const MANIFESTO =
  "Design bonito é só o começo. Eu crio marcas, sites e livros que fazem as pessoas pararem, entenderem e escolherem você.";

const reduceMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Progresso de 0 a 1 de um elemento atravessando a tela. */
function useProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const v = total > 0 ? -r.top / total : r.top < window.innerHeight ? 1 : 0;
      setP(Math.max(0, Math.min(1, v)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return [ref, p] as const;
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; setY(window.scrollY); }); };
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return y;
}

function Hero() {
  const y = useScrollY();
  const still = reduceMotion();
  const shift = still ? 0 : y * 0.35;
  return (
    <section className="cine-hero" aria-label="Apresentação">
      <div className="glow" aria-hidden="true" />
      <div className="word" aria-hidden="true" style={{ transform: `translate(calc(-50% - ${shift}px), -50%)` }}>
        RAYSSA
      </div>
      <img
        className="photo"
        src="/novo/rayssa-recorte.webp"
        alt="Rayssa Martins sorrindo, de óculos e jaqueta jeans, segurando uma mesa digitalizadora"
        style={{ transform: `translateX(-50%) translateY(${still ? 0 : y * 0.12}px) scale(${still ? 1 : 1 + y * 0.00008})` }}
      />
      <div className="grain" aria-hidden="true" />
      <div className="meta">
        <p>
          <b>Rayssa Martins</b> · Diretora de Arte Sênior em Fortaleza. Sites, identidade visual e diagramação de
          livros para marcas do Brasil, EUA e Portugal.
        </p>
        <a className="pill" href="#projetos">Ver projetos ↓</a>
      </div>
    </section>
  );
}

function Manifesto() {
  const [ref, p] = useProgress<HTMLElement>();
  const words = MANIFESTO.split(" ");
  const highlight = new Set(["marcas,", "sites", "livros"]);
  return (
    <section className="cine-manifesto" ref={ref} aria-label="Manifesto">
      <div className="sticky">
        <div className="kicker">Manifesto</div>
        <h2>
          {words.map((w, i) => {
            const on = p * 1.25 * words.length > i;
            return (
              <span key={i} style={{ opacity: on ? 1 : 0.16, color: on && highlight.has(w) ? "var(--red)" : undefined }}>
                {w}{" "}
              </span>
            );
          })}
        </h2>
      </div>
    </section>
  );
}

function Carousel() {
  const items = useMemo(
    () => CAROUSEL_IDS.map((id) => projects.find((p) => p.id === id)).filter(Boolean) as typeof projects,
    [],
  );
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [w, setW] = useState(560);
  useEffect(() => {
    const on = () => setW(Math.max(240, Math.min(600, window.innerWidth * 0.42)));
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  useEffect(() => {
    if (paused || reduceMotion()) return;
    const t = setInterval(() => setI((v) => v + 1), 3800);
    return () => clearInterval(t);
  }, [paused]);
  const n = items.length;
  const step = 360 / n;
  const radius = Math.round((w / 2) / Math.tan(Math.PI / n) + w * 0.12);
  const active = ((i % n) + n) % n;

  return (
    <section className="cine-work" id="projetos" aria-label="Projetos">
      <div className="head">
        <h2>Projetos reais<span>.</span></h2>
        <p className="sub">Sites, aplicativos, marcas e publicações. Passe o mouse para pausar e clique para ver o projeto completo.</p>
      </div>
      <div className="stage3d" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="ring" style={{ transform: `translateZ(${-radius}px) rotateY(${-i * step}deg)` }}>
          {items.map((p, k) => (
            <Link
              key={p.id}
              to={`/projeto/${p.id}`}
              className={`device${k === active ? " active" : ""}`}
              style={{ ["--w" as string]: `${w}px`, transform: `rotateY(${k * step}deg) translateZ(${radius}px)` }}
              tabIndex={k === active ? 0 : -1}
              aria-label={`Ver projeto ${p.title}`}
            >
              <div className="screen"><img src={p.thumbnailUrl} alt="" loading="lazy" /></div>
              <div className="base" />
              <div className="tag">{p.title}</div>
            </Link>
          ))}
        </div>
      </div>
      <div className="thumbs" role="tablist" aria-label="Escolher projeto">
        {items.map((p, k) => (
          <button
            key={p.id}
            role="tab"
            aria-current={k === active}
            aria-label={p.title}
            onClick={() => {
              let d = (((k - active) % n) + n) % n;
              if (d > n / 2) d -= n;
              setI(i + d);
            }}
          >
            <img src={p.thumbnailUrl} alt="" loading="lazy" />
          </button>
        ))}
      </div>
      <div className="arrows">
        <button type="button" aria-label="Projeto anterior" onClick={() => setI((v) => v - 1)}>←</button>
        <button type="button" aria-label="Próximo projeto" onClick={() => setI((v) => v + 1)}>→</button>
      </div>
    </section>
  );
}

function Scene({ index, data }: { index: number; data: (typeof SCENES)[number] }) {
  const [ref, p] = useProgress<HTMLElement>();
  const project = projects.find((x) => x.id === data.id);
  if (!project) return null;
  const still = reduceMotion();
  const enter = Math.min(1, p * 2.2);
  const tilt = still ? 0 : (1 - enter) * 28;
  const scale = still ? 1 : 0.86 + 0.14 * enter;
  const lift = still ? 0 : (1 - enter) * 80 - p * 60;
  return (
    <section className="scene" ref={ref} aria-label={data.title}>
      <div className="sticky">
        <div style={{ opacity: still ? 1 : Math.min(1, 0.2 + enter), transform: `translateY(${still ? 0 : (1 - enter) * 40}px)` }}>
          <div className="num">{String(index + 1).padStart(2, "0")} · {data.kind}</div>
          <h3>{data.title}</h3>
          <p>{data.text}</p>
          <div className="chips">{project.tools.map((t) => <span key={t}>{t}</span>)}</div>
          <Link className="pill ghost" to={`/projeto/${project.id}`}>Ver projeto completo →</Link>
        </div>
        <div className="frame">
          <div className="halo" aria-hidden="true" />
          <div className="win" style={{ transform: `translateY(${lift}px) rotateX(${tilt}deg) scale(${scale})` }}>
            <div className="bar" aria-hidden="true"><i /><i /><i /></div>
            <img src={project.thumbnailUrl} alt={`Projeto ${project.title}`} loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="cine-services" id="servicos" aria-label="Serviços">
      <div className="item">
        <b>01</b>
        <h4>Sites e landing pages</h4>
        <p>Páginas rápidas, bonitas e pensadas para transformar visitantes em clientes.</p>
        <a className="more" href={WHATSAPP} target="_blank" rel="noopener noreferrer">Pedir orçamento</a>
      </div>
      <div className="item">
        <b>02</b>
        <h4>Identidade visual</h4>
        <p>Logo, cores, tipografia e peças que fazem a sua marca ser lembrada e escolhida.</p>
        <a className="more" href={WHATSAPP} target="_blank" rel="noopener noreferrer">Pedir orçamento</a>
      </div>
      <div className="item">
        <b>03</b>
        <h4>Diagramação de livros</h4>
        <p>Livros, apostilas e e-books prontos para a gráfica e para publicação digital.</p>
        <Link className="more" to="/diagramacao-de-livros">Conhecer o serviço</Link>
      </div>
    </section>
  );
}

const Novo = () => (
  <main className="cine">
    <Helmet>
      <html lang="pt-BR" />
      <title>Prévia · Rayssa Martins</title>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>

    <header className="cine-nav">
      <Link to="/novo" className="logo">RAYSSA<span>.</span></Link>
      <nav aria-label="Principal">
        <a href="#projetos">Projetos</a>
        <a href="#servicos">Serviços</a>
        <a href="#contato">Contato</a>
      </nav>
    </header>

    <Hero />
    <Manifesto />
    <Carousel />
    {SCENES.map((s, k) => <Scene key={s.id} index={k} data={s} />)}
    <Services />

    <section className="cine-cta" id="contato" aria-label="Contato">
      <div className="card">
        <div className="kicker">Orçamento sob medida</div>
        <h2>Vamos criar<br />algo único?</h2>
        <p>Cada projeto é diferente, então cada proposta também. Me conte sua ideia e receba uma proposta clara, com escopo, etapas e prazos.</p>
        <div className="actions">
          <a className="pill" href={WHATSAPP} target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a>
          <a className="pill ghost" href="mailto:rayssamartins33@gmail.com">Enviar e-mail</a>
        </div>
      </div>
    </section>

    <footer className="cine-foot">
      <span>© 2026 Rayssa Martins · Fortaleza, Brasil</span>
      <nav aria-label="Redes">
        <a href="https://www.instagram.com/raymartinss/" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://www.behance.net/rayssamartins3" target="_blank" rel="noopener noreferrer">Behance</a>
        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">WhatsApp</a>
      </nav>
    </footer>
  </main>
);

export default Novo;
