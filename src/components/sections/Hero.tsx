"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { heroIntro } from "../heroIntro";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lines = gsap.utils.toArray<HTMLElement>(".hero [data-reveal]");
    const rest = gsap.utils.toArray<HTMLElement>(".hero [data-fade]");

    const play = () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.to("[data-nav]", { autoAlpha: 1, y: 0, duration: 1 }, 0)
        .to(lines, { yPercent: 0, duration: 1.4, stagger: 0.08 }, 0.1)
        .to(rest, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1 }, 0.5);
    };

    if (reduce) {
      gsap.set(lines, { yPercent: 0 });
      gsap.set(rest, { autoAlpha: 1, y: 0 });
      gsap.set("[data-nav]", { autoAlpha: 1, y: 0 });
      heroIntro.play = () => {};
      return;
    }

    gsap.set(lines, { yPercent: 120 });
    gsap.set(rest, { autoAlpha: 0, y: 24 });
    gsap.set("[data-nav]", { autoAlpha: 0, y: -20 });

    heroIntro.play = play;

    // hero parallax on scroll
    const ctx = gsap.context(() => {
      gsap.to(".hero__title", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero__meta", {
        yPercent: -40,
        autoAlpha: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // foreground glyphs drift up and fade as you leave the hero
      gsap.to(".hero__glyphs", {
        yPercent: -120,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section hero" id="top">
      <div className="hero__glyphs" aria-hidden>
        <span className="hero__glyph hero__glyph--1">✦</span>
        <span className="hero__glyph hero__glyph--2">◍</span>
        <span className="hero__glyph hero__glyph--3">✺</span>
        <span className="hero__glyph hero__glyph--4">◇</span>
      </div>

      <p className="hero__eyebrow" data-fade>
        an agentic-era studio — est. this year
      </p>
      <h1 className="hero__title">
        <span className="line-mask">
          <span data-reveal>this year</span>
        </span>
        <span className="line-mask">
          <span data-reveal>
            no<em>fear</em>
          </span>
        </span>
      </h1>
      <div className="hero__meta">
        <p className="hero__lead" data-fade>
          The agentic era closed the gap between an idea and a working thing.
          No time like the present, no permission required — just build.
        </p>
        <div className="hero__scroll" data-fade>
          scroll <span>↓</span>
        </div>
      </div>
    </section>
  );
}
