import { Link } from "react-router-dom";
import { ArrowUpRight, BookOpen, Monitor, PenTool } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

const WHATSAPP = "5585991706850";

const waLink = (service: string, isEnglish: boolean) => {
  const text = isEnglish
    ? `Hi, Rayssa! I came from your website and would like a quote for ${service}.`
    : `Olá, Rayssa! Vim pelo seu site e gostaria de um orçamento de ${service}.`;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
};

type Service = {
  icon: LucideIcon;
  title: { pt: string; en: string };
  text: { pt: string; en: string };
  waService: { pt: string; en: string };
  page?: string;
};

const services: Service[] = [
  {
    icon: Monitor,
    title: { pt: "Sites e Landing Pages", en: "Websites & Landing Pages" },
    text: {
      pt: "Páginas rápidas e bonitas, pensadas para transformar visitantes em clientes.",
      en: "Fast, beautiful pages designed to turn visitors into clients.",
    },
    waService: { pt: "site / landing page", en: "a website / landing page" },
  },
  {
    icon: PenTool,
    title: { pt: "Identidade Visual", en: "Visual Identity" },
    text: {
      pt: "Logo, cores e peças para redes sociais que fazem sua marca ser lembrada.",
      en: "Logo, colors and social media pieces that make your brand memorable.",
    },
    waService: { pt: "identidade visual", en: "a visual identity" },
  },
  {
    icon: BookOpen,
    title: { pt: "Diagramação de Livros", en: "Book Layout" },
    text: {
      pt: "Livros, apostilas e e-books prontos para a gráfica e para publicação digital.",
      en: "Books, workbooks and e-books ready for print and digital publishing.",
    },
    waService: { pt: "diagramação", en: "book layout" },
    page: "/diagramacao-de-livros",
  },
];

const ServicesSection = () => {
  const ref = useScrollReveal();
  const { isEnglish } = useLanguage();
  const lang = isEnglish ? "en" : "pt";

  return (
    <section id="services" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-4 mb-4 scroll-reveal">
          <h2 className="font-display-bold text-5xl md:text-7xl tracking-tight uppercase">
            {isEnglish ? <>SERV<span className="text-primary">ICES</span></> : <>SERVI<span className="text-primary">ÇOS</span></>}
          </h2>
          <div className="hidden md:block flex-1 h-[2px] bg-foreground/10" />
          <span className="text-3xl animate-float text-primary">✦</span>
        </div>
        <p className="text-muted-foreground max-w-2xl mb-12 scroll-reveal">
          {isEnglish
            ? "Each project is unique, so every quote is tailored. Tell me what you need and I'll reply with a clear proposal."
            : "Cada projeto é único, por isso cada orçamento é feito sob medida. Conte o que você precisa e receba uma proposta clara."}
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, text, waService, page }, i) => (
            <article
              key={title.pt}
              className={`group flex flex-col border border-border hover:border-primary bg-card p-8 transition-all duration-500 scroll-reveal stagger-${i + 1}`}
            >
              <Icon size={32} className="text-primary mb-6" aria-hidden="true" />
              <h3 className="font-heading font-bold text-lg uppercase tracking-wide mb-3">{title[lang]}</h3>
              <p className="text-sm text-muted-foreground flex-1">{text[lang]}</p>
              <div className="pt-8">
                {page && !isEnglish ? (
                  <Link
                    to={page}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-xs font-semibold uppercase tracking-wider hover:scale-105 hover:shadow-lg transition-all duration-300"
                  >
                    Conhecer o serviço <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                ) : (
                  <a
                    href={waLink(waService[lang], isEnglish)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border-2 border-foreground px-6 py-3 text-xs font-semibold uppercase tracking-wider hover:bg-foreground hover:text-background transition-all duration-300"
                  >
                    {isEnglish ? "Get a quote" : "Pedir orçamento"} <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
