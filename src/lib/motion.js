// Shared motion language. Three timing systems: ambient (CSS), entrance (here), micro (Tailwind).
// Premium = longer, expo-eased entrances that "arrive" rather than pop.

export const easePremium = [0.19, 1, 0.22, 1] // expo-ish ease-out — the signature curve
export const easeOut = [0.16, 1, 0.3, 1]

// Block reveal — fade + lift, slower and more eased than a stock fade-up.
export const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easePremium } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: easePremium } },
}

// Masked editorial reveal — child rises out from behind an overflow-hidden parent.
export const maskRise = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 1, ease: easePremium } },
}

// Container that staggers children.
export const stagger = (staggerChildren = 0.09, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

// Once-only in-view config.
export const inView = { once: true, amount: 0.25, margin: '0px 0px -12% 0px' }
