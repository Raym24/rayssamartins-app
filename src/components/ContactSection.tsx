import { Mail, ExternalLink, Phone } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ContactSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="contact" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background decorative elements */}
      <div className="absolute top-10 right-10 w-24 h-24 border-2 border-primary/20 rotate-12 pointer-events-none animate-float" />
      <div className="absolute bottom-10 left-10 w-16 h-16 bg-primary/5 pointer-events-none animate-bounce-soft" />
      <span className="absolute top-12 left-20 text-4xl animate-wave opacity-20 pointer-events-none">★</span>

      <div className="container mx-auto px-6 text-center max-w-3xl relative z-10">
        <div className="scroll-reveal">
          <h2 className="font-display-bold text-5xl md:text-8xl tracking-tight uppercase mb-4">
            VAMOS <span className="text-primary">CONVERSAR?</span>
          </h2>
          <p className="text-muted-foreground mb-10 text-lg">
            Estou disponível para projetos freelance e oportunidades fulltime.
            Entre em contato e vamos criar algo incrível juntos.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 scroll-reveal">
          <a
            href="mailto:rayssamartins33@gmail.com"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:scale-105 hover:shadow-lg transition-all duration-300 animate-glow-pulse"
          >
            <Mail size={18} /> Enviar E-mail
          </a>
          <a
            href="https://www.behance.net/rayssamartins3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-foreground px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-foreground hover:text-background transition-all duration-300"
          >
            <ExternalLink size={18} /> Behance
          </a>
          <a
            href="https://wa.me/5585991706850"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-foreground px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-foreground hover:text-background transition-all duration-300"
          >
            <Phone size={18} /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
