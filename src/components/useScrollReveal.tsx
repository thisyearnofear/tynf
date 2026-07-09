"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Declarative scroll reveal for a section's [data-reveal] / [data-fade] children.
 * - data-reveal: masked line reveal (yPercent 110 -> 0)
 * - data-fade:   fade + rise (autoAlpha 0 + y -> 0)
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const scope = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    if (prefersReduced()) return;
    const el = scope.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((line) => {
        const inner = line.tagName === "SPAN" ? line : line.firstElementChild;
        if (!inner) return;
        gsap.fromTo(
          inner,
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: line, start: "top 88%" },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((node) => {
        gsap.fromTo(
          node,
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: node, start: "top 90%" },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return scope;
}

type RevealProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  variant?: "mask" | "fade";
  style?: React.CSSProperties;
};

/** Wraps children so they reveal on scroll. `mask` clips + slides; `fade` rises. */
export function Reveal({
  as,
  className,
  children,
  variant = "fade",
  style,
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const attr =
    variant === "mask" ? { "data-reveal": "" } : { "data-fade": "" };
  return (
    <Tag className={className} style={style} {...attr}>
      {children}
    </Tag>
  );
}

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  amount?: number;
  style?: React.CSSProperties;
};

/** Vertical parallax driven by scroll progress through the element. */
export function Parallax({
  children,
  className,
  amount = 12,
  style,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (prefersReduced()) return;
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [amount]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

export { ScrollTrigger };
