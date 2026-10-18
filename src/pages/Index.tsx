import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";
import AnimatedDivider from "@/components/AnimatedDivider";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { isEnglish } = useLanguage();
  const title = isEnglish
    ? "Rayssa Martins | Senior Art Director & Multidisciplinary Designer"
    : "Rayssa Martins | Diretora de Arte Sênior & Designer Multidisciplinar";
  const description = isEnglish
    ? "Senior Art Director and Multidisciplinary Designer with 10+ years of experience in Branding, Digital Design, UI/UX, Photography and Creative Technology. Based in Brazil, available worldwide."
    : "Diretora de Arte Sênior com mais de 10 anos de experiência em Branding, Design Digital, UI/UX, Fotografia e Tecnologia Criativa. Projetos no Brasil e no mercado internacional.";
  const canonical = isEnglish ? "https://rayssamartins.app/en" : "https://rayssamartins.app/";

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <html lang={isEnglish ? "en" : "pt-BR"} />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="pt-BR" href="https://rayssamartins.app/" />
        <link rel="alternate" hrefLang="en" href="https://rayssamartins.app/en" />
        <link rel="alternate" hrefLang="x-default" href="https://rayssamartins.app/" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:locale" content={isEnglish ? "en_US" : "pt_BR"} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>
      <FloatingElements />
      <Navbar />
      <HeroSection />
      <AnimatedDivider text={isEnglish ? "ABOUT ME" : "SOBRE MIM"} variant="red" />
      <AboutSection />
      <SkillsSection />
      <AnimatedDivider text={isEnglish ? "PROJECTS" : "PROJETOS"} variant="red" />
      <ProjectsSection />
      <AnimatedDivider text={isEnglish ? "GET IN TOUCH" : "ENTRE EM CONTATO"} variant="black" />
      <ContactSection />
      <section aria-label={isEnglish ? "Editorial design" : "Design editorial"} className="border-t border-border px-6 py-8 text-center">
        <Link
          to="/diagramacao-de-livros"
          className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-primary"
        >
          {isEnglish ? "Professional book layout and editorial design" : "Diagramação profissional de livros e design editorial"}
        </Link>
      </section>
      <Footer />
    </div>
  );
};

export default Index;
