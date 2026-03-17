import { useScrollReveal } from "@/hooks/useScrollReveal";
import Marquee from "./Marquee";

const hardSkills = [
  { name: "UI/UX Design", sticker: "sticker-pink" },
  { name: "Web Design", sticker: "sticker-blue" },
  { name: "Figma", sticker: "sticker-yellow" },
  { name: "Adobe XD", sticker: "sticker-coral" },
  { name: "Photoshop", sticker: "sticker-mint" },
  { name: "Illustrator", sticker: "sticker-pink" },
  { name: "InDesign", sticker: "sticker-blue" },
  { name: "Lightroom", sticker: "sticker-yellow" },
];

const softSkills = [
  { name: "Resolução de Problemas", sticker: "sticker-mint" },
  { name: "Comunicação", sticker: "sticker-coral" },
  { name: "Criatividade", sticker: "sticker-pink" },
  { name: "Trabalho em Equipe", sticker: "sticker-blue" },
  { name: "Gestão de Tempo", sticker: "sticker-yellow" },
  { name: "Pensamento Crítico", sticker: "sticker-mint" },
];

const marqueeSkills = ["Figma", "✦", "Photoshop", "✦", "UI/UX", "✦", "Web Design", "✦", "Illustrator", "✦", "Adobe XD", "✦", "Criatividade", "✦", "Inovação", "✦"];

const SkillsSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="skills" className="py-24 bg-secondary relative" ref={ref}>
      <span className="absolute top-8 left-8 text-2xl animate-sparkle opacity-30 pointer-events-none">✨</span>
      <span className="absolute bottom-12 right-12 text-3xl animate-float opacity-30 pointer-events-none">🎨</span>

      <div className="container mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 scroll-reveal">
          Habili<span className="text-gradient">dades</span>
        </h2>

        {/* Marquee ticker */}
        <div className="mb-12 scroll-reveal">
          <Marquee speed={25} className="py-3 border-y border-border text-lg font-display font-semibold text-muted-foreground">
            {marqueeSkills.map((skill, i) => (
              <span key={i} className="mx-4">{skill}</span>
            ))}
          </Marquee>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="font-display text-lg font-semibold mb-4 scroll-reveal">Hard Skills</h3>
            <div className="flex flex-wrap gap-3">
              {hardSkills.map((skill, i) => (
                <span
                  key={skill.name}
                  className={`${skill.sticker} scroll-reveal-pop stagger-${i + 1} hover:scale-110 transition-transform cursor-default`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold mb-4 scroll-reveal">Soft Skills</h3>
            <div className="flex flex-wrap gap-3">
              {softSkills.map((skill, i) => (
                <span
                  key={skill.name}
                  className={`${skill.sticker} scroll-reveal-pop stagger-${i + 1} hover:scale-110 transition-transform cursor-default`}
                >
                  {skill.name}
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
