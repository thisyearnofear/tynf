"use client";

import { Reveal } from "@/components/useScrollReveal";

export default function About() {
  return (
    <section id="contact" className="section about">
      <Reveal as="p" className="about__big" variant="fade">
        Got a world that needs <em>building</em>? Let&apos;s make something
        that refuses to be ignored.
      </Reveal>
      <Reveal variant="fade">
        <a
          className="about__cta"
          href="mailto:hello@thisyearnofear.dev"
          data-hover
        >
          start a project <span>→</span>
        </a>
      </Reveal>
    </section>
  );
}
