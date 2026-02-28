import Link from 'next/link'

type ButtonVariant = 'primary' | 'ghost'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: React.ReactNode
}

interface ButtonLinkProps {
  variant?: ButtonVariant
  href: string
  children: React.ReactNode
  className?: string
}

const baseClasses: Record<ButtonVariant, string> = {
  primary: `
    border border-accent text-accent
    px-8 py-3
    font-sans text-sm uppercase tracking-widest
    transition-all duration-200
    hover:bg-accent hover:text-bg-primary
    focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary
  `,
  ghost: `
    text-text-secondary
    font-sans text-sm uppercase tracking-widest
    border-b border-transparent pb-1
    transition-all duration-200
    hover:text-text-primary hover:border-accent
    focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
  `,
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  return (
    <button className={`${baseClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

export function ButtonLink({ variant = 'primary', href, children, className = '' }: ButtonLinkProps) {
  return (
    <Link href={href} className={`inline-block ${baseClasses[variant]} ${className}`}>
      {children}
    </Link>
  )
}
