const elements = [
  { emoji: "⭐", className: "animate-float top-[15%] left-[5%] text-3xl", delay: "0s" },
  { emoji: "🎨", className: "animate-float-alt top-[25%] right-[8%] text-2xl", delay: "1s" },
  { emoji: "✏️", className: "animate-bounce-soft top-[55%] left-[3%] text-2xl", delay: "0.5s" },
  { emoji: "💖", className: "animate-float top-[70%] right-[5%] text-3xl", delay: "1.5s" },
  { emoji: "✨", className: "animate-sparkle top-[40%] left-[92%] text-xl", delay: "0.8s" },
  { emoji: "🌟", className: "animate-wiggle top-[85%] left-[10%] text-2xl", delay: "2s" },
  { emoji: "🎯", className: "animate-float-alt top-[10%] left-[50%] text-xl", delay: "0.3s" },
  { emoji: "💫", className: "animate-bounce-soft top-[60%] right-[15%] text-xl", delay: "1.2s" },
];

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {elements.map((el, i) => (
        <span
          key={i}
          className={`absolute opacity-40 ${el.className}`}
          style={{ animationDelay: el.delay }}
        >
          {el.emoji}
        </span>
      ))}
      {/* CSS animated shapes */}
      <div className="absolute top-[30%] left-[15%] w-4 h-4 rounded-full bg-accent-pink opacity-20 animate-float" style={{ animationDelay: "0.7s" }} />
      <div className="absolute top-[50%] right-[20%] w-3 h-3 rounded-full bg-accent-yellow opacity-20 animate-bounce-soft" style={{ animationDelay: "1.3s" }} />
      <div className="absolute top-[75%] left-[40%] w-5 h-5 rounded-full bg-accent-blue opacity-15 animate-float-alt" style={{ animationDelay: "0.4s" }} />
      <div className="absolute top-[20%] right-[35%] w-6 h-6 border-2 border-accent-coral opacity-15 rotate-45 animate-spin-slow" />
    </div>
  );
};

export default FloatingElements;
