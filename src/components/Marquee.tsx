import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

const Marquee = ({ children, speed = 20, className = "" }: MarqueeProps) => {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className="inline-flex animate-marquee"
        style={{ "--marquee-duration": `${speed}s` } as React.CSSProperties}
      >
        <div className="inline-flex items-center">{children}</div>
        <div className="inline-flex items-center" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
};

export default Marquee;
