/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--color-bg-primary)',
        'bg-secondary': 'var(--color-bg-secondary)',
        'bg-soft': 'var(--color-bg-soft)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        'accent': 'var(--color-accent)',
      },
      fontFamily: {
        'display': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 12vw, 10rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(2rem, 8vw, 6rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.5rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'body-lg': ['clamp(1.125rem, 2vw, 1.5rem)', { lineHeight: '1.6' }],
        'body': ['clamp(0.875rem, 1.2vw, 1rem)', { lineHeight: '1.7' }],
        'caption': ['clamp(0.75rem, 1vw, 0.875rem)', { lineHeight: '1.5', letterSpacing: '0.02em' }],
      },
      spacing: {
        'section': '100vh',
        'screen-safe': 'calc(100vh - 4rem)',
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        'premium': '800ms',
      },
    },
  },
  plugins: [],
}
