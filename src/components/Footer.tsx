import Marquee from "./Marquee";

const footerMarquee = ["Rayssa Martins", "✦", "UI/UX Designer", "✦", "Web Designer", "✦", "Criativa", "✦", "Disponível para projetos", "✦"];

const Footer = () => {
  return (
    <footer className="border-t border-border">
      {/* Marquee ticker */}
      <Marquee speed={30} className="py-4 border-b border-border">
        {footerMarquee.map((item, i) => (
          <span key={i} className="mx-4 text-sm font-display font-semibold text-muted-foreground">
            {item}
          </span>
        ))}
      </Marquee>

      <div className="container mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-display text-sm font-semibold">
          Rayssa<span className="text-gradient">.</span>
          <span className="inline-block animate-wiggle ml-1">✦</span>
        </p>
        <div className="flex items-center gap-2">
          <span className="animate-sparkle">✨</span>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Rayssa Martins. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
