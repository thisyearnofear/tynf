"use client";

import { useScrollReveal } from "@/components/useScrollReveal";

const lines = ["Ship fast", "Build in public", "Share the code", "Learn in the open"];

export default function Manifesto() {
  const scope = useScrollReveal<HTMLElement>();
  return (
    <section id="manifesto" className="section manifesto" ref={scope}>
      {lines.map((line) => (
        <div className="manifesto__line" key={line}>
          <span className="line-mask">
            <span data-reveal>{line}</span>
          </span>
        </div>
      ))}
    </section>
  );
}
