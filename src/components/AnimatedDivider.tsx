import Marquee from "./Marquee";

interface AnimatedDividerProps {
  variant?: "stars" | "tools" | "sparkles";
}

const dividerContent = {
  stars: ["⭐", "✨", "🌟", "💫", "⭐", "✨", "🌟", "💫", "⭐", "✨"],
  tools: ["🎨", "✏️", "🖌️", "💻", "📐", "🎯", "🖥️", "📱", "🎨", "✏️"],
  sparkles: ["✦", "◆", "●", "✦", "◇", "○", "✦", "◆", "●", "✦"],
};

const AnimatedDivider = ({ variant = "stars" }: AnimatedDividerProps) => {
  const items = dividerContent[variant];

  return (
    <div className="py-4 border-y border-border overflow-hidden">
      <Marquee speed={15}>
        {items.map((item, i) => (
          <span
            key={i}
            className="mx-6 text-2xl opacity-60"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  );
};

export default AnimatedDivider;
