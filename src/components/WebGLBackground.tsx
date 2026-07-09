"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "@/lib/gsap";
import { useSmoothScroll } from "./SmoothScrollProvider";

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec2 uPointer;
  uniform float uScroll;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;

  // hash + value noise
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
      mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0.0;
    float a = 0.5;
    for(int i = 0; i < 6; i++){
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    float aspect = uRes.x / uRes.y;
    vec2 p = uv;
    p.x *= aspect;

    float t = uTime * 0.06;
    vec2 q = vec2(fbm(p * 1.6 + t), fbm(p * 1.6 - t + 4.2));
    vec2 r = vec2(
      fbm(p * 1.6 + q * 2.2 + vec2(1.7, 9.2) + 0.15 * uTime * 0.1),
      fbm(p * 1.6 + q * 2.2 + vec2(8.3, 2.8) - 0.12 * uTime * 0.1)
    );
    float f = fbm(p * 1.6 + r * 2.4);

    // pointer influence
    vec2 mp = uPointer;
    mp.x *= aspect;
    float d = distance(p, mp);
    float glow = smoothstep(0.9, 0.0, d) * 0.35;

    // scroll shifts the palette vertically through the field
    float s = uScroll * 0.6;
    vec3 col = mix(uColorA, uColorB, smoothstep(0.0, 0.7, f + s * 0.3));
    col = mix(col, uColorC, smoothstep(0.45, 1.0, f + length(q) * 0.4));
    col += glow * uColorC;

    // vignette
    float vig = smoothstep(1.25, 0.25, distance(uv, vec2(0.5)));
    col *= mix(0.65, 1.0, vig);

    // film grain
    float g = hash(uv * uRes + uTime);
    col += (g - 0.5) * 0.045;

    // subtle darkening so text stays readable
    col = mix(col, vec3(0.039, 0.039, 0.047), 0.55);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function hexToVec3(hex: string): THREE.Vector3 {
  const c = new THREE.Color(hex);
  return new THREE.Vector3(c.r, c.g, c.b);
}

export default function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { accent } = useSmoothScroll();

  const uniformsRef = useRef({
    uTime: { value: 0 },
    uRes: { value: new THREE.Vector2(1, 1) },
    uPointer: { value: new THREE.Vector2(0.5, 0.5) },
    uScroll: { value: 0 },
    uColorA: { value: hexToVec3("#0a0a0c") },
    uColorB: { value: hexToVec3("#ff4d2e") },
    uColorC: { value: hexToVec3("#b02eff") },
  });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = uniformsRef.current;

    const material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      uniforms.uRes.value.set(w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    const pointer = { x: 0.5, y: 0.5 };
    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX / window.innerWidth;
      pointer.y = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const clock = new THREE.Clock();
    let raf = 0;
    let running = true;

    const render = () => {
      if (!running) return;
      uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uPointer.value.x += (pointer.x - uniforms.uPointer.value.x) * 0.06;
      uniforms.uPointer.value.y += (pointer.y - uniforms.uPointer.value.y) * 0.06;

      const scrollEl = document.documentElement;
      const max = scrollEl.scrollHeight - window.innerHeight;
      uniforms.uScroll.value =
        max > 0 ? scrollEl.scrollTop / max : 0;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    // pause when tab hidden to save battery
    const onVis = () => {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(render);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      mesh.geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  // smoothly retint the field when the active project accent changes
  useEffect(() => {
    const target = new THREE.Color(accent);
    gsap.to(uniformsRef.current.uColorB.value, {
      x: target.r,
      y: target.g,
      z: target.b,
      duration: 0.9,
      ease: "power2.out",
      overwrite: true,
    });
  }, [accent]);

  return <canvas ref={canvasRef} className="bg-canvas" aria-hidden />;
}
