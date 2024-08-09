import { useEffect, useRef } from 'react'

/**
 * Properties for the Rainify component.
 */
interface RainifyProps {
  /**
   * Custom CSS class name for the canvas element.
   */
  className?: string

  /**
   * Number of raindrops generated. Higher values create more intense rain.
   * @default 50
   */
  intensity?: number

  /**
   * Color of the raindrops. Accepts any valid CSS color string.
   * @default 'rgba(128, 128, 128, 0.5)'
   */
  color?: string

  /**
   * z-index of the canvas element to control its stacking order.
   * @default 0
   */
  zIndex?: number

  /**
   * Speed multiplier for the falling raindrops. Higher values make raindrops fall faster.
   * @default 1
   */
  speed?: number

  /**
   * Horizontal speed of the raindrops to simulate wind. Positive values move raindrops to the right, negative values to the left.
   * @default 0
   */
  wind?: number

  /**
   * Thickness of the raindrops.
   * @default 1
   */
  thickness?: number

  /**
   * Controls whether the rain effect is enabled or not.
   * @default true
   */
  isEnabled?: boolean
}

/**
 * Represents a single raindrop in the rain effect.
 */
interface Raindrop {
  x: number
  y: number
  length: number
  velocityY: number
  velocityX: number
}

/**
 * Rainify component that generates a rain effect on a canvas.
 * The effect is customizable through various properties, allowing users to control aspects
 * like intensity, color, speed, and wind direction.
 */
export function Rainify({
  className,
  intensity = 50,
  color = 'rgba(128, 128, 128, 0.5)',
  zIndex = 0,
  speed = 1,
  wind = 0,
  thickness = 1,
  isEnabled = true,
}: RainifyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const raindrops: Raindrop[] = Array.from({ length: intensity }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 20 + 10,
      velocityY: (Math.random() * 2 + 2) * speed,
      velocityX: wind,
    }))

    const drawRaindrop = (drop: Raindrop) => {
      ctx.beginPath()
      ctx.moveTo(drop.x, drop.y)
      ctx.lineTo(drop.x + drop.velocityX, drop.y + drop.length)
      ctx.strokeStyle = color
      ctx.lineWidth = thickness
      ctx.stroke()
    }

    const updateRaindrop = (drop: Raindrop) => {
      drop.y += drop.velocityY
      drop.x += drop.velocityX

      if (drop.y > canvas.height) {
        drop.y = 0 - drop.length
        drop.x = Math.random() * canvas.width
      }

      if (drop.x > canvas.width) {
        drop.x = 0
      } else if (drop.x < 0) {
        drop.x = canvas.width
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      raindrops.forEach((drop) => {
        drawRaindrop(drop)
        updateRaindrop(drop)
      })
      animationRef.current = requestAnimationFrame(animate)
    }

    if (isEnabled) {
      animate()
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [intensity, color, speed, wind, thickness, isEnabled])

  useEffect(() => {
    if (!isEnabled && animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    } else if (isEnabled && !animationRef.current) {
      // Rerun animation if re-enabled
      animationRef.current = requestAnimationFrame(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const raindrops: Raindrop[] = Array.from({ length: intensity }, () => ({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          length: Math.random() * 20 + 10,
          velocityY: (Math.random() * 2 + 2) * speed,
          velocityX: wind,
        }))

        const drawRaindrop = (drop: Raindrop) => {
          ctx.beginPath()
          ctx.moveTo(drop.x, drop.y)
          ctx.lineTo(drop.x + drop.velocityX, drop.y + drop.length)
          ctx.strokeStyle = color
          ctx.lineWidth = thickness
          ctx.stroke()
        }

        const updateRaindrop = (drop: Raindrop) => {
          drop.y += drop.velocityY
          drop.x += drop.velocityX

          if (drop.y > canvas.height) {
            drop.y = 0 - drop.length
            drop.x = Math.random() * canvas.width
          }

          if (drop.x > canvas.width) {
            drop.x = 0
          } else if (drop.x < 0) {
            drop.x = canvas.width
          }
        }

        const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          raindrops.forEach((drop) => {
            drawRaindrop(drop)
            updateRaindrop(drop)
          })
          animationRef.current = requestAnimationFrame(animate)
        }

        animate()
      })
    }
  }, [isEnabled])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ position: 'fixed', top: 0, left: 0, zIndex, pointerEvents: 'none' }}
    />
  )
}
