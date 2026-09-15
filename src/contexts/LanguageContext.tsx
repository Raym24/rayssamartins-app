import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export type Language = "pt" | "en";

interface LanguageContextValue {
  language: Language;
  isEnglish: boolean;
  languagePath: (target: Language) => string;
  selectLanguage: (target: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const pathForLanguage = (pathname: string, target: Language) => {
  const withoutEnglishPrefix = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  return target === "en"
    ? withoutEnglishPrefix === "/" ? "/en" : `/en${withoutEnglishPrefix}`
    : withoutEnglishPrefix;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const language: Language = location.pathname === "/en" || location.pathname.startsWith("/en/") ? "en" : "pt";

  useEffect(() => {
    if (location.pathname === "/" && localStorage.getItem("portfolio-language") === "en") {
      navigate("/en", { replace: true });
      return;
    }

    localStorage.setItem("portfolio-language", language);
    document.documentElement.lang = language === "en" ? "en" : "pt-BR";
  }, [language, location.pathname, navigate]);

  const languagePath = (target: Language) => pathForLanguage(location.pathname, target);
  const selectLanguage = (target: Language) => localStorage.setItem("portfolio-language", target);

  return (
    <LanguageContext.Provider value={{ language, isEnglish: language === "en", languagePath, selectLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
};