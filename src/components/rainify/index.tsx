import React, { useEffect, useRef } from 'react'

/**
 * Props for the `Rainify` component.
 */
interface RainifyProps {
  /**
   * Optional CSS class for additional styling.
   * @default `''`
   */
  className?: string

  /**
   * Number of raindrops to simulate.
   * @default 50
   */
  intensity?: number

  /**
   * Color of the raindrops, specified as a CSS color string (e.g., `"rgba(128, 128, 128, 0.5)"`).
   * @default `'rgba(128, 128, 128, 0.5)'`
   */
  color?: string

  /**
   * z-index of the canvas to control stacking order.
   * @default 0
   */
  zIndex?: number

  /**
   * Speed of the raindrops. Higher values make the raindrops fall faster.
   * @default 1
   */
  speed?: number

  /**
   * Horizontal speed of the raindrops, simulating wind. Positive values move the raindrops to the right, negative values to the left.
   * @default 0
   */
  wind?: number

  /**
   * Thickness of the raindrops in pixels.
   * @default 1
   */
  thickness?: number

  /**
   * Controls whether the rain animation is active.
   * @default true
   */
  isRaining?: boolean

  /**
   * Color of the splash effect when raindrops hit the ground, specified as a CSS color string.
   * @default `'rgba(128, 128, 128, 0.5)'`
   */
  splashColor?: string

  /**
   * Duration of the splash effect before it fades out, in frames.
   * @default 60
   */
  splashDuration?: number
}

/**
 * Represents a single raindrop in the simulation.
 */
interface Raindrop {
  /** Horizontal position of the raindrop. */
  x: number

  /** Vertical position of the raindrop. */
  y: number

  /** Length of the raindrop in pixels. */
  length: number

  /** Vertical velocity of the raindrop (fall speed). */
  velocityY: number

  /** Horizontal velocity of the raindrop (wind effect). */
  velocityX: number
}

/**
 * Represents a splash effect when a raindrop hits the ground.
 */
interface Splash {
  /** Horizontal position of the splash. */
  x: number

  /** Vertical position of the splash. */
  y: number

  /** Radius of the splash. */
  radius: number

  /** Opacity of the splash, which fades out over time. */
  opacity: number

  /** Angle of the splash spread. */
  angle: number

  /** Speed at which the splash expands. */
  velocity: number
}

/**
 * `Rainify` is a React component that simulates a rain effect on the screen.
 * It renders a canvas that covers the entire window and animates raindrops falling,
 * with optional splash effects when they hit the ground.
 *
 * @param {RainifyProps} props - The properties to customize the rain effect.
 * @returns {JSX.Element} The `Rainify` component rendered as a canvas element.
 */
export const Rainify: React.FC<RainifyProps> = ({
  intensity = 50,
  color = 'rgba(128, 128, 128, 0.5)',
  zIndex = 0,
  speed = 1,
  wind = 0,
  thickness = 1,
  isRaining = true,
  className,
  splashColor = 'rgba(128, 128, 128, 0.5)',
  splashDuration = 60,
}) => {
  // Reference to the canvas element in the DOM
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Reference to the animation frame for control
  const animationFrameRef = useRef<number | null>(null)

  // Effect hook to control the animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas dimensions to cover the entire window
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Initialize raindrops with random positions and velocities
    const raindrops: Raindrop[] = Array.from({ length: intensity }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height, // Start position above the screen for gradual effect
      length: Math.random() * 20 + 10,
      velocityY: (Math.random() * 2 + 2) * speed,
      velocityX: wind,
    }))

    // Array to store splash effects
    const splashes: Splash[] = []

    /**
     * Draws a single raindrop on the canvas.
     * @param {Raindrop} drop - The raindrop to be drawn.
     */
    const drawRaindrop = (drop: Raindrop) => {
      ctx.beginPath()
      ctx.moveTo(drop.x, drop.y)
      ctx.lineTo(drop.x + drop.velocityX, drop.y + drop.length)
      ctx.strokeStyle = color
      ctx.lineWidth = thickness
      ctx.stroke()
    }

    /**
     * Draws a splash effect on the canvas.
     * @param {Splash} splash - The splash effect to be drawn.
     */
    const drawSplash = (splash: Splash) => {
      ctx.beginPath()
      ctx.arc(
        splash.x + splash.radius * Math.cos(splash.angle),
        splash.y + splash.radius * Math.sin(splash.angle),
        splash.radius / 4,
        0,
        Math.PI * 2
      )
      ctx.fillStyle = splashColor.replace(/[\d.]+\)$/g, `${splash.opacity})`)
      ctx.fill()
    }

    /**
     * Updates the position and state of a raindrop.
     * @param {Raindrop} drop - The raindrop to be updated.
     */
    const updateRaindrop = (drop: Raindrop) => {
      drop.y += drop.velocityY
      drop.x += drop.velocityX

      // If the raindrop hits the ground, create splash effects and reposition the raindrop
      if (drop.y > canvas.height) {
        for (let i = 0; i < 5; i++) {
          splashes.push({
            x: drop.x,
            y: canvas.height,
            radius: Math.random() * 2 + 1,
            opacity: 1,
            angle: Math.random() * 2 * Math.PI,
            velocity: Math.random() * 2 + 0.5,
          })
        }
        drop.y = 0 - drop.length // Reposition the raindrop at the top
        drop.x = Math.random() * canvas.width
      }

      // Reposition the raindrop if it goes off-screen horizontally
      if (drop.x > canvas.width) {
        drop.x = 0
      } else if (drop.x < 0) {
        drop.x = canvas.width
      }
    }

    /**
     * Updates the state of a splash effect (expansion and fading).
     * @param {Splash} splash - The splash to be updated.
     * @param {number} index - The index of the splash in the array.
     */
    const updateSplash = (splash: Splash, index: number) => {
      splash.radius += splash.velocity
      splash.opacity -= 1 / splashDuration

      // Remove the splash if it becomes invisible
      if (splash.opacity <= 0) {
        splashes.splice(index, 1)
      }
    }

    /**
     * Animation loop that draws and updates raindrops and splashes.
     */
    const animate = () => {
      if (!isRaining) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        animationFrameRef.current = null
        return
      }

      // Clear the canvas before drawing
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw and update each raindrop
      raindrops.forEach((drop) => {
        drawRaindrop(drop)
        updateRaindrop(drop)
      })

      // Draw and update each splash
      splashes.forEach((splash, index) => {
        drawSplash(splash)
        updateSplash(splash, index)
      })

      // Request the next animation frame
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Start the animation if it's raining
    if (isRaining) {
      animate()
    }

    /**
     * Updates the canvas size if the window is resized.
     */
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Add event listener for window resize
    window.addEventListener('resize', handleResize)

    // Cleanup when the component is unmounted
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [intensity, color, speed, wind, thickness, isRaining, splashColor, splashDuration])

  // Render the canvas element
  return (
    <canvas
      className={className}
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, zIndex, pointerEvents: 'none' }}
    />
  )
}
