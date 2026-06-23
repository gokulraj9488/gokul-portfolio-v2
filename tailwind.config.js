/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Warm Cinematic, Cool Core. Tokens mirror src/index.css custom properties.
        ink: '#131110', // warm espresso-black page (never pure black)
        'ink-deep': '#0C0A09', // deepest pockets / vignette
        surface: '#1C1916', // cards
        raised: '#26211A', // elevated / hover glass
        'border-subtle': 'rgba(250,244,232,0.07)',
        primary: '#F1EADC', // text — warm ivory
        secondary: '#B3A998', // body — warm taupe
        tertiary: '#6E665B', // meta
        amber: '#E6B17E', // THE warm accent — glow, CTAs, highlights
        'amber-deep': '#C8893F', // amber where solid contrast is needed
        signal: '#E0905E', // warm copper — gradient endpoint (replaces old violet)
        synapse: '#5FD0BE', // cool tech accent — pipeline / AI labels / live dot ONLY
        status: '#6FCF97', // "live in production" badge
      },
      fontFamily: {
        display: ['"Space Grotesk Variable"', 'Space Grotesk', 'system-ui', 'sans-serif'],
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'], // editorial italic accent ONLY
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        display: ['clamp(3rem, 8vw, 6.25rem)', { lineHeight: '0.98', letterSpacing: '-0.035em' }],
        h1: ['clamp(2rem, 4.4vw, 3.25rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        h2: ['clamp(1.5rem, 2.8vw, 2rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'body-lg': ['1.175rem', { lineHeight: '1.7' }],
        eyebrow: ['0.78rem', { lineHeight: '1.4', letterSpacing: '0.22em' }],
      },
      maxWidth: { content: '1140px' },
      borderRadius: { xl: '0.875rem', '2xl': '1.5rem', '3xl': '1.875rem' },
      boxShadow: {
        glow: '0 0 50px rgba(230,177,126,0.22)', // warm amber bloom
        'glow-soft': '0 0 30px rgba(230,177,126,0.14)',
        'glow-teal': '0 0 30px rgba(95,208,190,0.18)', // cool — pipeline/AI only
        lift: '0 1px 0 0 rgba(255,250,240,0.05) inset, 0 30px 60px -28px rgba(0,0,0,0.78)',
        float: '0 1px 0 0 rgba(255,250,240,0.07) inset, 0 44px 90px -40px rgba(0,0,0,0.85)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
        premium: 'cubic-bezier(0.19, 1, 0.22, 1)',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        'drift-a': { '0%': { transform: 'translate3d(0,0,0) scale(1)' }, '100%': { transform: 'translate3d(6%, 4%, 0) scale(1.12)' } },
        'drift-b': { '0%': { transform: 'translate3d(0,0,0) scale(1.05)' }, '100%': { transform: 'translate3d(-5%, 6%, 0) scale(0.95)' } },
        'drift-c': { '0%': { transform: 'translate3d(0,0,0) scale(1)' }, '100%': { transform: 'translate3d(4%, -5%, 0) scale(1.1)' } },
        breathe: { '0%, 100%': { opacity: '0.55', transform: 'scale(1)' }, '50%': { opacity: '0.9', transform: 'scale(1.06)' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      animation: {
        'drift-a': 'drift-a 24s ease-in-out infinite alternate',
        'drift-b': 'drift-b 28s ease-in-out infinite alternate',
        'drift-c': 'drift-c 22s ease-in-out infinite alternate',
        breathe: 'breathe 5s ease-in-out infinite',
        float: 'float 7s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
}
