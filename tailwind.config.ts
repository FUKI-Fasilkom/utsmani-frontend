import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-1': 'linear-gradient(to right, #a0653c, #c99a71)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        brown: '#6C4534',
        white1: '#FFFBF7',
        'cream-1': '#F6EFE7',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@xpd/tailwind-3dtransforms'),
    require('tailwind-scrollbar'),
  ],
}
export default config
