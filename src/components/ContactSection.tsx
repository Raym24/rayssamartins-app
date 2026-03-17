import { Mail, ExternalLink } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ContactSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="contact" className="py-24 bg-secondary relative overflow-hidden" ref={ref}>
      {/* Animated background shapes */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-accent-pink opacity-10 animate-float pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-16 h-16 rounded-full bg-accent-yellow opacity-10 animate-bounce-soft pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-12 h-12 border-2 border-accent-blue opacity-10 rotate-45 animate-spin-slow pointer-events-none" />
      <span className="absolute top-8 right-20 text-3xl animate-wave opacity-30 pointer-events-none">👋</span>

      <div className="container mx-auto px-6 text-center max-w-2xl relative z-10">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 scroll-reveal">
          Vamos <span className="text-gradient">conversar?</span>
        </h2>
        <p className="text-muted-foreground mb-8 scroll-reveal">
          Estou disponível para projetos freelance e oportunidades fulltime.
          Entre em contato e vamos criar algo incrível juntos.
        </p>
        <div className="flex flex-wrap justify-center gap-4 scroll-reveal">
          <a
            href="mailto:contato@rayssamartins.com"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 animate-glow-pulse"
          >
            <Mail size={16} /> Enviar E-mail
          </a>
          <a
            href="https://www.behance.net/rayssamartins3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium hover:bg-card hover:scale-105 transition-all duration-300"
          >
            <ExternalLink size={16} /> Behance
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
