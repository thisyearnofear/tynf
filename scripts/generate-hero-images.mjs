// One-off asset-generation script — not part of the app runtime.
// Usage:
//   node --env-file=.env.local scripts/generate-hero-images.mjs [projectId ...]
// Generates one hero image per project via fal.ai (fal-ai/flux/dev) and
// saves it to public/projects/hero/{id}.jpg. Requires FAL_KEY in env.

import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const FAL_KEY = process.env.FAL_KEY;
if (!FAL_KEY) {
  console.error("Missing FAL_KEY env var. Run with --env-file=.env.local");
  process.exit(1);
}

const OUT_DIR = path.join(process.cwd(), "public", "projects", "hero");

const STYLE =
  "moody cinematic concept art, near-black background, fine film grain, volumetric light, " +
  "painterly digital art, wide atmospheric composition, no text, no letters, no UI, no logos, " +
  "no watermark, high detail, single dominant accent color lighting the whole scene";

const PALETTE = {
  orange: "vivid burnt orange-red",
  teal: "vivid mint-teal green",
  violet: "vivid violet-purple",
  gold: "vivid warm amber gold",
};

function colorLock(key) {
  const others = Object.entries(PALETTE)
    .filter(([k]) => k !== key)
    .map(([, v]) => v.replace("vivid ", ""));
  return `The entire image bathed in ${PALETTE[key]} light, no ${others.join(", no ")} anywhere.`;
}

const PROJECTS = [
  {
    id: "futureselves",
    prompt:
      `${colorLock("orange")} A figure facing several translucent echoes of itself at different ages, each whispering a faint glowing message across a dark void, ${STYLE}`,
  },
  {
    id: "spinchain",
    prompt:
      `${colorLock("teal")} A stationary spin bike rendered as glowing wireframe circuitry, motion-blurred wheel throwing off streaks of light like a financial ticker, ${STYLE}`,
  },
  {
    id: "directors-canvas",
    prompt:
      `${colorLock("violet")} An empty frame in mid-air assembling itself out of drifting brushstrokes and light particles into interface panels, painterly and unfinished at the edges, ${STYLE}`,
  },
  {
    id: "lattency",
    prompt:
      `${colorLock("gold")} An abstract glowing transit map floating over a dark city skyline at night, three lines threading between small lit café windows, ${STYLE}`,
  },
  {
    id: "writersarcade",
    prompt:
      `${colorLock("orange")} A single old arcade cabinet glowing in a dark room, its screen overflowing with branching threads of soft light like a story tree spilling into the air, ${STYLE}`,
  },
  {
    id: "syndicate",
    prompt:
      `${colorLock("teal")} Hundreds of small glowing orbs drifting together through darkness to form one larger luminous sphere, community and shared luck rendered as converging light, ${STYLE}`,
  },
  {
    id: "fourcast",
    prompt:
      `${colorLock("violet")} A lone silhouette walking through immersive volumetric rain and fog, weather rendered as tangible drifting particles and mist, ${STYLE}`,
  },
  {
    id: "ghiblify",
    prompt:
      `${colorLock("gold")} A photograph mid-transformation, one half sharp and real, the other dissolving into soft painterly forest brushstrokes and floating leaves, ${STYLE}`,
  },
  {
    id: "Saywaht",
    prompt:
      `${colorLock("orange")} A speech bubble cracking open with a glowing coin emerging from inside it, playful digital glitch fragments scattering outward, ${STYLE}`,
  },
  {
    id: "detective",
    prompt:
      `${colorLock("teal")} A dark corkboard of glowing connection threads linking faint node-portraits, string and light forming a web across empty space, ${STYLE}`,
  },
  {
    id: "agnej",
    prompt:
      `${colorLock("violet")} A tall tower of glowing wooden blocks defying gravity mid-collapse, one block frozen in the act of being pulled free, dust catching the light, ${STYLE}`,
  },
];

async function generate(project) {
  const res = await fetch("https://fal.run/fal-ai/flux/dev", {
    method: "POST",
    headers: {
      Authorization: `Key ${FAL_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: project.prompt,
      image_size: { width: 1280, height: 800 },
      num_images: 1,
      num_inference_steps: 28,
      guidance_scale: 3.5,
      enable_safety_checker: true,
      output_format: "jpeg",
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`fal.ai ${project.id} failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  const url = data?.images?.[0]?.url;
  if (!url) throw new Error(`fal.ai ${project.id}: no image url in response`);

  const imgRes = await fetch(url);
  const buf = Buffer.from(await imgRes.arrayBuffer());
  const outPath = path.join(OUT_DIR, `${project.id}.jpg`);
  await writeFile(outPath, buf);
  console.log(`✓ ${project.id} -> ${outPath} (${(buf.length / 1024).toFixed(0)}KB)`);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const only = process.argv.slice(2);
  const targets = only.length
    ? PROJECTS.filter((p) => only.includes(p.id))
    : PROJECTS;

  if (!targets.length) {
    console.error("No matching project ids:", only);
    process.exit(1);
  }

  for (const project of targets) {
    try {
      await generate(project);
    } catch (err) {
      console.error(`✗ ${project.id}:`, err.message);
    }
  }
}

main();
