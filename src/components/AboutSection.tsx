import { MapPin, Briefcase, Mail, ExternalLink } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-12">
          Sobre <span className="text-gradient">Mim</span>
        </h2>
        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-3 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Sou Rayssa Martins, designer apaixonada por criar experiências digitais que unem beleza e funcionalidade.
              Com experiência em UI/UX Design e Web Design, transformo ideias em interfaces intuitivas que conectam
              marcas aos seus usuários.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Minha abordagem combina pesquisa de usuário, princípios de design centrado no humano e uma execução visual
              refinada. Cada projeto é uma oportunidade de resolver problemas reais de forma criativa e impactante.
            </p>
          </div>
          <div className="md:col-span-2 space-y-4">
            <div className="rounded-2xl bg-secondary p-6 space-y-4">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-accent-coral" />
                <span className="text-sm">Brasil</span>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase size={18} className="text-accent-blue" />
                <span className="text-sm">Freelance & Fulltime</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-accent-pink" />
                <span className="text-sm">contato@rayssamartins.com</span>
              </div>
              <div className="flex gap-3 pt-2">
                <a
                  href="https://www.behance.net/rayssamartins3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sticker-yellow"
                >
                  <ExternalLink size={14} /> Behance
                </a>
                <a href="#contact" className="sticker-mint">
                  <ExternalLink size={14} /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
