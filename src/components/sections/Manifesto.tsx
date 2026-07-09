"use client";

import { useScrollReveal } from "@/components/useScrollReveal";

const lines = ["No fear", "No finish line", "No permission", "Just the work"];

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
