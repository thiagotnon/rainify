import React, { useEffect, useRef } from 'react'

interface RainifyProps {
  className?: string
  intensity?: number
  color?: string
  zIndex?: number
  speed?: number
  wind?: number
  thickness?: number
  isRaining?: boolean
}

interface Raindrop {
  x: number
  y: number
  length: number
  velocityY: number
  velocityX: number
}

export const Rainify: React.FC<RainifyProps> = ({
  intensity = 50,
  color = 'rgba(128, 128, 128, 0.5)',
  zIndex = 0,
  speed = 1,
  wind = 0,
  thickness = 1,
  isRaining = true,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

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
      if (!isRaining) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        animationFrameRef.current = null
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      raindrops.forEach((drop) => {
        drawRaindrop(drop)
        updateRaindrop(drop)
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    if (isRaining) {
      animate()
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [intensity, color, speed, wind, thickness, isRaining])

  return (
    <canvas
      className={className}
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, zIndex, pointerEvents: 'none' }}
    />
  )
}
