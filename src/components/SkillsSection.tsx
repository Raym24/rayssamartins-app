import { useScrollReveal } from "@/hooks/useScrollReveal";
import Marquee from "./Marquee";

const hardSkills = [
  "UI/UX Design", "Web Design", "Figma", "Adobe XD",
  "Photoshop", "Illustrator", "InDesign", "Lightroom",
  "Especialista em IA", "Automações", "Apps e Sites com IA",
  "Agentes de IA", "Fotografia",
];

const softSkills = [
  "Resolução de Problemas", "Comunicação", "Criatividade",
  "Trabalho em Equipe", "Gestão de Tempo", "Pensamento Crítico",
];

const marqueeSkills = ["FIGMA", "✦", "PHOTOSHOP", "✦", "UI/UX", "✦", "WEB DESIGN", "✦", "ILLUSTRATOR", "✦", "ADOBE XD", "✦", "IA & AUTOMAÇÕES", "✦", "FOTOGRAFIA", "✦"];

const SkillsSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-4 mb-12 scroll-reveal">
          <h2 className="font-display-bold text-5xl md:text-7xl tracking-tight uppercase">
            HABILI<span className="text-primary">DADES</span>
          </h2>
          <div className="hidden md:block flex-1 h-[2px] bg-foreground/10" />
          <span className="text-3xl animate-sparkle text-primary">★</span>
        </div>

        {/* Single skills marquee */}
        <div className="mb-16 scroll-reveal marquee-band-black py-4">
          <Marquee speed={20}>
            {marqueeSkills.map((skill, i) => (
              <span key={i} className="mx-6 text-lg md:text-xl font-display-bold tracking-[0.15em]">
                {skill}
              </span>
            ))}
          </Marquee>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="scroll-reveal-left">
            <h3 className="font-heading text-sm font-bold uppercase tracking-[0.2em] mb-6 text-primary">
              Hard Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {hardSkills.map((skill, i) => (
                <span
                  key={skill}
                  className={`px-5 py-2.5 border-2 border-foreground text-sm font-semibold uppercase tracking-wider hover:bg-foreground hover:text-background transition-all duration-300 cursor-default scroll-reveal-pop stagger-${Math.min(i + 1, 8)}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="scroll-reveal-right">
            <h3 className="font-heading text-sm font-bold uppercase tracking-[0.2em] mb-6 text-primary">
              Soft Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {softSkills.map((skill, i) => (
                <span
                  key={skill}
                  className={`px-5 py-2.5 border-2 border-primary/30 text-sm font-semibold uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-default scroll-reveal-pop stagger-${Math.min(i + 1, 8)}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
