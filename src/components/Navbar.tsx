import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLanguage, type Language } from "@/contexts/LanguageContext";

const navLinks = {
  pt: [
    { label: "Início", href: "#hero" }, { label: "Sobre", href: "#about" },
    { label: "Skills", href: "#skills" }, { label: "Projetos", href: "#projects" },
    { label: "Contato", href: "#contact" },
  ],
  en: [
    { label: "Home", href: "#hero" }, { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" }, { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, isEnglish, languagePath, selectLanguage } = useLanguage();
  const isHome = location.pathname === "/" || location.pathname === "/en";
  const homePath = isEnglish ? "/en" : "/";

  const handleClick = (href: string) => {
    setIsOpen(false);
    if (!isHome) return;
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const LanguageSelector = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`flex items-center ${mobile ? "min-h-11" : ""}`} aria-label={isEnglish ? "Language" : "Idioma"}>
      {(["pt", "en"] as Language[]).map((item, index) => (
        <span key={item} className="flex items-center">
          {index > 0 && <span className="mx-2 text-border" aria-hidden="true">|</span>}
          <Link
            to={languagePath(item)}
            onClick={() => { selectLanguage(item); setIsOpen(false); }}
            lang={item === "pt" ? "pt-BR" : "en"}
            aria-current={language === item ? "page" : undefined}
            className={`inline-flex items-center justify-center uppercase text-xs font-semibold tracking-[0.15em] ${mobile ? "min-h-11 min-w-11" : ""} ${language === item ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            {item}
          </Link>
        </span>
      ))}
    </div>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-14 px-6">
        <Link to={homePath} className="font-display-bold text-2xl tracking-wider uppercase group">
          RAYSSA<span className="text-primary">.</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
          {navLinks[language].map((link) => (
            <li key={link.href}>
              {isHome ? (
                <button
                  onClick={() => handleClick(link.href)}
                  className="relative text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bottom-[-4px] after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  to={`${homePath}${link.href}`}
                  className="relative text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bottom-[-4px] after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
          </ul>
          <LanguageSelector />
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden min-h-11 min-w-11 inline-flex items-center justify-center"
          type="button"
          aria-label={isOpen ? (isEnglish ? "Close menu" : "Fechar menu") : (isEnglish ? "Open menu" : "Abrir menu")}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-navigation"
        className={`md:hidden bg-background border-b border-border px-6 overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? "max-h-64 pb-4 opacity-100" : "max-h-0 pb-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-3">
          {navLinks[language].map((link, i) => (
            <li
              key={link.href}
              style={{ transitionDelay: isOpen ? `${i * 50}ms` : "0ms" }}
              className={`transition-all duration-300 ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}
            >
              {isHome ? (
                <button
                  onClick={() => handleClick(link.href)}
                  className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  to={`${homePath}${link.href}`}
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
          <li><LanguageSelector mobile /></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
