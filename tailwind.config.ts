import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,svx,md,ts}'],

  theme: {
    extend: {
      colors: {
        'app-line': '#413E3E',
        "app-text": "var(--app-text-color)",
        "app-muted": "var(--app-muted-color)"
      }
    }
  },

  plugins: [
    require('@tailwindcss/typography'),
  ]
} as Config;
