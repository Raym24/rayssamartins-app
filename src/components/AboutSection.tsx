import { MapPin, Briefcase, Mail, ExternalLink } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import raysaAboutPhoto from "@/assets/rayssa-about.png";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutSection = () => {
  const ref = useScrollReveal();
  const { isEnglish } = useLanguage();

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-4 mb-12 scroll-reveal">
          <h2 className="font-display-bold text-5xl md:text-7xl tracking-tight uppercase">
            {isEnglish ? <>ABOUT <span className="text-primary">ME</span></> : <>SOBRE <span className="text-primary">MIM</span></>}
          </h2>
          <div className="hidden md:block flex-1 h-[2px] bg-foreground/10" />
          <span className="text-3xl animate-float">★</span>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Photo */}
          <div className="scroll-reveal-left">
            <div className="aspect-[3/4] border-2 border-border flex items-center justify-center relative overflow-hidden group">
              <img
                src={raysaAboutPhoto}
                alt="Rayssa Martins"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              {/* Red corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-2 border-foreground" />
            </div>
          </div>

          {/* Info blocks */}
          <div className="space-y-8 scroll-reveal-right">
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed text-lg">
                 {isEnglish ? "I am a Senior Art Director and multidisciplinary designer with over 10 years of experience creating identities, campaigns and digital experiences for brands in Brazil, the United States and Portugal." : "Sou Diretora de Arte Sênior e designer multidisciplinar, com mais de 10 anos de experiência criando identidades, campanhas e experiências digitais para marcas do Brasil, Estados Unidos e Portugal."}
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                 {isEnglish ? "My work connects art direction, branding, digital design, UI/UX, photography and web, transforming business goals into consistent, functional visual solutions with personality." : "Minha atuação conecta direção de arte, branding, design digital, UI/UX, fotografia e web, transformando objetivos de negócio em soluções visuais consistentes, funcionais e com personalidade."}
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                 {isEnglish ? "In recent years, I have also expanded my work into the intersection of design and technology, using generative AI, automations and digital solutions as part of the creative process — always with a strategic eye, visual repertoire and a focus on results." : "Nos últimos anos, também ampliei meu trabalho para a interseção entre design e tecnologia, utilizando IA generativa, automações e soluções digitais como parte do processo criativo — sempre com olhar estratégico, repertório visual e foco em resultado."}
              </p>
            </div>

            {/* Info cards */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border border-border hover:border-primary transition-colors">
                <MapPin size={20} className="text-primary shrink-0" />
                <div>
                   <span className="text-xs uppercase tracking-wider text-muted-foreground">{isEnglish ? "Location" : "Localização"}</span>
                   <p className="font-semibold">Fortaleza, CE ({isEnglish ? "Brazil" : "Brasil"})</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 border border-border hover:border-primary transition-colors">
                <Briefcase size={20} className="text-primary shrink-0" />
                <div>
                   <span className="text-xs uppercase tracking-wider text-muted-foreground">{isEnglish ? "Availability" : "Disponibilidade"}</span>
                   <p className="font-semibold">{isEnglish ? "Freelance & Full-time" : "Freelance & Fulltime"}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 border border-border hover:border-primary transition-colors">
                <Mail size={20} className="text-primary shrink-0" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">E-mail</span>
                  <p className="font-semibold">rayssamartins33@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href="https://www.behance.net/rayssamartins3"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 text-sm font-semibold uppercase tracking-wider hover:bg-primary transition-colors"
              >
                <ExternalLink size={14} /> Behance
              </a>
              <a
                href="https://wa.me/5585991706850"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-foreground px-5 py-2.5 text-sm font-semibold uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors"
              >
                <ExternalLink size={14} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
