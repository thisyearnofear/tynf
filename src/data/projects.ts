export type ProjectStatus = "live" | "fork" | "archived";

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  year: string;
  role: string;
  language: string;
  tags: string[];
  accent: string;
  status: ProjectStatus;
  href: string;
  repo: string;
};

export const projects: Project[] = [
  {
    id: "futureselves",
    title: "FUTURESELVES",
    tagline: "Your future selves send daily transmissions.",
    description:
      "Your future selves send daily transmissions, and your smallest choices reshape who gets to speak tomorrow. A speculative, character-driven narrative toy about the person you're becoming.",
    year: "2026",
    role: "Concept · Web · Narrative",
    language: "TypeScript",
    tags: ["AI", "Narrative", "Generative"],
    accent: "#ff4d2e",
    status: "live",
    href: "https://futureselves.vercel.app",
    repo: "https://github.com/thisyearnofear/futureselves",
  },
  {
    id: "spinchain",
    title: "SPINCHAIN",
    tagline: "Spin classes, settled onchain.",
    description:
      "An onchain OS for spin classes — ticketing, dynamic pricing, health-based incentives, and shareable performance proofs with privacy-preserving ZK tech.",
    year: "2026",
    role: "Product · Smart Contracts · UX",
    language: "TypeScript",
    tags: ["Web3", "ZK", "Fitness"],
    accent: "#2effc8",
    status: "live",
    href: "https://spinchain.vercel.app",
    repo: "https://github.com/thisyearnofear/spinchain",
  },
  {
    id: "directors-canvas",
    title: "DIRECTOR'S CANVAS",
    tagline: "Generative UI canvas powered by Runway.",
    description:
      "A generative UI canvas powered by Runway. Describe a scene and watch the controls compose themselves in real time.",
    year: "2026",
    role: "Creative Dev · AI",
    language: "TypeScript",
    tags: ["Generative UI", "Runway", "AI"],
    accent: "#b02eff",
    status: "live",
    href: "https://director.thisyearnofear.com",
    repo: "https://github.com/thisyearnofear/directors-canvas",
  },
  {
    id: "lattency",
    title: "LATTENCY",
    tagline: "A metro map of café wifi speed.",
    description:
      "A crowdsourced metro map of café wifi speeds. Cafés are stations. The three lines are speed tiers, not geography. Find the fastest seat in the city.",
    year: "2026",
    role: "Design · Data Viz",
    language: "TypeScript",
    tags: ["Dataviz", "Maps", "Civic"],
    accent: "#ffb02e",
    status: "live",
    href: "https://lattency.vercel.app",
    repo: "https://github.com/thisyearnofear/lattency",
  },
  {
    id: "writersarcade",
    title: "WRITERSARCADE",
    tagline: "Create any text game with AI.",
    description:
      "An arcade for AI-authored text games. Spin up a playable, branching world from a single prompt and let readers wander through it.",
    year: "2025",
    role: "Fork · AI · Games",
    language: "TypeScript",
    tags: ["AI", "Text Games", "LLM"],
    accent: "#ff4d2e",
    status: "fork",
    href: "https://writersarcade.vercel.app",
    repo: "https://github.com/thisyearnofear/writersarcade",
  },
  {
    id: "syndicate",
    title: "SYNDICATE",
    tagline: "A lottery for shared impact.",
    description:
      "A lottery that pools luck into shared, visible impact — turning small stakes into collective good for the people who play.",
    year: "2025",
    role: "Product · Systems",
    language: "TypeScript",
    tags: ["Web3", "Social Good", "Product"],
    accent: "#2effc8",
    status: "live",
    href: "https://syndicateapp.vercel.app",
    repo: "https://github.com/thisyearnofear/syndicate",
  },
  {
    id: "fourcast",
    title: "FOURCAST",
    tagline: "Weather you can walk through.",
    description:
      "A 3D, immersive weather experience — atmospheric, scroll-driven forecasting you can almost feel on your skin. Forked from a Codrops WebGL study.",
    year: "2025",
    role: "Fork · WebGL",
    language: "JavaScript",
    tags: ["Three.js", "WebGL", "Weather"],
    accent: "#b02eff",
    status: "fork",
    href: "https://fourcast.vercel.app/",
    repo: "https://github.com/thisyearnofear/fourcast",
  },
  {
    id: "ghiblify",
    title: "GHIBLIFY",
    tagline: "Turn photos into Ghibli-style art.",
    description:
      "Turn your photos into Studio Ghibli-style artwork with Stable Diffusion. Drop an image, get a frame from a film that never was.",
    year: "2025",
    role: "Fork · ML",
    language: "JavaScript",
    tags: ["Stable Diffusion", "Image", "AI"],
    accent: "#ffb02e",
    status: "fork",
    href: "https://ghiblify-it.vercel.app",
    repo: "https://github.com/thisyearnofear/ghiblify",
  },
  {
    id: "Saywaht",
    title: "SAYWAHT",
    tagline: "Memes as tokens on Zora.",
    description:
      "A meme-to-token platform on Zora — turn a take into a token, a joke into a collectible, and let the timeline decide what's worth saying.",
    year: "2025",
    role: "Fork · Web3",
    language: "TypeScript",
    tags: ["Zora", "Memes", "Social"],
    accent: "#ff4d2e",
    status: "fork",
    href: "https://saywaht.vercel.app",
    repo: "https://github.com/thisyearnofear/Saywaht",
  },
  {
    id: "detective",
    title: "DETECTIVE",
    tagline: "I just can't prove it yet.",
    description:
      "A social-network investigation tool — piece together connections, follow the threads, and build a case from the open web. Forked from stefanbohacek's Detective.",
    year: "2025",
    role: "Fork · Tooling",
    language: "TypeScript",
    tags: ["OSINT", "Privacy", "Tooling"],
    accent: "#2effc8",
    status: "fork",
    href: "https://detectiveproof.vercel.app",
    repo: "https://github.com/thisyearnofear/detective",
  },
  {
    id: "agnej",
    title: "AGNEJ",
    tagline: "Inverse Jenga, rendered in real time.",
    description:
      "Inverse Jenga built on a Three.js physics plugin — pull the wrong block and the tower learns. A tactile physics toy with a cruel sense of humour.",
    year: "2025",
    role: "Fork · WebGL",
    language: "TypeScript",
    tags: ["Three.js", "Physics", "Game"],
    accent: "#b02eff",
    status: "fork",
    href: "https://agnej.vercel.app",
    repo: "https://github.com/thisyearnofear/agnej",
  },
];
