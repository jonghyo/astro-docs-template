import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import react from '@astrojs/react';
// https://astro.build/config
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
	site: 'https://palette.pages.devops.aslead.cloud/',
	base: process.env.BASE_URL || '/foo/',
	integrations: [
		// Enable Preact to support Preact JSX components.
		preact(),
		// Enable React for the Algolia search component.
		react(),
		tailwind(),
		mdx(),
	],
});
