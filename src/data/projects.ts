export type Project = {
  id: string
  index: string
  title: string
  tagline: string
  year: string
  role: string
  description: string
  tags: string[]
  accent: string
  href: string
  image: string
}

export const projects: Project[] = [
  {
    id: 'lumen',
    index: '01',
    title: 'LUMEN',
    tagline: 'A living light installation that breathes with the room.',
    year: '2026',
    role: 'Creative Dev · WebGL · Sound',
    description:
      'Real-time volumetric light field rendered in the browser. Visitors conduct the piece by moving, the walls exhale, the floor remembers.',
    tags: ['Three.js', 'GLSL', 'WebAudio'],
    accent: '#ff4d2e',
    href: '#',
    image: '/projects/lumen.jpg',
  },
  {
    id: 'drift',
    index: '02',
    title: 'DRIFT',
    tagline: 'An infinite scroll engine that never asks you to stop.',
    year: '2025',
    role: 'Motion · Systems · UX',
    description:
      'A seamless parallax world with no end and no beginning. Built to feel like falling upward — calm, endless, hypnotic.',
    tags: ['Lenis', 'GSAP', 'Scroll'],
    accent: '#2effc8',
    href: '#',
    image: '/projects/drift.jpg',
  },
  {
    id: 'ember',
    index: '03',
    title: 'EMBER',
    tagline: 'A story told in fire, rendered one frame at a time.',
    year: '2025',
    role: 'Direction · Blender · Three.js',
    description:
      'A tactile, hand-built universe of paper, warmth and attachment. Click anything. The radio plays. The butterflies know your name.',
    tags: ['Blender', 'R3F', 'Narrative'],
    accent: '#ffb02e',
    href: '#',
    image: '/projects/ember.jpg',
  },
  {
    id: 'signal',
    index: '04',
    title: 'SIGNAL',
    tagline: 'The next thing. Still loading into existence.',
    year: '2026',
    role: 'In Progress',
    description:
      'A work in motion. The fear is the fuel. More soon.',
    tags: [' soon'],
    accent: '#b02eff',
    href: '#',
    image: '/projects/signal.jpg',
  },
]

export const manifesto = [
  'No fear',
  'No finish line',
  'No permission',
  'Just the work',
]
