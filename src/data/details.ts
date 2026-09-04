export type ProjectDetail = {
  /** One-line "what it is" — printed large under the title. */
  what: string;
  /** Short, delightful "why it's fun / what's clever" bullets. */
  highlights: string[];
  /** Concrete jobs the project is good for. */
  uses?: string[];
  /** A short thought-leadership take on why the project exists. */
  insight?: string;
  /** Optional single sentence credit / origin note. */
  note?: string;
};

export const details: Record<string, ProjectDetail> = {
  futureselves: {
    what: "A speculative toy where your future selves talk back — and your smallest choices decide who gets to speak tomorrow.",
    highlights: [
      "Daily transmissions arrive from versions of you that don't exist yet.",
      "A branching memory model: tiny decisions reshape the cast of voices.",
      "Character-driven narrative generation, not a chatbot in a trench coat.",
    ],
    uses: [
      "Daily decision journaling",
      "Speculative fiction experiments",
      "Character-driven self-reflection",
    ],
    insight:
      "We built FutureSelves to see whether AI could make abstract future consequences feel personal. The surprising result: people care more about a fictional 'future me' than a dashboard of probabilities.",
    note: "Built as a quiet study in agency and self-image.",
  },
  spinchain: {
    what: "An onchain OS for spin classes — ticketing, dynamic pricing, and payouts built for instructors.",
    highlights: [
      "Ticketing, dynamic pricing and payouts, settled onchain.",
      "Health-based incentives reward showing up, not just winning.",
      "Shareable performance proofs using privacy-preserving ZK tech.",
    ],
    uses: [
      "Spin studio ticketing",
      "Instructor payout automation",
      "Health-incentive challenges",
    ],
    insight:
      "Most fitness apps reward outcomes. Spinchain rewards showing up — because the hardest part of a workout is usually getting there.",
    note: "Where fitness meets protocol design.",
  },
  "directors-canvas": {
    what: "A generative UI canvas powered by Runway.",
    highlights: [
      "Describe a scene; the controls compose themselves in real time.",
      "Generative UI that reshapes around the story you're telling.",
      "A director's chair for the text-to-video era.",
    ],
    uses: [
      "Pre-visualizing scenes",
      "Rapid UI prototyping from descriptions",
      "Interactive storyboarding",
    ],
    insight:
      "Directors think in shots, not buttons. We wanted a canvas where the interface forms around the scene instead of the other way around.",
  },
  lattency: {
    what: "A crowdsourced metro map of café wifi speeds — stations are cafés, the lines are speed tiers.",
    highlights: [
      "Three lines by speed, not geography — read the network like transit.",
      "Community-sourced pings keep the map honest and live.",
      "Find the fastest seat in the city before you leave the house.",
    ],
    uses: ["Remote-work café scouting", "Freelancer route planning", "City wifi benchmarking"],
    note: "Born from one too many dead-zone coffees.",
  },
  writersarcade: {
    what: "Create any text game with AI — and let readers wander through it.",
    highlights: [
      "Prompt a world; get a playable, branching game in seconds.",
      "Stateful, re-playable narratives instead of one-shot answers.",
      "A whole arcade of author-built text adventures.",
    ],
    uses: [
      "Prototyping branching fiction",
      "AI-assisted roleplay worlds",
      "Reader-driven story experiments",
    ],
    insight:
      "Text games are the original sandbox. AI just makes the sand respond.",
    note: "Forked from themaximalist's InfinityArcade.",
  },
  syndicate: {
    what: "A lottery that pools luck into shared, visible impact.",
    highlights: [
      "Small pooled stakes become shared, visible impact.",
      "Transparent flows show exactly where the luck lands.",
      "Playing feels less like gambling, more like giving.",
    ],
    uses: ["Charity fundraising", "Community pools", "Transparent lotteries"],
  },
  fourcast: {
    what: "Weather you can almost feel on your skin — atmospheric and scroll-driven.",
    highlights: [
      "Immersive 3D forecasting with a real sense of place.",
      "Scroll choreographs the sky, the light, the temperature.",
      "A weather report that's also a mood.",
    ],
    uses: ["Immersive weather storytelling", "Mood-based travel planning", "Ambient browsing"],
    note: "Forked from a Codrops WebGL study.",
  },
  ghiblify: {
    what: "Turn a photo into a frame from a Studio Ghibli film that never was.",
    highlights: [
      "Stable Diffusion paints your moments in hand-drawn warmth.",
      "One image in, a whole pastoral world out.",
      "Nostalgia on demand, gently rendered.",
    ],
    uses: ["Social profile art", "Personalized gifts", "Nostalgia experiments"],
    note: "Forked from vishalshenoy's ghiblify.",
  },
  Saywaht: {
    what: "A meme-to-token platform on Zora.",
    highlights: [
      "Turn a take into a token and a joke into a collectible.",
      "The timeline decides what's worth saying — and holding.",
      "Memes as tokens; tokens as culture.",
    ],
    uses: ["Creator monetization", "Meme drops", "Community speculation"],
    insight:
      "Memes are the native currency of the timeline. Tokens just make the ledger visible.",
    note: "Forked from OpenCut's app shell.",
  },
  detective: {
    what: "I just can't prove it yet — a tool for piecing connections out of the open web.",
    highlights: [
      "Follow threads across social graphs into a caseboard.",
      "Map relationships you suspected but couldn't show.",
      "Investigative calm for a noisy internet.",
    ],
    uses: ["OSINT research", "Social graph mapping", "Network investigation"],
    insight:
      "The open web is a crime scene. Detective gives you a caseboard for it.",
    note: "Forked from stefanbohacek's Detective.",
  },
  agnej: {
    what: "Inverse Jenga, rendered in real time with a Three.js physics plugin.",
    highlights: [
      "Pull the wrong block and the tower learns your moves.",
      "Tactile, physics-driven play with a cruel sense of humour.",
      "A toy that punishes confidence.",
    ],
    uses: ["Physics play", "Stress-testing patience", "Browser toy experiments"],
    note: "Forked from chandlerprall's Physijs.",
  },
};
