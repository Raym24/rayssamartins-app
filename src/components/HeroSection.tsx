import heroIllustration from "@/assets/hero-illustration.png";

const HeroSection = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-16">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <span className="sticker-pink">✨ Disponível para projetos</span>
            <span className="sticker-blue">🇧🇷 Brasil</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight tracking-tight">
            Rayssa<br />
            <span className="text-gradient">Martins</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-md font-body">
            UI/UX Designer & Web Designer criando experiências digitais que encantam e convertem.
          </p>
          <div className="flex gap-3 pt-2">
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Ver Projetos
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium hover:bg-secondary transition-colors"
            >
              Contato
            </a>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src={heroIllustration}
            alt="Ilustração de workspace criativo"
            className="w-full max-w-lg drop-shadow-xl"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
