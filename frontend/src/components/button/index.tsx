import { tv } from 'tailwind-variants'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'transparent'
}

const buttonVariants = tv({
  base: 'flex flex-row items-center justify-center gap-2 bg-lime-400 text-lime-950 font-semibold text-base rounded-lg px-8 py-2 disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    color: {
      primary: 'bg-lime-400 text-lime-950',
      secondary: 'bg-zinc-800 text-zinc-200',
      transparent: 'bg-transparent text-zinc-100',
    },
  },
})

export function Button({
  children,
  variant = 'primary',
  ...htmlProps
}: ButtonProps) {
  return (
    <button className={buttonVariants({ color: variant })} {...htmlProps}>
      {children}
    </button>
  )
}
