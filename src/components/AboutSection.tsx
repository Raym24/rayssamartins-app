import { MapPin, Briefcase, Mail, ExternalLink } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import raysaPhoto from "@/assets/rayssa-photo.png";

const AboutSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-4 mb-12 scroll-reveal">
          <h2 className="font-display-bold text-5xl md:text-7xl tracking-tight uppercase">
            SOBRE <span className="text-primary">MIM</span>
          </h2>
          <div className="hidden md:block flex-1 h-[2px] bg-foreground/10" />
          <span className="text-3xl animate-float">★</span>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Photo */}
          <div className="scroll-reveal-left">
            <div className="aspect-[3/4] border-2 border-border flex items-center justify-center relative overflow-hidden group">
              <img
                src={raysaPhoto}
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
                Sou Rayssa Martins, designer apaixonada por criar experiências digitais que unem beleza e funcionalidade.
                Com experiência em UI/UX Design e Web Design, transformo ideias em interfaces intuitivas que conectam
                marcas aos seus usuários.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Minha abordagem combina pesquisa de usuário, princípios de design centrado no humano e uma execução visual
                refinada. Cada projeto é uma oportunidade de resolver problemas reais de forma criativa e impactante.
              </p>
            </div>

            {/* Info cards */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border border-border hover:border-primary transition-colors">
                <MapPin size={20} className="text-primary shrink-0" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">Localização</span>
                  <p className="font-semibold">Brasil</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 border border-border hover:border-primary transition-colors">
                <Briefcase size={20} className="text-primary shrink-0" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">Disponibilidade</span>
                  <p className="font-semibold">Freelance & Fulltime</p>
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
