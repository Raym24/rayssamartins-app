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
    : "Rayssa Martins | Diretora de Arte Sênior e Designer Gráfico";
  const description = isEnglish
    ? "Senior Art Director and Multidisciplinary Designer with 10+ years of experience in Branding, Digital Design, UI/UX, Photography and Creative Technology. Based in Brazil, available worldwide."
    : "Diretora de Arte Sênior em Fortaleza, especializada em design gráfico, branding, identidade visual e design digital. Conheça o portfólio de Rayssa Martins.";
  const canonical = isEnglish ? "https://rayssamartins.app/en" : "https://rayssamartins.app/";
  const ogImage = "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/79176605-7226-473e-978e-d49048c896ae/id-preview-12abf1ae--b3b70294-fc86-45ef-900a-84cc5031300b.lovable.app-1773427478197.png";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rayssa Martins",
    url: "https://rayssamartins.app/",
    image: ogImage,
    jobTitle: "Diretora de Arte Sênior e Designer Gráfico",
    description: "Diretora de Arte Sênior em Fortaleza, especializada em design gráfico, branding, identidade visual e design digital.",
    email: "rayssamartins33@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Fortaleza",
      addressRegion: "CE",
      addressCountry: "BR",
    },
    sameAs: ["https://www.behance.net/rayssamartins3"],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rayssa Martins",
    url: "https://rayssamartins.app/",
    description: "Portfólio de Rayssa Martins, Diretora de Arte Sênior e Designer Gráfico.",
    inLanguage: "pt-BR",
    publisher: {
      "@type": "Person",
      name: "Rayssa Martins",
    },
  };

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <html lang={isEnglish ? "en" : "pt-BR"} />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content="Rayssa Martins" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="pt-BR" href="https://rayssamartins.app/" />
        <link rel="alternate" hrefLang="en" href="https://rayssamartins.app/en" />
        <link rel="alternate" hrefLang="x-default" href="https://rayssamartins.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Rayssa Martins" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:locale" content={isEnglish ? "en_US" : "pt_BR"} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Rayssa Martins, Diretora de Arte Sênior e Designer Gráfico" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content="Rayssa Martins, Diretora de Arte Sênior e Designer Gráfico" />
        {!isEnglish && (
          <>
            <script type="application/ld+json">
              {JSON.stringify(personSchema)}
            </script>
            <script type="application/ld+json">
              {JSON.stringify(websiteSchema)}
            </script>
          </>
        )}
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
