import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-l from-[#DFA26C] to-[#A26840] text-neutral-50 grayscale-100',
        secondary: 'bg-[#6C4534] text-[#F6EFE7]',
        tertiary: 'border-2 border-[#6C4534] text-[#6C4534] bg-transparent',
        danger: 'bg-red-500 text-neutral-50 ',
        outline: 'border-2 border-neutral-950 text-neutral-950 bg-transparent',
        ghost: 'bg-transparent text-neutral-950 hover:bg-neutral-100',
      },
      size: {
        sm: 'h-6 px-3',
        md: 'h-7 px-4 py-2',
        lg: 'h-8 px-6',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'lg',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
