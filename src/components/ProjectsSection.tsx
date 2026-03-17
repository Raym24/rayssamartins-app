import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ProjectsSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="projects" className="py-24 relative" ref={ref}>
      <span className="absolute top-12 right-16 text-3xl animate-float opacity-25 pointer-events-none">🖌️</span>

      <div className="container mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 scroll-reveal">
          Proje<span className="text-gradient">tos</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <Link
              key={project.id}
              to={`/projeto/${project.id}`}
              className={`group rounded-2xl overflow-hidden bg-card border border-border hover-tilt hover:shadow-xl transition-all duration-300 scroll-reveal stagger-${Math.min(i + 1, 8)}`}
            >
              <div className="aspect-[4/3] overflow-hidden bg-secondary relative">
                <img
                  src={project.thumbnailUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Glassmorphism overlay on hover */}
                <div className="absolute inset-0 glass opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-sm font-display font-semibold text-foreground">Ver Projeto ✦</span>
                </div>
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display font-semibold text-sm leading-snug">
                    {project.title}
                  </h3>
                  <ArrowUpRight size={16} className="shrink-0 text-muted-foreground group-hover:text-foreground group-hover:rotate-45 transition-all duration-300" />
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {project.shortDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
