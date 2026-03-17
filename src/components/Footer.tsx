import Marquee from "./Marquee";

const footerMarquee = ["RAYSSA MARTINS", "✦", "UI/UX DESIGNER", "✦", "WEB DESIGNER", "✦", "DISPONÍVEL PARA PROJETOS", "✦"];

const Footer = () => {
  return (
    <footer className="border-t border-border">
      {/* Red marquee band */}
      <div className="marquee-band">
        <Marquee speed={25}>
          {footerMarquee.map((item, i) => (
            <span key={i} className="mx-6 text-sm font-display-bold tracking-[0.2em]">
              {item}
            </span>
          ))}
        </Marquee>
      </div>

      <div className="container mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-display-bold text-xl tracking-wider uppercase">
          RAYSSA<span className="text-primary">.</span>
        </p>
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          © {new Date().getFullYear()} Rayssa Martins. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
