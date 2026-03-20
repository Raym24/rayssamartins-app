import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";
import AnimatedDivider from "@/components/AnimatedDivider";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
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
