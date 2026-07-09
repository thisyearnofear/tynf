"use client";

import { projects } from "@/data/projects";
import { Parallax } from "@/components/useScrollReveal";
import Link from "next/link";

export default function Projects() {
  return (
    <section id="work" className="section projects">
      <div className="projects__head">
        <h2>Selected Works</h2>
        <span>{projects.length} / ongoing</span>
      </div>

      {projects.map((p, i) => (
        <Link className="project" href={`/work/${p.id}`} key={p.id} data-hover>
          <div className="project__media">
            <span className="project__index">
              {String(i + 1).padStart(2, "0")}
            </span>
            <Parallax className="project__media-inner" amount={14}>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `radial-gradient(120% 120% at 30% 20%, ${p.accent}40, transparent 60%), linear-gradient(135deg, #15151a, #0c0c0f)`,
                }}
              />
            </Parallax>
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
              <span>· {p.language}</span>
              {p.status === "fork" && <span>· fork</span>}
            </div>

            <div className="project__tags" data-fade>
              {p.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>

            <span className="project__link" data-hover>
              view project <span className="arrow">→</span>
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
}
