"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";
import { projects } from "@/data/projects";
import { details } from "@/data/details";
import type { Project, ProjectStatus } from "@/data/projects";

export default function DetailOverlay({
  project,
  origin,
  onClose,
  onSelect,
}: {
  project: Project;
  origin?: { x: number; y: number } | null;
  onClose: () => void;
  onSelect: (id: string, origin?: { x: number; y: number }) => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { setAccent } = useSmoothScroll();
  const [closing, setClosing] = useState(false);

  const index = projects.findIndex((p) => p.id === project.id);
  const next = projects[(index + 1) % projects.length];
  const detail = details[project.id];

  const statusLabel: Record<ProjectStatus, string> = {
    live: "live",
    fork: "remix",
    archived: "archived",
  };

  useEffect(() => {
    setAccent(project.accent);
  }, [project.accent, setAccent]);

  const requestClose = () => setClosing(true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", onKey);
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } })
      .__lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, []);

  // one-shot reveal: the overlay zooms in from wherever the user clicked,
  // mirroring the card it grew out of. Runs once on mount only — switching
  // between projects while already open uses the lighter content transition below.
  useIsomorphicLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduce) {
      gsap.set(el, { autoAlpha: 1, clipPath: "none" });
      return;
    }

    const ox = origin?.x ?? window.innerWidth / 2;
    const oy = origin?.y ?? window.innerHeight / 2;

    gsap.set(el, { autoAlpha: 1, clipPath: `circle(1% at ${ox}px ${oy}px)` });
    gsap.set(scrollRef.current, { filter: "blur(6px)", opacity: 0.6 });
    gsap.to(el, {
      clipPath: `circle(150% at ${ox}px ${oy}px)`,
      duration: 0.6,
      ease: "cubic-bezier(0.16, 1, 0.3, 1)",
    });
    gsap.to(scrollRef.current, {
      filter: "blur(0px)",
      opacity: 1,
      duration: 0.5,
      delay: 0.1,
      ease: "power2.out",
    });
  }, []);

  useEffect(() => {
    if (!closing) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(rootRef.current, {
      autoAlpha: 0,
      scale: reduce ? 1 : 0.98,
      duration: reduce ? 0.12 : 0.25,
      ease: "power2.out",
    });
    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closing]);

  useIsomorphicLayoutEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    scrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
    const tl = gsap.timeline();
    const inner = titleRef.current?.firstElementChild as HTMLElement | null;
    if (inner) {
      tl.fromTo(
        inner,
        { yPercent: 120 },
        { yPercent: 0, duration: reduce ? 0.2 : 1.1, ease: "expo.out" },
        0
      );
    }
    tl.fromTo(
      rootRef.current!.querySelectorAll("[data-fade]"),
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: reduce ? 0.2 : 0.8, stagger: 0.05 },
      0.15
    );
    return () => {
      tl.kill();
    };
  }, [project.id]);

  return (
    <div
      className="detail-overlay"
      ref={rootRef}
      style={{ ["--accent" as string]: project.accent }}
      role="dialog"
      aria-modal="true"
    >
      <button className="detail-overlay__close" onClick={requestClose} data-hover>
        close <span>×</span>
      </button>

      <div className="detail-overlay__scroll" ref={scrollRef}>
        <header className="detail__hero">
          <div className="detail__hero-image" data-fade>
            <Image
              src={`/projects/hero/${project.id}.jpg`}
              alt=""
              fill
              sizes="(max-width: 760px) 100vw, 1200px"
              priority
            />
          </div>
          <p className="detail__eyebrow" data-fade>
            {project.year} · {project.role}
            {project.status !== "live" && ` · ${statusLabel[project.status]}`}
          </p>
          <h1 className="detail__title" ref={titleRef}>
            <span className="line-mask">
              <span>{project.title}</span>
            </span>
          </h1>
          <p className="detail__lede" data-fade>
            {detail?.what ?? project.tagline}
          </p>
        </header>

        <section className="detail__body">
          <div className="detail__col">
            <h2 className="detail__h2" data-fade>
              Why it&apos;s fun
            </h2>
            <ul className="detail__list">
              {(detail?.highlights ?? [project.description]).map((h, i) => (
                <li key={i} data-fade>
                  <span className="detail__bullet" />
                  {h}
                </li>
              ))}
            </ul>
            {detail?.note && (
              <p className="detail__note" data-fade>
                {detail.note}
              </p>
            )}
          </div>

          <aside className="detail__meta" data-fade>
            <dl>
              <div>
                <dt>Stack</dt>
                <dd>{project.language}</dd>
              </div>
              <div>
                <dt>Tags</dt>
                <dd>{project.tags.join(" · ")}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{project.status}</dd>
              </div>
            </dl>
            <div className="detail__actions">
              <a
                className="detail__btn detail__btn--primary"
                href={project.href}
                target="_blank"
                rel="noreferrer"
                data-hover
              >
                visit live <span>→</span>
              </a>
              <a
                className="detail__btn"
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                data-hover
              >
                view code <span>→</span>
              </a>
            </div>
          </aside>
        </section>

        <button
          className="detail__next"
          onClick={(e) => onSelect(next.id, { x: e.clientX, y: e.clientY })}
          data-hover
        >
          <span className="detail__next-label">next project</span>
          <span className="detail__next-title">{next.title}</span>
          <span className="detail__next-arrow">→</span>
        </button>
      </div>
    </div>
  );
}
