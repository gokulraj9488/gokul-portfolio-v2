/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // The workshop surface system — near-black warmed a degree toward the forge.
        // Tokens mirror src/index.css custom properties.
        ink: '#0B0A09', // page — warm near-black
        'ink-deep': '#070606', // deepest pockets / drawing beds
        surface: '#121110', // cards
        raised: '#1A1815', // elevated / hover
        'border-subtle': 'rgba(255,250,240,0.08)',
        'border-strong': 'rgba(255,250,240,0.15)',
        primary: '#EFEDE8', // headings / key text — warm ivory
        secondary: '#A6A29A', // body — warm gray
        tertiary: '#8B867D', // meta / labels — 4.5:1+ on ink/surface (WCAG AA)
        ember: '#E2A45A', // THE accent — the forge. Heat, highlights, active states only.
        'ember-deep': '#B97F3A', // ember where solid contrast is needed
        status: '#8BAD6A', // live / passing — a patina green, not a SaaS-dashboard green
        blueprint: '#5F8AA3', // literal engineering drawings ONLY (layer stacks, topology) — the one cool color allowed
      },
      fontFamily: {
        display: ['"Space Grotesk Variable"', 'Space Grotesk', 'system-ui', 'sans-serif'],
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        hand: ['"Architects Daughter"', 'cursive'], // margin notes ONLY — the human hand
      },
      fontSize: {
        display: ['clamp(2.6rem, 6vw, 4.5rem)', { lineHeight: '1.06', letterSpacing: '-0.03em' }],
        h1: ['clamp(1.9rem, 3.6vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        h2: ['clamp(1.4rem, 2.4vw, 1.8rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        eyebrow: ['0.72rem', { lineHeight: '1.4', letterSpacing: '0.18em' }],
      },
      maxWidth: { content: '1120px' },
      borderRadius: { xl: '0.75rem', '2xl': '1rem', '3xl': '1.5rem' },
      boxShadow: {
        lift: '0 1px 0 0 rgba(255,250,240,0.04) inset, 0 24px 48px -24px rgba(0,0,0,0.7)',
        float: '0 1px 0 0 rgba(255,250,240,0.06) inset, 0 32px 64px -32px rgba(0,0,0,0.8)',
        'glow-ember': '0 0 32px rgba(226,164,90,0.18)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
        premium: 'cubic-bezier(0.19, 1, 0.22, 1)',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        'pulse-soft': { '0%, 100%': { opacity: '0.35' }, '50%': { opacity: '1' } },
        flow: { to: { strokeDashoffset: '-24' } },
        'forge-breathe': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.04)' },
        },
      },
      animation: {
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
        flow: 'flow 1.6s linear infinite',
        'forge-breathe': 'forge-breathe 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
