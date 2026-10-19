import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import diagramacaoAsset from "@/assets/diagramacao.webp.asset.json";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { projectTranslations } from "@/data/project-translations";

const ProjectsSection = () => {
  const ref = useScrollReveal();
  const { isEnglish } = useLanguage();

  return (
    <section id="projects" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-4 mb-12 scroll-reveal">
          <h2 className="font-display-bold text-5xl md:text-7xl tracking-tight uppercase">
            {isEnglish ? <>PROJ<span className="text-primary">ECTS</span></> : <>PROJE<span className="text-primary">TOS</span></>}
          </h2>
          <div className="hidden md:block flex-1 h-[2px] bg-foreground/10" />
          <span className="text-3xl animate-float text-primary">✦</span>
        </div>

        {/* Large project cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <Link
              key={project.id}
              to={`${isEnglish ? "/en" : ""}/projeto/${project.id}`}
              className={`group relative overflow-hidden border border-border hover:border-primary bg-card transition-all duration-500 scroll-reveal stagger-${Math.min(i + 1, 8)}`}
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={project.thumbnailUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                  style={{ imageRendering: "auto" }}
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-all duration-300 flex items-center justify-center">
                  <span className="text-background font-display-bold text-2xl uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                    {isEnglish ? "View Project" : "Ver Projeto"} <ArrowUpRight size={24} />
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-heading font-bold text-base uppercase tracking-wide">
                    {project.title}
                  </h3>
                  <ArrowUpRight size={18} className="shrink-0 text-muted-foreground group-hover:text-primary group-hover:rotate-45 transition-all duration-300" />
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {isEnglish ? projectTranslations[project.id]?.shortDescription ?? project.shortDescription : project.shortDescription}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tools.slice(0, 3).map((tool) => (
                    <span key={tool} className="text-xs px-2 py-1 border border-border text-muted-foreground uppercase tracking-wider">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-primary group-hover:w-full transition-all duration-500" />
            </Link>
          ))}

          <Link
            to="/diagramacao-de-livros"
            aria-label="Conheça meu trabalho editorial: Diagramação de Livros"
            className="group relative overflow-hidden border border-border hover:border-primary bg-card transition-all duration-500 scroll-reveal stagger-8"
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src={diagramacaoAsset.url}
                alt="Diagramação editorial de livros"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-all duration-300 flex items-center justify-center">
                <span className="text-background font-display-bold text-2xl uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                  Conheça meu trabalho editorial <ArrowUpRight size={24} />
                </span>
              </div>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-heading font-bold text-base uppercase tracking-wide">
                  Diagramação de Livros
                </h3>
                <ArrowUpRight size={18} className="shrink-0 text-muted-foreground group-hover:text-primary group-hover:rotate-45 transition-all duration-300" />
              </div>
              <p className="text-sm text-muted-foreground">
                Diagramação profissional de livros, apostilas, e-books e publicações institucionais, com capa e projeto gráfico.
              </p>
              <span className="inline-flex items-center gap-2 pt-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                Conheça meu trabalho editorial <ArrowUpRight size={15} aria-hidden="true" />
              </span>
            </div>
            <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-primary group-hover:w-full transition-all duration-500" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
