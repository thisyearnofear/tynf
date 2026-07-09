"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

export default function CursorSparks() {
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const layer = document.createElement("div");
    layer.className = "sparks-layer";
    document.body.appendChild(layer);

    const spawn = (x: number, y: number) => {
      const n = 7;
      for (let i = 0; i < n; i++) {
        const s = document.createElement("span");
        s.className = "spark";
        layer.appendChild(s);
        const ang = (Math.PI * 2 * i) / n + Math.random() * 0.5;
        const dist = 26 + Math.random() * 26;
        gsap.set(s, { x, y, scale: 0.4 + Math.random() * 0.6 });
        gsap.to(s, {
          x: x + Math.cos(ang) * dist,
          y: y + Math.sin(ang) * dist,
          opacity: 0,
          scale: 0,
          duration: 0.6 + Math.random() * 0.3,
          ease: "power2.out",
          onComplete: () => s.remove(),
        });
      }
    };

    const onDown = (e: PointerEvent) => spawn(e.clientX, e.clientY);
    window.addEventListener("pointerdown", onDown);

    return () => {
      window.removeEventListener("pointerdown", onDown);
      layer.remove();
    };
  }, []);

  return null;
}
