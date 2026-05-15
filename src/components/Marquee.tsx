import { ReactNode, useEffect, useRef, useState } from "react";

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

const Marquee = ({ children, speed = 12, className = "" }: MarqueeProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(120);

  useEffect(() => {
    const content = contentRef.current;

    if (!content) return;

    const updateDuration = () => {
      const contentWidth = content.scrollWidth;
      setDuration(Math.max(50, contentWidth / speed));
    };

    updateDuration();

    const observer = new ResizeObserver(updateDuration);
    observer.observe(content);

    return () => observer.disconnect();
  }, [speed]);

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className="inline-flex animate-marquee"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <div ref={contentRef} className="inline-flex items-center">{children}</div>
        <div className="inline-flex items-center" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
};

export default Marquee;
