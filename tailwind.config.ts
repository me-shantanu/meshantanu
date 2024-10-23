import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontSize: {
        base: '1rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [
    function ({ addBase }: any) {
      addBase({
        h1: { fontSize: '1.875rem' },
        h2: { fontSize: '1.5rem' },
        h3: { fontSize: '1.25rem' },
        h4: { fontSize: '1rem' },
        h5: { fontSize: '0.875rem' },
        h6: { fontSize: '0.75rem' },

        '@screen sm': {
          h1: { fontSize: '1.5rem' },
          h2: { fontSize: '1.25rem' },
          h3: { fontSize: '1.125rem' },
          h4: { fontSize: '0.9375rem' },
          h5: { fontSize: '0.75rem' },
          h6: { fontSize: '0.625rem' },
        },

        '@screen md': {
          h1: { fontSize: '1.625rem' },
          h2: { fontSize: '1.375rem' },
          h3: { fontSize: '1.125rem' },
          h4: { fontSize: '1rem' },
          h5: { fontSize: '0.8125rem' },
          h6: { fontSize: '0.6875rem' },
        },

        '@screen lg': {
          h1: { fontSize: '2rem' },
          h2: { fontSize: '1.75rem' },
          h3: { fontSize: '1.5rem' },
          h4: { fontSize: '1.0625rem' },
          h5: { fontSize: '0.875rem' },
          h6: { fontSize: '0.75rem' },
        },

        '@screen xl': {
          h1: { fontSize: '2.25rem' },
          h2: { fontSize: '2rem' },
          h3: { fontSize: '1.75rem' },
          h4: { fontSize: '1.125rem' },
          h5: { fontSize: '0.9375rem' },
          h6: { fontSize: '0.8125rem' },
        },

        '@screen 2xl': {
          h1: { fontSize: '2.5rem' },
          h2: { fontSize: '2.25rem' },
          h3: { fontSize: '2rem' },
          h4: { fontSize: '1.25rem' },
          h5: { fontSize: '1rem' },
          h6: { fontSize: '0.875rem' },
        },
      })
    },
  ],
}

export default config
