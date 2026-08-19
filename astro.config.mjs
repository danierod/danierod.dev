// @ts-check
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

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
  vite: {
    plugins: [tailwindcss()],
  },
});
