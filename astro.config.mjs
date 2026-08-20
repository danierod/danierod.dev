// @ts-check
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://danierod.dev",
  integrations: [
    mdx(),
    react(),
    sitemap({
      filter: (page) =>
        !page.includes("/palette") &&
        !page.includes("/ui-idea") &&
        !page.includes("/design-system"),
    }),
  ],
  fonts: [
    {
      name: "Fira Code",
      cssVariable: "--font-fira-code",
      provider: fontProviders.fontsource(),
      weights: [300, 400, 500, 600, 700],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["monospace"],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
