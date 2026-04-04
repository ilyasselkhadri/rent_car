/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#c4a35a',
        'gold-light': '#e5d5b3',
      },
      fontFamily: {
        sans: ['var(--font-jost)'],
        serif: ['var(--font-cormorant)'],
      },
    },
  },
  plugins: [],
}