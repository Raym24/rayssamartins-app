const Footer = () => {
  return (
    <footer className="border-t border-border py-8">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-display text-sm font-semibold">
          Rayssa<span className="text-gradient">.</span>
        </p>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Rayssa Martins. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
