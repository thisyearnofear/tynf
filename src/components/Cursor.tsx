"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pointer };

    (window as unknown as { __pointer?: { x: number; y: number } }).__pointer =
      pointer;

    const move = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      gsap.set(dot, { x: pointer.x, y: pointer.y });
    };

    const render = () => {
      ringPos.x += (pointer.x - ringPos.x) * 0.15;
      ringPos.y += (pointer.y - ringPos.y) * 0.15;
      gsap.set(ring, { x: ringPos.x, y: ringPos.y });
      raf = requestAnimationFrame(render);
    };
    let raf = requestAnimationFrame(render);

    const isInteractive = (el: Element | null) =>
      !!el?.closest("a, button, [data-hover]");

    const over = (e: PointerEvent) => {
      if (isInteractive(e.target as Element)) ring.classList.add("is-hover");
    };
    const out = (e: PointerEvent) => {
      if (isInteractive(e.target as Element)) ring.classList.remove("is-hover");
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over);
    document.addEventListener("pointerout", out);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
    </>
  );
}
