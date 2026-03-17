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
      <AnimatedDivider text="ABOUT ME" variant="red" />
      <AboutSection />
      <AnimatedDivider text="SKILLS & TOOLS" variant="black" />
      <SkillsSection />
      <AnimatedDivider text="PROJECTS" variant="red" />
      <ProjectsSection />
      <AnimatedDivider text="GET IN TOUCH" variant="black" />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
