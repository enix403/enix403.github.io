import { mdsvex, escapeSvelte } from 'mdsvex';
import adapterStatic from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import { getSingletonHighlighter } from 'shiki';

import rehypeKatexSvelte from 'rehype-katex-svelte';
import remarkMath from 'remark-math';

// const theme = "catppuccin-latte"
// const theme = "kanagawa-wave"
// const theme = "material-theme"
// const theme = "material-theme-palenight"
const theme = 'night-owl';
// const theme = "rose-pine-moon"
const highlighter = await getSingletonHighlighter({
  themes: [theme],
  langs: ['python']
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: [
    vitePreprocess(),
    mdsvex({
      remarkPlugins: [remarkMath],
      rehypePlugins: [
        rehypeKatexSvelte
        /* other rehype plugins... */
      ],
      extensions: ['.md'],
      highlight: {
        highlighter: async (code, lang = 'text') => {
          const html = escapeSvelte(
            highlighter.codeToHtml(code, {
              lang,
              theme
            })
          );
          return `{@html \`${html}\` }`;
        }
      }
    })
  ],

  kit: {
    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapterStatic()
  },

  extensions: ['.svelte', '.md']
};

export default config;
