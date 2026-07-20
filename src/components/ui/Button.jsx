import { ArrowRight } from 'lucide-react'

// Primary: solid light surface, dark text (Vercel register — the accent is reserved for signals).
// Secondary: transparent, hairline border.
const base =
  'group inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition duration-200 ease-out focus-visible:outline-none'

const variants = {
  primary: 'bg-primary text-ink hover:bg-white active:bg-primary',
  secondary: 'border border-border-subtle bg-transparent text-primary hover:border-border-strong hover:bg-white/[0.03]',
  ghost: 'text-secondary hover:text-primary',
}

export default function Button({
  as = 'a',
  variant = 'primary',
  href,
  children,
  withArrow = false,
  className = '',
  ...props
}) {
  const Tag = as
  return (
    <Tag href={href} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
      {withArrow && (
        <ArrowRight
          size={15}
          className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </Tag>
  )
}
