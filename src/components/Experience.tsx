"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { heroIntro } from "./heroIntro";
import { SmoothScrollProvider, useSmoothScroll } from "./SmoothScrollProvider";
import { projects } from "@/data/projects";

import Preloader from "./Preloader";
import Cursor from "./Cursor";
import ScrollProgress from "./ScrollProgress";
import WebGLBackground from "./WebGLBackground";
import Nav from "./sections/Nav";
import Hero from "./sections/Hero";
import Marquee from "./sections/Marquee";
import Manifesto from "./sections/Manifesto";
import CurveGallery from "./CurveGallery";
import DetailOverlay from "./DetailOverlay";
import Vision from "./sections/About";
import Footer from "./sections/Footer";

export default function Experience() {
  const [ready, setReady] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
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
      <ScrollProgress />
      {!ready && <Preloader onComplete={handleLoaded} />}

      <Nav />

      <main className="shell">
        <Hero />
        <Marquee />
        <Manifesto />
        <CurveGallery onSelect={setSelectedId} />
        <Vision />
        <Footer />
      </main>

      {selectedId && (
        <DetailOverlay
          project={projects.find((p) => p.id === selectedId)!}
          onClose={() => setSelectedId(null)}
          onSelect={setSelectedId}
        />
      )}
    </SmoothScrollProvider>
  );
}
