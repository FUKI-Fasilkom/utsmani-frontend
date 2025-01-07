'use client'

import * as React from 'react'
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = 'horizontal',
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === 'horizontal' ? 'x' : 'y',
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === 'ArrowRight') {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on('reInit', onSelect)
      api.on('select', onSelect)

      return () => {
        api?.off('select', onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn('relative', className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = 'Carousel'

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = 'CarouselContent'

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = 'CarouselItem'

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = 'primary', size = 'md', ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        'absolute  h-8 w-8 rounded-full',
        orientation === 'horizontal'
          ? '-left-12 top-1/2 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = 'CarouselPrevious'

const CarouselPreviousProgram = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = 'primary', size = 'md', ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        'absolute  h-8 w-8 rounded-full',
        orientation === 'horizontal'
          ? '-left-12 top-1/2 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <p className="text-center text-4xl">
        <svg
          width="18"
          height="28"
          viewBox="0 0 18 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.3366 3.6725L14.1641 0.5L0.664062 14L14.1641 27.5L17.3366 24.3275L7.03156 14L17.3366 3.6725Z"
            fill="#ffffff"
          />
        </svg>
      </p>
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPreviousProgram.displayName = 'CarouselPreviousProgram'

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = 'primary', size = 'md', ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        'absolute h-8 w-8 rounded-full',
        orientation === 'horizontal'
          ? '-right-12 top-1/2 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = 'CarouselNext'

const CarouselNextProgram = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = 'primary', size = 'md', ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        'absolute h-8 w-8 rounded-full',
        orientation === 'horizontal'
          ? '-right-12 top-1/2 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <p className="text-center text-4xl">
        <svg
          width="18"
          height="28"
          viewBox="0 0 18 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.83656 0.499023L0.664062 3.67152L10.9691 13.999L0.664062 24.3265L3.83656 27.499L17.3366 13.999L3.83656 0.499023Z"
            fill="#ffffff"
          />
        </svg>
      </p>
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNextProgram.displayName = 'CarouselNextProgram'

type CarouselDotProps = {
  isActive: boolean
  onClick: () => void
  index: number
} & React.ComponentProps<typeof Button>

const CarouselDot = React.forwardRef<HTMLButtonElement, CarouselDotProps>(
  ({ isActive, onClick, className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        size="sm"
        variant={'secondary'}
        className={cn(
          'h-3 rounded-full mx-2 p-0 transition-all duration-300',
          isActive ? 'w-8 bg-brown' : 'w-3 bg-brown/60',
          className
        )}
        onClick={onClick}
        aria-label={`Go to slide ${props.index + 1}`}
        {...props}
      />
    )
  }
)

CarouselDot.displayName = 'CarouselDot'

type CarouselDotsProps = {
  className?: string
} & React.HTMLAttributes<HTMLDivElement>

const CarouselDots = React.forwardRef<HTMLDivElement, CarouselDotsProps>(
  ({ className, ...props }, ref) => {
    const { api } = useCarousel()
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const [dots, setDots] = React.useState<number[]>([])

    React.useEffect(() => {
      if (!api) return

      const handleSelect = () => {
        setSelectedIndex(api.selectedScrollSnap())
      }

      handleSelect() // Initialize

      api.on('select', handleSelect)
      api.on('reInit', handleSelect)

      // Set up dots based on the number of slides
      const totalDots = api.slideNodes().length
      setDots(Array.from({ length: totalDots }, (_, i) => i))

      return () => {
        api.off('select', handleSelect)
        api.off('reInit', handleSelect)
      }
    }, [api])

    const goTo = (index: number) => {
      if (!api) return
      api.scrollTo(index)
    }

    if (dots.length === 0) return null

    return (
      <div
        ref={ref}
        className={cn('flex justify-center mt-4', className)}
        role="tablist"
        aria-label="Carousel Pagination"
        {...props}
      >
        {dots.map((dotIndex) => (
          <CarouselDot
            key={dotIndex}
            isActive={dotIndex === selectedIndex}
            onClick={() => goTo(dotIndex)}
            index={dotIndex}
          />
        ))}
      </div>
    )
  }
)

CarouselDots.displayName = 'CarouselDots'

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselNextProgram,
  CarouselPreviousProgram,
  CarouselDots,
}
