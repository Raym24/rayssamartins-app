const elements = [
  { content: "★", className: "animate-float top-[15%] left-[5%] text-2xl text-primary", delay: "0s" },
  { content: "✦", className: "animate-float-alt top-[25%] right-[8%] text-xl text-foreground", delay: "1s" },
  { content: "●", className: "animate-bounce-soft top-[55%] left-[3%] text-lg text-primary", delay: "0.5s" },
  { content: "○", className: "animate-spin-slow top-[70%] right-[5%] text-2xl text-foreground", delay: "1.5s" },
  { content: "✶", className: "animate-sparkle top-[40%] left-[92%] text-xl text-primary", delay: "0.8s" },
  { content: "◇", className: "animate-wiggle top-[85%] left-[10%] text-xl text-foreground", delay: "2s" },
];

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {elements.map((el, i) => (
        <span
          key={i}
          className={`absolute opacity-15 ${el.className}`}
          style={{ animationDelay: el.delay }}
        >
          {el.content}
        </span>
      ))}
      {/* Geometric shapes */}
      <div className="absolute top-[30%] left-[15%] w-3 h-3 bg-primary opacity-10 rotate-45 animate-float" style={{ animationDelay: "0.7s" }} />
      <div className="absolute top-[50%] right-[20%] w-4 h-4 border border-foreground opacity-10 rounded-full animate-bounce-soft" style={{ animationDelay: "1.3s" }} />
      <div className="absolute top-[75%] left-[40%] w-3 h-3 bg-primary opacity-10 animate-float-alt" style={{ animationDelay: "0.4s" }} />
    </div>
  );
};

export default FloatingElements;
