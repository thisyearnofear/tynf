"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";
import { projects } from "@/data/projects";
import { details } from "@/data/details";
import type { Project } from "@/data/projects";

export default function DetailOverlay({
  project,
  onClose,
  onSelect,
}: {
  project: Project;
  onClose: () => void;
  onSelect: (id: string) => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { setAccent } = useSmoothScroll();

  const index = projects.findIndex((p) => p.id === project.id);
  const next = projects[(index + 1) % projects.length];
  const detail = details[project.id];

  useEffect(() => {
    setAccent(project.accent);
  }, [project.accent, setAccent]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
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
  }, [onClose]);

  useIsomorphicLayoutEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const tl = gsap.timeline();
    tl.fromTo(
      rootRef.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: reduce ? 0.15 : 0.5, ease: "power2.out" }
    );
    const inner = titleRef.current?.firstElementChild as HTMLElement | null;
    if (inner) {
      tl.fromTo(
        inner,
        { yPercent: 120 },
        { yPercent: 0, duration: reduce ? 0.2 : 1.1, ease: "expo.out" },
        0.05
      );
    }
    tl.fromTo(
      rootRef.current!.querySelectorAll("[data-fade]"),
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: reduce ? 0.2 : 0.8, stagger: 0.05 },
      0.2
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
      <button className="detail-overlay__close" onClick={onClose} data-hover>
        close <span>×</span>
      </button>

      <div className="detail-overlay__scroll">
        <header className="detail__hero">
          <p className="detail__eyebrow" data-fade>
            {project.year} · {project.role}
            {project.status === "fork" ? " · fork" : ""}
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
          onClick={() => onSelect(next.id)}
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
