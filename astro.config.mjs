import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import vercel from '@astrojs/vercel'; // Import the main package

export default defineConfig({
    integrations: [
    icon(), // Add the integration to the list
    // ... other integrations
  ],
  output: 'static', // Set output to 'static'
  adapter: vercel(), // Use the main vercel adapter
  // ... other configurations
});