import type { CSSProperties } from "react";

type MarqueeProps = Readonly<{
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right";
  duration?: number;
}>;

type MarqueeStyle = CSSProperties & { "--marquee-duration": string };

export function Marquee({ children, className = "", direction = "left", duration = 30 }: MarqueeProps) {
  const style: MarqueeStyle = { "--marquee-duration": `${duration}s` };

  return (
    <div className={`marquee group overflow-hidden ${className}`}>
      <div className={`marquee-track ${direction === "right" ? "marquee-track-reverse" : ""}`} style={style}>
        <div className="marquee-group">{children}</div>
        <div aria-hidden="true" className="marquee-group">{children}</div>
      </div>
    </div>
  );
}
