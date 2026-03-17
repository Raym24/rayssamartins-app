import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Início", href: "#hero" },
  { label: "Sobre", href: "#about" },
  { label: "Habilidades", href: "#skills" },
  { label: "Projetos", href: "#projects" },
  { label: "Contato", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleClick = (href: string) => {
    setIsOpen(false);
    if (!isHome) return;
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <Link to="/" className="font-display text-xl font-bold tracking-tight group">
          Rayssa<span className="text-gradient">.</span>
          <span className="inline-block group-hover:animate-wiggle">✦</span>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              {isHome ? (
                <button
                  onClick={() => handleClick(link.href)}
                  className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-accent-pink after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  to={`/${link.href}`}
                  className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-accent-pink after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu with slide-in */}
      <div
        className={`md:hidden bg-background border-b border-border px-6 overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? "max-h-64 pb-4 opacity-100" : "max-h-0 pb-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-3">
          {navLinks.map((link, i) => (
            <li
              key={link.href}
              style={{ transitionDelay: isOpen ? `${i * 50}ms` : "0ms" }}
              className={`transition-all duration-300 ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}
            >
              <button
                onClick={() => handleClick(link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
