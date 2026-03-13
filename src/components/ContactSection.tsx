import { Mail, ExternalLink } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-secondary">
      <div className="container mx-auto px-6 text-center max-w-2xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
          Vamos <span className="text-gradient">conversar?</span>
        </h2>
        <p className="text-muted-foreground mb-8">
          Estou disponível para projetos freelance e oportunidades fulltime.
          Entre em contato e vamos criar algo incrível juntos.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="mailto:contato@rayssamartins.com"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Mail size={16} /> Enviar E-mail
          </a>
          <a
            href="https://www.behance.net/rayssamartins3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium hover:bg-card transition-colors"
          >
            <ExternalLink size={16} /> Behance
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
