export const site = {
  name: "Daniel Rodrigues",
  shortName: "danierod",
  role: "Software Engineer",
  tagline: "building scalable backend systems & APIs",
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
