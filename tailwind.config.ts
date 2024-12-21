import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,svx,md,ts}'],

  theme: {
    extend: {}
  },

  plugins: [
    require('@tailwindcss/typography'),
  ]
} satisfies Config;
