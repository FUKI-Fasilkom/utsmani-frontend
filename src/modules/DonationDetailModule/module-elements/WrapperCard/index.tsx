import React from 'react'
import { cn } from '@/lib/utils'

interface WrapperCardProps extends React.HTMLAttributes<HTMLElement> {}

export const WrapperCard: React.FC<WrapperCardProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <section
      className={cn(
        'p-6 md:px-10 md:py-12 rounded-xl md:rounded-[32px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.25)] bg-white',
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}
