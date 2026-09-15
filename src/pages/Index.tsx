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

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>Rayssa Martins — Diretora de Arte e Designer</title>
        <meta name="description" content="Portfólio de Rayssa Martins, diretora de arte e designer multidisciplinar com mais de 10 anos de experiência em branding, UI/UX, fotografia e web." />
        <link rel="canonical" href="https://rayssamartins.app/" />
        <meta property="og:url" content="https://rayssamartins.app/" />
      </Helmet>
      <FloatingElements />
      <Navbar />
      <HeroSection />
      <AnimatedDivider text="SOBRE MIM" variant="red" />
      <AboutSection />
      
      <SkillsSection />
      <AnimatedDivider text="PROJETOS" variant="red" />
      <ProjectsSection />
      <AnimatedDivider text="ENTRE EM CONTATO" variant="black" />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
