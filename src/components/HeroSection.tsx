import { useState, useCallback } from "react";
import heroIllustration from "@/assets/hero-illustration.png";

const floatingStickers = [
  { emoji: "⭐", x: 75, y: 10, anim: "animate-float", size: "text-4xl" },
  { emoji: "🎨", x: 85, y: 40, anim: "animate-bounce-soft", size: "text-3xl" },
  { emoji: "✏️", x: 70, y: 70, anim: "animate-wiggle", size: "text-3xl" },
  { emoji: "💖", x: 90, y: 65, anim: "animate-float-alt", size: "text-2xl" },
  { emoji: "✨", x: 10, y: 80, anim: "animate-sparkle", size: "text-3xl" },
  { emoji: "🌟", x: 5, y: 30, anim: "animate-float", size: "text-2xl" },
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
      className="min-h-screen flex items-center pt-16 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <span className="sticker-pink animate-bounce-soft" style={{ animationDelay: "0.5s" }}>
              ✨ Disponível para projetos
            </span>
            <span className="sticker-blue animate-bounce-soft" style={{ animationDelay: "0.8s" }}>
              🇧🇷 Brasil
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight tracking-tight">
            Rayssa<br />
            <span className="text-gradient">Martins</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-md font-body">
            UI/UX Designer & Web Designer criando experiências digitais que encantam e convertem.
          </p>
          <div className="flex gap-3 pt-2">
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 animate-glow-pulse"
            >
              ✦ Ver Projetos
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium hover:bg-secondary hover:scale-105 transition-all duration-300"
            >
              💬 Contato
            </a>
          </div>
        </div>
        <div className="flex justify-center relative">
          <img
            src={heroIllustration}
            alt="Ilustração de workspace criativo"
            className="w-full max-w-lg drop-shadow-xl hover:scale-[1.02] transition-transform duration-500"
            loading="eager"
            style={{
              transform: `translate(${mouse.x * 8}px, ${mouse.y * 8}px)`,
              transition: "transform 0.3s ease-out",
            }}
          />
        </div>
      </div>

      {/* Floating stickers with parallax */}
      {floatingStickers.map((s, i) => (
        <span
          key={i}
          className={`absolute ${s.anim} ${s.size} pointer-events-none select-none`}
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            transform: `translate(${mouse.x * (15 + i * 5)}px, ${mouse.y * (15 + i * 5)}px)`,
            transition: "transform 0.4s ease-out",
            animationDelay: `${i * 0.3}s`,
          }}
        >
          {s.emoji}
        </span>
      ))}
    </section>
  );
};

export default HeroSection;
