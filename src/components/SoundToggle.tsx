"use client";

import { useEffect, useRef, useState } from "react";

export default function SoundToggle() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ gain: GainNode } | null>(null);

  const toggle = () => {
    if (!ctxRef.current) {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new Ctx();
      const master = ctx.createGain();
      master.gain.value = 0;
      master.connect(ctx.destination);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 420;
      filter.connect(master);

      // two detuned drones for warmth
      [55, 82.4].forEach((f, i) => {
        const o = ctx.createOscillator();
        o.type = "sine";
        o.frequency.value = f;
        o.detune.value = i === 0 ? -4 : 5;
        o.connect(filter);
        o.start();
      });

      // slow LFO on the filter for movement
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.06;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 160;
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();

      ctxRef.current = ctx;
      nodesRef.current = { gain: master };
    }
    const ctx = ctxRef.current;
    const master = nodesRef.current!.gain;
    if (ctx.state === "suspended") ctx.resume();
    const next = !on;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.linearRampToValueAtTime(
      next ? 0.06 : 0,
      ctx.currentTime + (next ? 1.2 : 0.4)
    );
    setOn(next);
  };

  useEffect(() => {
    return () => {
      ctxRef.current?.close();
    };
  }, []);

  return (
    <button
      className={`sound-toggle ${on ? "is-on" : ""}`}
      onClick={toggle}
      data-hover
      aria-pressed={on}
      aria-label="Toggle ambient sound"
    >
      <span className="sound-toggle__bars" aria-hidden>
        <i />
        <i />
        <i />
        <i />
      </span>
      {on ? "sound on" : "sound off"}
    </button>
  );
}
