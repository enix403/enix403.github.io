import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,svx,md,ts}'],

  theme: {
    extend: {
      colors: {
        'app-line': '#413E3E'
      }
    }
  },

  plugins: [
    require('@tailwindcss/typography'),
  ]
} as Config;
