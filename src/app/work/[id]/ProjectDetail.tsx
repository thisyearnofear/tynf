"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";
import { useScrollReveal } from "@/components/useScrollReveal";
import type { Project } from "@/data/projects";
import type { ProjectDetail } from "@/data/details";

export default function ProjectDetail({
  project,
  detail,
  next,
}: {
  project: Project;
  detail?: ProjectDetail;
  next: Project;
}) {
  const { setAccent } = useSmoothScroll();
  const scope = useScrollReveal<HTMLDivElement>();
  const titleRef = useRef<HTMLHeadingElement>(null);

  useIsomorphicLayoutEffect(() => {
    setAccent(project.accent);
  }, [project.accent, setAccent]);

  useIsomorphicLayoutEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const inner = titleRef.current?.firstElementChild as HTMLElement | null;
    if (!inner) return;
    if (reduce) {
      gsap.set(inner, { yPercent: 0 });
      return;
    }
    gsap.fromTo(
      inner,
      { yPercent: 120 },
      { yPercent: 0, duration: 1.3, ease: "expo.out", delay: 0.05 }
    );
  }, [project.id]);

  return (
    <main
      className="shell detail"
      ref={scope}
      style={{ ["--accent" as string]: project.accent }}
    >
      <Link href="/#work" className="detail__back" data-hover>
        ← all work
      </Link>

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

      <Link href={`/work/${next.id}`} className="detail__next" data-hover>
        <span className="detail__next-label">next project</span>
        <span className="detail__next-title">{next.title}</span>
        <span className="detail__next-arrow">→</span>
      </Link>
    </main>
  );
}
