"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type Ctx = {
  accent: string;
  setAccent: (hex: string) => void;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
};

const DEFAULT_ACCENT = "#ff4d2e";

const SmoothScrollContext = createContext<Ctx>({
  accent: DEFAULT_ACCENT,
  setAccent: () => {},
  pointer: { current: { x: 0.5, y: 0.5 } },
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [accent, setAccent] = useState(DEFAULT_ACCENT);
  const pointer = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = e.clientX / window.innerWidth;
      pointer.current.y = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ accent, setAccent, pointer }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
