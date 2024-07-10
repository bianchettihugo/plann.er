import { ReactNode, SyntheticEvent, useRef } from 'react'
import { tv } from 'tailwind-variants'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leading?: ReactNode | null
  trailing?: ReactNode | null
  outlined?: boolean
  density?: 'small' | 'medium' | 'large'
  background?: 'light' | 'dark'
  focusOnAction?: boolean
}

const inputVariants = tv({
  base: 'flex items-center rounded-xl px-6 group text-zinc-400',
  variants: {
    outlined: {
      true: 'focus-within:ring-2 focus-within:ring-lime-300',
      false: 'focus-within:ring-0',
    },
    size: {
      small: 'py-2',
      medium: 'py-3',
      large: 'py-4',
    },
    background: {
      light: 'bg-zinc-900',
      dark: 'bg-zinc-950',
    },
  },
})

export function Input({
  leading = null,
  trailing = null,
  outlined = true,
  density = 'medium',
  background = 'light',
  focusOnAction = false,
  ...htmlProps
}: InputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  function handleContainerClick(e: SyntheticEvent) {
    if (e.target instanceof HTMLInputElement) return
    if (e.target instanceof HTMLButtonElement) {
      if (focusOnAction) {
        inputRef.current?.focus()
      } else {
        e.target.blur()
      }

      return
    }
    inputRef.current?.focus()
  }

  return (
    <div
      onClick={(e) => handleContainerClick(e)}
      className={inputVariants({
        outlined: outlined,
        size: density,
        background: background,
      })}
    >
      {leading}
      <input
        {...htmlProps}
        ref={inputRef}
        className="bg-transparent text-white text-base focus:outline-none placeholder:text-zinc-400 flex-1 px-2"
      />
      {trailing}
    </div>
  )
}
