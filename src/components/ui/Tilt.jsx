import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'

// Pointer 3D tilt — a few degrees, sprung, gone on touch and reduced motion.
// Used sparingly: one card per view earns it, a grid of them doesn't.
export default function Tilt({ children, max = 3.5, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [max, -max]), { stiffness: 180, damping: 18 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-max, max]), { stiffness: 180, damping: 18 })

  const onMove = (e) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
