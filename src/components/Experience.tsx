"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsap";
import { heroIntro } from "./heroIntro";
import { SmoothScrollProvider, useSmoothScroll } from "./SmoothScrollProvider";

import Preloader from "./Preloader";
import Cursor from "./Cursor";
import CursorSparks from "./CursorSparks";
import SoundToggle from "./SoundToggle";
import ScrollProgress from "./ScrollProgress";
import WebGLBackground from "./WebGLBackground";
import Nav from "./sections/Nav";
import Hero from "./sections/Hero";
import Marquee from "./sections/Marquee";
import Manifesto from "./sections/Manifesto";
import CurveGallery from "./CurveGallery";
import Vision from "./sections/About";
import Footer from "./sections/Footer";

export default function Experience() {
  const [ready, setReady] = useState(false);
  const { setAccent } = useSmoothScroll();
  const router = useRouter();

  const handleSelect = (id: string) => {
    router.push(`/work/${id}`);
  };

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
      <CursorSparks />
      <SoundToggle />
      <ScrollProgress />
      {!ready && <Preloader onComplete={handleLoaded} />}

      <Nav />

      <main className="shell">
        <Hero />
        <Marquee />
        <Manifesto />
        <CurveGallery onSelect={handleSelect} />
        <Vision />
        <Footer />
      </main>

    </SmoothScrollProvider>
  );
}
