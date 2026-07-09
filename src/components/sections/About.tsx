"use client";

import { Reveal } from "@/components/useScrollReveal";

const beams = [
  {
    k: "Living toys",
    t: "Narrative objects that remember you — and argue back from the future.",
  },
  {
    k: "Onchain culture",
    t: "Turning play, memes and effort into infrastructure anyone can stand on.",
  },
  {
    k: "Interfaces that compose themselves",
    t: "Describe a world; watch the controls assemble in real time.",
  },
];

export default function Vision() {
  return (
    <section id="vision" className="section about vision">
      <Reveal as="p" className="about__big" variant="fade">
        The agentic era arrived, and the excuses that kept people{" "}
        <em>waiting</em> went with it.
      </Reveal>

      <div className="vision__grid">
        {beams.map((b) => (
          <Reveal as="div" className="vision__beam" key={b.k} variant="fade">
            <span className="vision__k">{b.k}</span>
            <p className="vision__t">{b.t}</p>
          </Reveal>
        ))}
      </div>

      <Reveal as="p" className="vision__close" variant="fade">
        No fear. No finish line. No time like the present — just the work,
        built in public.
      </Reveal>
    </section>
  );
}
