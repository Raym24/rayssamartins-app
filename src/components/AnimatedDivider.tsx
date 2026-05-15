import Marquee from "./Marquee";

interface AnimatedDividerProps {
  text?: string;
  variant?: "red" | "black";
}

const AnimatedDivider = ({ text = "RAYSSA MARTINS", variant = "red" }: AnimatedDividerProps) => {
  const items = Array(10).fill(null);
  const isRed = variant === "red";

  return (
    <div className={isRed ? "marquee-band" : "marquee-band-black"}>
      <Marquee speed={10}>
        {items.map((_, i) => (
          <span
            key={i}
            className="mx-8 text-lg md:text-2xl font-display-bold tracking-[0.2em] uppercase"
          >
            {text} <span className="mx-4 opacity-60">✦</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
};

export default AnimatedDivider;
