"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { projects, manifesto } from "@/data/projects";

import Preloader from "./Preloader";
import Cursor from "./Cursor";
import WebGLBackground from "./WebGLBackground";

export default function Experience() {
  const [ready, setReady] = useState(false);

  const root = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      /* ---------- intro (gated by preloader) ---------- */
      const heroLines = gsap.utils.toArray<HTMLElement>(".hero [data-reveal]");
      const heroRest = gsap.utils.toArray<HTMLElement>(".hero [data-fade]");

      gsap.set(heroLines, { yPercent: 120 });
      gsap.set(heroRest, { autoAlpha: 0, y: 24 });
      gsap.set(navRef.current, { autoAlpha: 0, y: -20 });

      const playIntro = () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.to(navRef.current, { autoAlpha: 1, y: 0, duration: 1 }, 0)
          .to(
            heroLines,
            { yPercent: 0, duration: 1.4, stagger: 0.08 },
            0.1
          )
          .to(
            heroRest,
            { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1 },
            0.5
          );
      };

      /* hero parallax on scroll */
      if (!reduce) {
        gsap.to(".hero__title", {
          yPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
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
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      /* ---------- marquee loop ---------- */
      gsap.utils.toArray<HTMLElement>(".marquee__track").forEach((track) => {
        const half = track.scrollWidth / 2;
        gsap.to(track, {
          x: -half,
          duration: 22,
          ease: "none",
          repeat: -1,
        });
      });

      /* ---------- manifesto reveal ---------- */
      gsap.utils.toArray<HTMLElement>(".manifesto__line").forEach((line) => {
        const inner = line.querySelector<HTMLElement>("[data-reveal]");
        if (!inner) return;
        gsap.fromTo(
          inner,
          { yPercent: 110 },
          {
            yPercent: 0,
            ease: "expo.out",
            duration: 1.2,
            scrollTrigger: { trigger: line, start: "top 85%" },
          }
        );
      });

      /* ---------- project reveals + parallax ---------- */
      gsap.utils.toArray<HTMLElement>(".project").forEach((proj) => {
        const info = proj.querySelectorAll<HTMLElement>("[data-fade]");
        gsap.fromTo(
          info,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            stagger: 0.08,
            ease: "expo.out",
            scrollTrigger: { trigger: proj, start: "top 78%" },
          }
        );

        const media = proj.querySelector<HTMLElement>(".project__media-inner");
        if (media && !reduce) {
          gsap.fromTo(
            media,
            { yPercent: -12 },
            {
              yPercent: 12,
              ease: "none",
              scrollTrigger: {
                trigger: proj,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      });

      /* ---------- about + footer reveal ---------- */
      gsap.utils
        .toArray<HTMLElement>("[data-fade-group] [data-fade]")
        .forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 36 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              ease: "expo.out",
              scrollTrigger: { trigger: el, start: "top 88%" },
            }
          );
        });

      window.addEventListener("load", () => ScrollTrigger.refresh());

      (root.current as unknown as { __playIntro?: () => void }).__playIntro =
        playIntro;
    }, root);

    return () => ctx.revert();
  }, []);

  const handleLoaded = () => {
    setReady(true);
    requestAnimationFrame(() => {
      (
        root.current as unknown as { __playIntro?: () => void }
      )?.__playIntro?.();
    });
  };

  return (
    <>
      <WebGLBackground />
      <Cursor />
      {!ready && <Preloader onComplete={handleLoaded} />}

      <header ref={navRef} className="nav">
        <a href="#top" className="nav__brand" data-hover>
          thisyearnofear
        </a>
        <nav className="nav__links">
          <a href="#work" data-hover>
            work
          </a>
          <a href="#manifesto" data-hover>
            ethos
          </a>
          <a href="#contact" data-hover>
            contact
          </a>
        </nav>
      </header>

      <main ref={root} className="shell" id="top">
        {/* HERO */}
        <section ref={heroRef} className="section hero">
          <p className="hero__eyebrow" data-fade>
            studio of immersive web — est. this year
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
              A portfolio of over-the-top, scroll-driven experiences. We build
              worlds that move — rendered in real time, felt in the body.
            </p>
            <div className="hero__scroll" data-fade>
              scroll <span>↓</span>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <section className="marquee" aria-hidden>
          <div className="marquee__track">
            {Array.from({ length: 2 }).map((_, i) => (
              <span className="marquee__item" key={i}>
                NO FEAR<span className="dot">●</span>NO FINISH LINE
                <span className="dot">●</span>JUST THE WORK
                <span className="dot">●</span>
              </span>
            ))}
          </div>
        </section>

        {/* MANIFESTO */}
        <section id="manifesto" className="section manifesto">
          {manifesto.map((line) => (
            <div className="manifesto__line" key={line}>
              <span className="line-mask">
                <span data-reveal>{line}</span>
              </span>
            </div>
          ))}
        </section>

        {/* PROJECTS */}
        <section id="work" className="section projects">
          <div className="projects__head">
            <h2>Selected Works</h2>
            <span>{projects.length} / ongoing</span>
          </div>

          {projects.map((p) => (
            <article className="project" key={p.id}>
              <div className="project__media" data-hover>
                <span className="project__index">{p.index}</span>
                <div
                  className="project__media-inner"
                  style={{
                    background: `radial-gradient(120% 120% at 30% 20%, ${p.accent}33, transparent 60%), linear-gradient(135deg, #15151a, #0c0c0f)`,
                  }}
                />
              </div>
              <div className="project__info">
                <h3 className="project__title" data-fade>
                  {p.title}
                </h3>
                <p className="project__tagline" data-fade>
                  {p.tagline}
                </p>
                <p className="project__desc" data-fade>
                  {p.description}
                </p>
                <div className="project__row" data-fade>
                  <span>{p.year}</span>
                  <span>{p.role}</span>
                </div>
                <div className="project__tags" data-fade>
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <a className="project__link" href={p.href} data-hover>
                  view project <span className="arrow">→</span>
                </a>
              </div>
            </article>
          ))}
        </section>

        {/* ABOUT / CTA */}
        <section id="contact" className="section about" data-fade-group>
          <p className="about__big" data-fade>
            Got a world that needs <em>building</em>? Let&apos;s make something
            that refuses to be ignored.
          </p>
          <a className="about__cta" href="mailto:hello@thisyearnofear.dev" data-hover>
            start a project <span>→</span>
          </a>
        </section>

        {/* FOOTER */}
        <footer className="section footer" data-fade-group>
          <div className="footer__brand">thisyearnofear</div>
          <div className="footer__meta">
            <div className="footer__links">
              <a href="#" data-hover>
                IG
              </a>
              <a href="#" data-hover>
                X
              </a>
              <a href="#" data-hover>
                GH
              </a>
            </div>
            © {new Date().getFullYear()} — no fear, no finish line
          </div>
        </footer>
      </main>
    </>
  );
}
