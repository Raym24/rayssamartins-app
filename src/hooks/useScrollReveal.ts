import { useEffect, useRef } from "react";

export function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            // Also reveal children with scroll-reveal classes
            entry.target.querySelectorAll(
              ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-pop"
            ).forEach((child) => child.classList.add("is-visible"));
          }
        });
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    // Observe the container and all reveal children
    const revealElements = el.querySelectorAll(
      ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-pop"
    );

    if (revealElements.length > 0) {
      revealElements.forEach((child) => observer.observe(child));
    } else {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
