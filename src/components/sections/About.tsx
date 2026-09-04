"use client";

import { Reveal } from "@/components/useScrollReveal";

const beams = [
  {
    k: "Living toys",
    t: "Narrative objects that remember you — and argue back from the future.",
  },
  {
    k: "Onchain culture",
    t: "Turning play, memes, and effort into infrastructure anyone can use.",
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
        The cost of shipping a working idea has never been lower. We use that
        freedom to build fast, share the source, and learn in{" "}
        <em>public</em>.
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
        Every project is a public experiment. Fork it, break it, remix it — the
        work only gets better.
      </Reveal>
    </section>
  );
}
