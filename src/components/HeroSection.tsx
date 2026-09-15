import { useState, useCallback } from "react";
import raysaPhoto from "@/assets/rayssa-photo.png";

const decorativeElements = [
  { content: "★", x: 80, y: 15, anim: "animate-float", size: "text-5xl", color: "text-primary" },
  { content: "✦", x: 10, y: 20, anim: "animate-bounce-soft", size: "text-3xl", color: "text-foreground" },
  { content: "●", x: 88, y: 70, anim: "animate-sparkle", size: "text-2xl", color: "text-primary" },
  { content: "✶", x: 5, y: 75, anim: "animate-float-alt", size: "text-4xl", color: "text-primary" },
  { content: "○", x: 92, y: 40, anim: "animate-spin-slow", size: "text-3xl", color: "text-foreground opacity-30" },
  { content: "◆", x: 15, y: 50, anim: "animate-wiggle", size: "text-xl", color: "text-foreground opacity-20" },
];

const HeroSection = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouse({ x, y });
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center pt-16 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${raysaPhoto})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Overlay removido — foto visível */}

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Year badge */}
          <div className="flex items-center gap-3 scroll-reveal">
            <span className="sticker-red text-xs tracking-widest uppercase font-semibold">
              Portfólio 2025
            </span>
            <span className="sticker-outline text-xs tracking-widest uppercase font-semibold">
              🇧🇷 Brasil
            </span>
          </div>

          {/* Main name */}
          <h1 className="max-w-full font-display-bold text-[clamp(3rem,15vw,12rem)] leading-[0.85] tracking-normal scroll-reveal text-white">
            <span className="block whitespace-nowrap">RAYSSA</span>
            <span className="block whitespace-nowrap text-primary">MARTINS</span>
            <span className="sr-only"> — UI/UX Designer &amp; Web Designer</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/80 font-body max-w-lg scroll-reveal">
            UI/UX Designer & Web Designer criando experiências digitais que encantam e convertem.
          </p>

          {/* CTA buttons */}
          <div className="flex gap-4 pt-4 scroll-reveal">
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 text-sm font-semibold uppercase tracking-wider hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              Ver Projetos →
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 border-2 border-foreground px-8 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-foreground hover:text-background transition-all duration-300"
            >
              Contato
            </a>
          </div>

          {/* Photo below interactive elements */}
          <div className="mt-8 scroll-reveal">
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
              <img
                src={raysaPhoto}
                alt="Rayssa Martins"
                className="w-full h-full object-cover object-top rounded-full border-4 border-primary shadow-2xl"
              />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rotate-12 animate-bounce-soft" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-2 border-foreground rotate-45 animate-float" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating decorative elements with parallax */}
      {decorativeElements.map((el, i) => (
        <span
          key={i}
          className={`absolute ${el.anim} ${el.size} ${el.color} pointer-events-none select-none`}
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            transform: `translate(${mouse.x * (15 + i * 5)}px, ${mouse.y * (15 + i * 5)}px)`,
            transition: "transform 0.4s ease-out",
            animationDelay: `${i * 0.3}s`,
          }}
        >
          {el.content}
        </span>
      ))}

      {/* Geometric shapes */}
      <div
        className="absolute w-32 h-32 border-2 border-primary/20 rotate-45 pointer-events-none"
        style={{
          right: "10%",
          bottom: "20%",
          transform: `rotate(45deg) translate(${mouse.x * 20}px, ${mouse.y * 20}px)`,
          transition: "transform 0.5s ease-out",
        }}
      />
      <div
        className="absolute w-20 h-20 border-2 border-foreground/10 rounded-full pointer-events-none"
        style={{
          left: "8%",
          bottom: "30%",
          transform: `translate(${mouse.x * 12}px, ${mouse.y * 12}px)`,
          transition: "transform 0.5s ease-out",
        }}
      />
    </section>
  );
};

export default HeroSection;
