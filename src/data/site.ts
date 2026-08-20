export const site = {
  name: "Daniel Rodrigues",
  shortName: "danierod",
  role: "Software Engineer",
  tagline: "building scalable backend systems & APIs",
  intro:
    "I’m a software engineer based in Spain, building user-centric products remotely.\nMy philosophy is simple: understand the problem first, then build the solution. I focus on small increments, fast iteration, and clean code to deliver real value to users quickly. For me, a pragmatic tool that solves a real problem will always beat a flawless masterpiece that nobody uses. When I'm not shipping features, I'm enjoying the remote-work flexibility that lets me be fully present for my family.",
  url: "https://danierod.dev",
  socials: {
    github: "https://github.com/danierod",
    linkedin: "",
    x: "",
  },
  knowsAbout: [
    "TypeScript",
    "Node.js",
    "GraphQL",
    "React",
    "React Native",
    "PostgreSQL",
  ],
} as const;

export type Site = typeof site;
