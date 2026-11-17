import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { projects } from "@/data/projects";
import cutout from "@/assets/rayssa-recorte.webp";
import "./novo.css";

/**
 * Prévia da nova home (rota /novo, fora do Google).
 * Abertura com contador e cortina, nome gigante e foto que reagem ao mouse e à rolagem,
 * manifesto que se revela, faixa que acelera com a rolagem, carrossel 3D que gira arrastando,
 * cenas de projeto, serviços e convite final com luz que segue o mouse.
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
const finePointer = () =>
  typeof window !== "undefined" && window.matchMedia?.("(pointer: fine)").matches;

/* ---------- ganchos de movimento ---------- */

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

/** Rolagem suavizada (com inércia) e velocidade da rolagem, atualizadas a cada quadro. */
function useSmoothScroll() {
  const [s, setS] = useState({ y: 0, v: 0, mx: 0, my: 0 });
  useEffect(() => {
    let raf = 0;
    let y = window.scrollY;
    let v = 0;
    let mx = 0, my = 0, tx = 0, ty = 0;
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const tick = () => {
      const target = window.scrollY;
      const dy = target - y;
      y += dy * 0.12;
      v += (dy * 0.12 - v) * 0.2;
      mx += (tx - mx) * 0.08;
      my += (ty - my) * 0.08;
      // só redesenha enquanto algo está em movimento
      const moving = Math.abs(dy) > 0.2 || Math.abs(v) > 0.02 || Math.abs(tx - mx) > 0.001 || Math.abs(ty - my) > 0.001;
      if (moving) setS({ y, v, mx, my });
      raf = requestAnimationFrame(tick);
    };
    if (!reduceMotion()) {
      window.addEventListener("pointermove", onMove, { passive: true });
      raf = requestAnimationFrame(tick);
    }
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", onMove); };
  }, []);
  return s;
}

/** Botão "magnético": puxa em direção ao cursor. */
function magnetic(e: ReactPointerEvent<HTMLElement>) {
  if (!finePointer() || reduceMotion()) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = e.clientX - (r.left + r.width / 2);
  const y = e.clientY - (r.top + r.height / 2);
  el.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
}
function magneticOut(e: ReactPointerEvent<HTMLElement>) {
  e.currentTarget.style.transform = "";
}

/* ---------- peças ---------- */

/** Imagem de projeto com um cartão de reserva se a imagem não carregar. */
function Thumb({ src, title, alt = "" }: { src: string; title: string; alt?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="ph" role={alt ? "img" : undefined} aria-label={alt || undefined}>
        <span>{title.split(" - ")[0]}</span>
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" draggable={false} onError={() => setFailed(true)} />;
}

function Loader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    if (reduceMotion()) { onDone(); return; }
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / 1300);
      setN(Math.round((1 - Math.pow(1 - k, 3)) * 100));
      if (k < 1) raf = requestAnimationFrame(tick);
      else { setLeaving(true); setTimeout(onDone, 900); }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);
  return (
    <div className={`cine-loader${leaving ? " out" : ""}`} aria-hidden="true">
      <div className="curtain red" />
      <div className="curtain" />
      <div className="lw">
        {"RAYSSA".split("").map((c, i) => <span key={i} style={{ animationDelay: `${i * 60}ms` }}>{c}</span>)}
        <span className="dot" style={{ animationDelay: "380ms" }}>.</span>
      </div>
      <div className="count">{String(n).padStart(3, "0")}</div>
    </div>
  );
}

function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"" | "link" | "view">("");
  useEffect(() => {
    if (!finePointer() || reduceMotion()) return;
    let x = -100, y = -100, rx = -100, ry = -100, raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      const t = e.target as HTMLElement;
      setMode(t.closest(".device, .scene .win") ? "view" : t.closest("a, button") ? "link" : "");
    };
    const tick = () => {
      rx += (x - rx) * 0.16; ry += (y - ry) * 0.16;
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px)`;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(tick);
    };
    document.documentElement.classList.add("cine-hide-cursor");
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("cine-hide-cursor");
    };
  }, []);
  if (typeof window !== "undefined" && (!finePointer() || reduceMotion())) return null;
  return (
    <>
      <div ref={ring} className={`cine-ring ${mode}`} aria-hidden="true"><span>ver</span></div>
      <div ref={dot} className="cine-dot" aria-hidden="true" />
    </>
  );
}

function Hero({ ready, s }: { ready: boolean; s: ReturnType<typeof useSmoothScroll> }) {
  const still = reduceMotion();
  const y = still ? 0 : s.y;
  return (
    <section className={`cine-hero${ready ? " in" : ""}`} aria-label="Apresentação">
      <div className="glow" aria-hidden="true" style={{ transform: `translate(${s.mx * 30}px, ${s.my * 20}px)` }} />
      <h1 className="sr-only">Rayssa Martins, Diretora de Arte Sênior em Fortaleza</h1>
      <div
        className="word"
        aria-hidden="true"
        style={{ transform: `translate(calc(-50% - ${y * 0.45 + s.mx * 40}px), calc(-50% + ${s.my * 14}px))` }}
      >
        {"RAYSSA".split("").map((c, i) => (
          <span key={i} style={{ transitionDelay: `${150 + i * 70}ms` }}>{c}</span>
        ))}
      </div>
      <img
        className="photo"
        src={cutout}
        alt="Rayssa Martins sorrindo, de óculos e jaqueta jeans, segurando uma mesa digitalizadora"
        style={{
          transform: `translateX(calc(-50% + ${s.mx * 18}px)) translateY(${y * 0.15 + s.my * 8}px) scale(${1 + y * 0.0001})`,
        }}
      />
      <div className="grain" aria-hidden="true" />
      <div className="meta">
        <p>
          <b>Rayssa Martins</b> · Diretora de Arte Sênior em Fortaleza. Sites, identidade visual e diagramação de
          livros para marcas do Brasil, EUA e Portugal.
        </p>
        <a className="pill" href="#projetos" onPointerMove={magnetic} onPointerLeave={magneticOut}>Ver projetos ↓</a>
      </div>
      <div className="scrollhint" aria-hidden="true"><i /></div>
    </section>
  );
}

function Marquee({ v, reverse = false, outline = false, text }: { v: number; reverse?: boolean; outline?: boolean; text: string }) {
  const pos = useRef(0);
  const [x, setX] = useState(0);
  const vel = useRef(v);
  vel.current = v;
  useEffect(() => {
    if (reduceMotion()) return;
    let raf = 0;
    const tick = () => {
      const speed = 1.2 + Math.min(18, Math.abs(vel.current) * 0.6);
      pos.current = (pos.current + speed * (reverse ? -1 : 1)) % 2000;
      setX(pos.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reverse]);
  const skew = Math.max(-12, Math.min(12, v * -0.5));
  const row = Array.from({ length: 6 }, (_, i) => <span key={i}>{text}</span>);
  return (
    <div className={`cine-marquee${outline ? " outline" : ""}`} aria-hidden="true">
      <div className="track" style={{ transform: `translateX(${-2000 + x}px) skewX(${skew}deg)` }}>{row}</div>
    </div>
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
            const k = Math.max(0, Math.min(1, p * 1.3 * words.length - i));
            return (
              <Fragment key={i}>
                <span
                  style={{
                    opacity: 0.14 + 0.86 * k,
                    color: k > 0.5 && highlight.has(w) ? "var(--red)" : undefined,
                    transform: `translateY(${(1 - k) * 18}px)`,
                    filter: `blur(${(1 - k) * 4}px)`,
                  }}
                >
                  {w}
                </span>{" "}
              </Fragment>
            );
          })}
        </h2>
      </div>
    </section>
  );
}

function Carousel({ my }: { my: number }) {
  const items = useMemo(
    () => CAROUSEL_IDS.map((id) => projects.find((p) => p.id === id)).filter(Boolean) as typeof projects,
    [],
  );
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [drag, setDrag] = useState<number | null>(null);
  const startX = useRef(0);
  const moved = useRef(false);
  const [w, setW] = useState(560);
  useEffect(() => {
    const on = () => setW(Math.max(240, Math.min(600, window.innerWidth * 0.42)));
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  useEffect(() => {
    if (paused || drag !== null || reduceMotion()) return;
    const t = setInterval(() => setI((v) => v + 1), 3800);
    return () => clearInterval(t);
  }, [paused, drag]);
  const n = items.length;
  const step = 360 / n;
  const radius = Math.round((w / 2) / Math.tan(Math.PI / n) + w * 0.12);
  const active = ((i % n) + n) % n;
  const dragDeg = drag ?? 0;

  const down = (e: ReactPointerEvent<HTMLDivElement>) => {
    startX.current = e.clientX; moved.current = false; setDrag(0);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const move = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (drag === null) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 6) moved.current = true;
    setDrag(dx * 0.25);
  };
  const up = () => {
    if (drag === null) return;
    const shift = Math.round(-dragDeg / step);
    setI((v) => v + shift);
    setDrag(null);
  };

  return (
    <section className="cine-work" id="projetos" aria-label="Projetos">
      <div className="head">
        <h2>Projetos reais<span>.</span></h2>
        <p className="sub">Sites, aplicativos, marcas e publicações. Arraste para girar e clique para ver o projeto completo.</p>
      </div>
      <div
        className={`stage3d${drag !== null ? " dragging" : ""}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { setPaused(false); up(); }}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        onClickCapture={(e) => { if (moved.current) { e.preventDefault(); e.stopPropagation(); } }}
      >
        <div
          className="ring"
          style={{
            transform: `translateZ(${-radius}px) rotateX(${reduceMotion() ? 0 : my * -6}deg) rotateY(${-i * step + dragDeg}deg)`,
            transition: drag !== null ? "none" : undefined,
          }}
        >
          {items.map((p, k) => (
            <Link
              key={p.id}
              to={`/projeto/${p.id}`}
              className={`device${k === active ? " active" : ""}`}
              style={{ ["--w" as string]: `${w}px`, transform: `rotateY(${k * step}deg) translateZ(${radius}px)` }}
              tabIndex={k === active ? 0 : -1}
              aria-label={`Ver projeto ${p.title}`}
              draggable={false}
            >
              <div className="screen"><Thumb src={p.thumbnailUrl} title={p.title} /></div>
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
            <Thumb src={p.thumbnailUrl} title={p.title} />
          </button>
        ))}
      </div>
      <div className="arrows">
        <button type="button" aria-label="Projeto anterior" onClick={() => setI((v) => v - 1)} onPointerMove={magnetic} onPointerLeave={magneticOut}>←</button>
        <button type="button" aria-label="Próximo projeto" onClick={() => setI((v) => v + 1)} onPointerMove={magnetic} onPointerLeave={magneticOut}>→</button>
      </div>
    </section>
  );
}

function Scene({ index, data, mx }: { index: number; data: (typeof SCENES)[number]; mx: number }) {
  const [ref, p] = useProgress<HTMLElement>();
  const project = projects.find((x) => x.id === data.id);
  if (!project) return null;
  const still = reduceMotion();
  const enter = Math.min(1, p * 2.2);
  const tilt = still ? 0 : (1 - enter) * 28;
  const scale = still ? 1 : 0.86 + 0.14 * enter;
  const lift = still ? 0 : (1 - enter) * 80 - p * 60;
  const turn = still ? 0 : mx * 5;
  const letters = data.title.split("");
  return (
    <section className="scene" ref={ref} aria-label={data.title}>
      <div className="bignum" aria-hidden="true" style={{ transform: `translateY(${still ? 0 : (0.5 - p) * 240}px)` }}>
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="sticky">
        <div className="copy">
          <div className="num">{String(index + 1).padStart(2, "0")} · {data.kind}</div>
          <h3 aria-label={data.title}>
            {letters.map((c, k) => {
              const t = still ? 1 : Math.max(0, Math.min(1, enter * 1.6 - k * 0.04));
              return (
                <span key={k} aria-hidden="true" style={{ opacity: t, transform: `translateY(${(1 - t) * 60}%) rotate(${(1 - t) * 8}deg)` }}>
                  {c === " " ? " " : c}
                </span>
              );
            })}
          </h3>
          <p style={{ opacity: still ? 1 : Math.min(1, enter * 1.4 - 0.3) }}>{data.text}</p>
          <div className="chips">{project.tools.map((t) => <span key={t}>{t}</span>)}</div>
          <Link className="pill ghost" to={`/projeto/${project.id}`} onPointerMove={magnetic} onPointerLeave={magneticOut}>Ver projeto completo →</Link>
        </div>
        <div className="frame">
          <div className="halo" aria-hidden="true" />
          <div className="win" style={{ transform: `translateY(${lift}px) rotateX(${tilt}deg) rotateY(${turn}deg) scale(${scale})` }}>
            <div className="bar" aria-hidden="true"><i /><i /><i /></div>
            <div className="shot" style={{ transform: `scale(1.12) translateY(${still ? 0 : (0.5 - p) * 8}%)` }}>
              <Thumb src={project.thumbnailUrl} title={project.title} alt={`Projeto ${project.title}`} />
            </div>
            <div className="shine" aria-hidden="true" style={{ transform: `translateX(${(p * 2 - 1) * 120}%)` }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="cine-services" id="servicos" aria-label="Serviços">
      {[
        ["01", "Sites e landing pages", "Páginas rápidas, bonitas e pensadas para transformar visitantes em clientes."],
        ["02", "Identidade visual", "Logo, cores, tipografia e peças que fazem a sua marca ser lembrada e escolhida."],
        ["03", "Diagramação de livros", "Livros, apostilas e e-books prontos para a gráfica e para publicação digital."],
      ].map(([n, t, d]) => (
        <div className="item" key={n}>
          <b>{n}</b>
          <h4>{t}</h4>
          <p>{d}</p>
          {n === "03" ? (
            <Link className="more" to="/diagramacao-de-livros">Conhecer o serviço</Link>
          ) : (
            <a className="more" href={WHATSAPP} target="_blank" rel="noopener noreferrer">Pedir orçamento</a>
          )}
        </div>
      ))}
    </section>
  );
}

function Cta() {
  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <section className="cine-cta" id="contato" aria-label="Contato">
      <div className="card" onPointerMove={onMove}>
        <div className="kicker">Orçamento sob medida</div>
        <h2>Vamos criar<br />algo único?</h2>
        <p>Cada projeto é diferente, então cada proposta também. Me conte sua ideia e receba uma proposta clara, com escopo, etapas e prazos.</p>
        <div className="actions">
          <a className="pill" href={WHATSAPP} target="_blank" rel="noopener noreferrer" onPointerMove={magnetic} onPointerLeave={magneticOut}>Falar no WhatsApp</a>
          <a className="pill ghost" href="mailto:rayssamartins33@gmail.com" onPointerMove={magnetic} onPointerLeave={magneticOut}>rayssamartins33@gmail.com</a>
        </div>
      </div>
    </section>
  );
}

const Novo = () => {
  const [ready, setReady] = useState(false);
  const s = useSmoothScroll();
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <main className="cine">
      <Helmet>
        <html lang="pt-BR" />
        <title>Prévia · Rayssa Martins</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {!ready && <Loader onDone={() => setReady(true)} />}
      <Cursor />
      <div className="cine-progress" aria-hidden="true" style={{ transform: `scaleX(${progress})` }} />

      <header className="cine-nav">
        <Link to="/novo" className="logo">RAYSSA<span>.</span></Link>
        <nav aria-label="Principal">
          <a href="#projetos">Projetos</a>
          <a href="#servicos">Serviços</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      <Hero ready={ready} s={s} />
      <Marquee v={s.v} text="SITES ✦ MARCAS ✦ LIVROS ✦ " />
      <Marquee v={s.v} reverse outline text="DIREÇÃO DE ARTE ✦ FORTALEZA ✦ " />
      <Manifesto />
      <Carousel my={s.my} />
      {SCENES.map((sc, k) => <Scene key={sc.id} index={k} data={sc} mx={s.mx} />)}
      <Services />
      <Cta />

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
};

export default Novo;
