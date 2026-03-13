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

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-12">
          Habili<span className="text-gradient">dades</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Hard Skills</h3>
            <div className="flex flex-wrap gap-3">
              {hardSkills.map((skill) => (
                <span key={skill.name} className={skill.sticker}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Soft Skills</h3>
            <div className="flex flex-wrap gap-3">
              {softSkills.map((skill) => (
                <span key={skill.name} className={skill.sticker}>
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
