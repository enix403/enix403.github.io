import { mdsvex, escapeSvelte } from 'mdsvex';
import adapterStatic from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import { createHighlighter } from 'shiki'

import rehypeKatexSvelte from 'rehype-katex-svelte';
import remarkMath from 'remark-math';

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
          // const theme = "material-theme-darker"
          const theme = "catppuccin-latte"
          const highlighter = await createHighlighter({
            themes: [theme],
            langs: ['javascript', 'typescript', 'rust', 'python']
          })
          // await highlighter.loadLanguage('javascript', 'typescript', 'rust')
          const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: theme }))
          return `{@html \`${html}\` }`
        }
      },
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
