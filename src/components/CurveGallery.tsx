"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { projects } from "@/data/projects";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform vec3 uAccent;
  uniform float uActive;
  void main() {
    vec2 uv = vUv;
    // soft radial glow from center
    float d = distance(uv, vec2(0.5));
    vec3 base = mix(vec3(0.08, 0.08, 0.10), uAccent, smoothstep(0.75, 0.1, d));
    // faint scanline / grain feel
    base += (fract(sin(dot(uv * 800.0, vec2(12.9, 78.2))) * 43758.5) - 0.5) * 0.03;
    base *= mix(0.75, 1.0, uActive);
    gl_FragColor = vec4(base, 1.0);
  }
`;

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(test).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function drawCard(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  title: string,
  tagline: string,
  accent: string,
  image: HTMLImageElement | null
) {
  ctx.clearRect(0, 0, width, height);

  if (image) {
    const scale = Math.max(width / image.width, height / image.height);
    const w = image.width * scale;
    const h = image.height * scale;
    ctx.drawImage(image, (width - w) / 2, (height - h) / 2, w, h);
  } else {
    ctx.fillStyle = "#0f0f12";
    ctx.fillRect(0, 0, width, height);
  }

  const scrim = ctx.createLinearGradient(0, height * 0.32, 0, height);
  scrim.addColorStop(0, "rgba(8, 8, 10, 0)");
  scrim.addColorStop(1, "rgba(8, 8, 10, 0.92)");
  ctx.fillStyle = scrim;
  ctx.fillRect(0, 0, width, height);

  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  ctx.font = "700 92px Georgia, serif";
  ctx.fillStyle = "#f4f1ea";
  ctx.fillText(title, width / 2, height * 0.8);

  ctx.font = "italic 400 30px Georgia, serif";
  ctx.fillStyle = accent;
  const lines = wrapText(ctx, tagline, width * 0.74).slice(0, 2);
  const lineHeight = 40;
  lines.forEach((line, i) => {
    ctx.fillText(line, width / 2, height * 0.8 + 44 + i * lineHeight);
  });
}

function makeLabelTexture(id: string, title: string, tagline: string, accent: string) {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 640;
  const ctx = c.getContext("2d")!;

  drawCard(ctx, c.width, c.height, title, tagline, accent, null);
  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 4;
  tex.needsUpdate = true;

  const img = new Image();
  img.onload = () => {
    drawCard(ctx, c.width, c.height, title, tagline, accent, img);
    tex.needsUpdate = true;
  };
  img.src = `/projects/hero/${id}.jpg`;

  return tex;
}

export default function CurveGallery({
  onSelect,
}: {
  onSelect: (id: string, origin?: { x: number; y: number }) => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setAccent } = useSmoothScroll();
  const onSelectRef = useRef(onSelect);
  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const wrap = wrapRef.current!;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    // Build the curve
    const pts: THREE.Vector3[] = [];
    const N = 8;
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      pts.push(
        new THREE.Vector3(
          Math.sin(t * Math.PI * 2.2) * 6,
          Math.sin(t * Math.PI * 3.0) * 1.6,
          -t * 46
        )
      );
    }
    const curve = new THREE.CatmullRomCurve3(pts);

    const group = new THREE.Group();
    scene.add(group);

    const planes: {
      mesh: THREE.Mesh;
      mat: THREE.ShaderMaterial;
      label: THREE.Mesh;
      t: number;
      phase: number;
      id: string;
    }[] = [];

    const geo = new THREE.PlaneGeometry(5.2, 3.25);
    projects.forEach((p, i) => {
      const t = (i + 1) / (projects.length + 1);
      const mat = new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms: {
          uAccent: { value: new THREE.Color(p.accent) },
          uActive: { value: 0 },
        },
      });
      const mesh = new THREE.Mesh(geo, mat);
      const pos = curve.getPointAt(t);
      mesh.position.copy(pos);

      const labelMat = new THREE.MeshBasicMaterial({
        map: makeLabelTexture(p.id, p.title, p.tagline, p.accent),
        transparent: true,
        depthWrite: false,
      });
      const label = new THREE.Mesh(new THREE.PlaneGeometry(4.4, 2.75), labelMat);
      label.position.copy(pos);
      label.position.z += 0.05;

      group.add(mesh);
      group.add(label);
      planes.push({ mesh, mat, label, t, phase: i * 1.7, id: p.id });
    });

    // scroll progress over the gallery's scroll length
    const progress = { v: 0 };
    const computeProgress = () => {
      const rect = wrap.getBoundingClientRect();
      const total = wrap.offsetHeight - window.innerHeight;
      const scrolled = Math.min(
        Math.max(-rect.top, 0),
        Math.max(total, 1)
      );
      progress.v = scrolled / Math.max(total, 1);
    };
    window.addEventListener("scroll", computeProgress, { passive: true });
    computeProgress();

    // raycaster
    const ray = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    let hovered: typeof planes[number] | null = null;

    const onMove = (e: PointerEvent) => {
      ndc.x = (e.clientX / window.innerWidth) * 2 - 1;
      ndc.y = -(e.clientY / window.innerHeight) * 2 + 1;
      ray.setFromCamera(ndc, camera);
      const hits = ray.intersectObjects(planes.map((pl) => pl.mesh));
      const hit = hits.length ? planes.find((p) => p.mesh === hits[0].object) ?? null : null;
      if (hit !== hovered) {
        hovered = hit;
        document.body.style.cursor = hit ? "pointer" : "";
      }
    };
    const onClick = (e: PointerEvent) => {
      if (hovered) onSelectRef.current(hovered.id, { x: e.clientX, y: e.clientY });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onClick);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    const clock = new THREE.Clock();
    let raf = 0;
    let running = true;

    const render = () => {
      if (!running) return;
      const time = clock.getElapsedTime();

      const camT = 0.04 + progress.v * 0.92;
      const camPos = curve.getPointAt(Math.min(camT, 1));
      const look = curve.getPointAt(Math.min(camT + 0.05, 1));
      camera.position.lerp(
        new THREE.Vector3(camPos.x, camPos.y, camPos.z + 6.2),
        0.1
      );
      camera.lookAt(look.x, look.y, look.z);

      let nearestId: string | null = null;
      let nearestD = 1;
      planes.forEach((pl) => {
        const floatY = Math.sin(time * 0.6 + pl.phase) * 0.18;
        const base = curve.getPointAt(pl.t);
        pl.mesh.position.set(base.x, base.y + floatY, base.z);
        pl.label.position.set(base.x, base.y + floatY, base.z + 0.05);
        pl.mesh.lookAt(camera.position);
        pl.label.lookAt(camera.position);

        const d = Math.abs(pl.t - camT);
        const scale = 0.7 + Math.max(0, 1 - d * 3.2) * 0.5;
        pl.mesh.scale.setScalar(scale);
        pl.label.scale.setScalar(scale);
        pl.mat.uniforms.uActive.value +=
          (Math.max(0, 1 - d * 4) - pl.mat.uniforms.uActive.value) * 0.1;

        if (d < nearestD) {
          nearestD = d;
          nearestId = pl.id;
        }
      });

      if (nearestId && !reduce) setAccent(projects.find((p) => p.id === nearestId)!.accent);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    const onVis = () => {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(render);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", computeProgress);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onClick);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
      document.body.style.cursor = "";
      geo.dispose();
      planes.forEach((pl) => {
        pl.mat.dispose();
        (pl.label.material as THREE.MeshBasicMaterial).map?.dispose();
        (pl.label.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, [setAccent]);

  return (
    <section id="work" className="curve-gallery" ref={wrapRef}>
      <div className="curve-gallery__sticky">
        <canvas ref={canvasRef} className="curve-gallery__canvas" />
        <div className="curve-gallery__hint">
          scroll to fly through · click a world
        </div>
      </div>
    </section>
  );
}
