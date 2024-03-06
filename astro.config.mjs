import { defineConfig } from 'astro/config';
// Import /static for a static site
import vercelStatic from '@astrojs/vercel/static';
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://cosinestangent.com',
  integrations: [icon(), sitemap()],
  output: 'static',
  adapter: vercelStatic(),
});