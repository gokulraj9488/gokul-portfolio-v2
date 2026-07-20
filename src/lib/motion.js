// Shared motion language — Linear register: small, fast, elegant.
// Entrances settle in ~0.5s; nothing bounces, nothing spins.

export const easePremium = [0.19, 1, 0.22, 1] // expo-ish ease-out — the signature curve
export const easeOut = [0.16, 1, 0.3, 1]

// Block reveal — short fade + lift.
export const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easePremium } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.55, ease: easePremium } },
}

// Container that staggers children.
export const stagger = (staggerChildren = 0.06, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

// Once-only in-view config.
export const inView = { once: true, amount: 0.2, margin: '0px 0px -10% 0px' }
