"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { heroIntro } from "./heroIntro";
import { SmoothScrollProvider, useSmoothScroll } from "./SmoothScrollProvider";

import Preloader from "./Preloader";
import Cursor from "./Cursor";
import WebGLBackground from "./WebGLBackground";
import Nav from "./sections/Nav";
import Hero from "./sections/Hero";
import Marquee from "./sections/Marquee";
import Manifesto from "./sections/Manifesto";
import Projects from "./sections/Projects";
import About from "./sections/About";
import Footer from "./sections/Footer";

export default function Experience() {
  const [ready, setReady] = useState(false);
  const { setAccent } = useSmoothScroll();

  // home page uses the brand accent
  useEffect(() => {
    setAccent("#ff4d2e");
  }, [setAccent]);

  const handleLoaded = () => {
    setReady(true);
    requestAnimationFrame(() => {
      heroIntro.play?.();
      // re-measure now that layout/fonts have settled
      ScrollTrigger.refresh();
    });
  };

  return (
    <SmoothScrollProvider>
      <WebGLBackground />
      <Cursor />
      {!ready && <Preloader onComplete={handleLoaded} />}

      <Nav />

      <main className="shell">
        <Hero />
        <Marquee />
        <Manifesto />
        <Projects />
        <About />
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
