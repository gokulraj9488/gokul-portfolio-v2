import { motion } from 'framer-motion'
import { fadeUp, inView } from '../../lib/motion.js'

// Scroll-reveal wrapper. Fires once. Respects reduced motion automatically
// (framer-motion reads prefers-reduced-motion; index.css also neutralizes transitions).
export default function Reveal({ children, as = 'div', delay = 0, className = '', ...props }) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  )
}
