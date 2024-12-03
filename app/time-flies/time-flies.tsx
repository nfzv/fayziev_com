'use client'

import { useEffect, useRef } from 'react'
import styles from './time-flies.module.css'

export default function TimeFlies() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Fly class definition
    class Fly {
      x: number
      y: number
      targetX: number
      targetY: number
      speed: number
      size: number
      lastDirChange: number
      oscillationOffset: number
      oscillationDirX: number
      oscillationDirY: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.targetX = x
        this.targetY = y
        this.speed = Math.random() * 4 + 1
        this.size = 1.7
        this.lastDirChange = Date.now()
        this.oscillationOffset = Math.random() * Math.PI * 2
        this.oscillationDirX = Math.random() < 0.5 ? 1 : -1
        this.oscillationDirY = Math.random() < 0.5 ? 1 : -1
      }

      update(flies: Fly[]) {
        const dx = this.targetX - this.x
        const dy = this.targetY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance > 5) {
          this.x += (dx / distance) * this.speed
          this.y += (dy / distance) * this.speed
        } else {
          this.x += Math.random() * 4 - 2
          this.y += Math.random() * 4 - 2
        }

        const timeFactor = Date.now() / 100 + this.oscillationOffset
        const oscillationX = this.oscillationDirX * Math.sin(timeFactor) * 3
        const oscillationY = this.oscillationDirY * Math.cos(timeFactor) * 3
        this.x += oscillationX
        this.y += oscillationY

        if (Date.now() - this.lastDirChange > Math.random() * 1000 + 500) {
          this.oscillationDirX *= -1
          this.oscillationDirY *= -1
          this.lastDirChange = Date.now()
        }

        for (const otherFly of flies) {
          if (otherFly !== this) {
            const otherDx = otherFly.x - this.x
            const otherDy = otherFly.y - this.y
            const otherDistanceSquared = otherDx * otherDx + otherDy * otherDy
            const thresholdSquared = 10 * 10

            if (otherDistanceSquared < thresholdSquared) {
              const otherDistance = Math.sqrt(otherDistanceSquared)
              this.x -= otherDx / otherDistance
              this.y -= otherDy / otherDistance
            }
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.moveTo(this.x, this.y - this.size)
        ctx.lineTo(this.x - this.size, this.y + this.size)
        ctx.lineTo(this.x + this.size, this.y + this.size)
        ctx.closePath()
        ctx.fill()
      }
    }

    // Digit patterns and lookup table
    const digits = [
      [1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1],
      [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
      [1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
      [1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    ]

    const digitLookupTable: { [key: string]: number[] } = {
      '0': digits[0],
      '1': digits[1],
      '2': digits[2],
      '3': digits[3],
      '4': digits[4],
      '5': digits[5],
      '6': digits[6],
      '7': digits[7],
      '8': digits[8],
      '9': digits[9],
      ':': digits[10],
    }

    const flies: Fly[] = []
    let lastTime = ''

    function createFlies() {
      flies.length = 0
      if (!canvas) return
      for (let i = 0; i < 750; i++) {
        flies.push(new Fly(Math.random() * canvas.width!, Math.random() * canvas.height!))
      }
    }

    function updateTime() {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const currentTime = `${hours}:${minutes}`

      if (currentTime !== lastTime) {
        lastTime = currentTime
        setRandomFlyTargets()
        setTimeout(() => {
          setFlyTargets(currentTime)
        }, 5000)
      }
    }

    function setFlyTargets(time: string) {
      let flyIndex = 0
      let startX = -80

      for (let i = 0; i < 5; i++) {
        const digitPattern = digitLookupTable[time[i]]
        startX += time[i] === ':' ? 130 : parseInt(time[i]) === 1 ? 140 : 160

        const startY = (canvas?.height ?? 0) / 2 - 100

        for (let y = 0; y < 5; y++) {
          for (let x = 0; x < 4; x++) {
            if (digitPattern[y * 4 + x]) {
              for (let f = 0; f < 12; f++) {
                if (flyIndex < flies.length) {
                  flies[flyIndex].targetX = startX + x * 30
                  flies[flyIndex].targetY = startY + y * 40
                  flyIndex++
                }
              }
            }
          }
        }

        if (time[i] === ':') startX -= 50
      }
    }

    function setRandomFlyTargets() {
      for (const fly of flies) {
        if (canvas) {
          fly.targetX = Math.random() * canvas.width - 40
          fly.targetY = Math.random() * canvas.height - 40
        }
      }
    }

    function animate() {
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
      updateTime()

      for (const fly of flies) {
        fly.update(flies)
        if (ctx) {
          fly.draw(ctx)
        }
      }

      requestAnimationFrame(animate)
    }

    createFlies()
    animate()
    setFlyTargets(lastTime)

    let flyerTimeout: NodeJS.Timeout

    const handlePointerDown = () => {
      setRandomFlyTargets()
      flyerTimeout = setTimeout(() => {
        setFlyTargets(lastTime)
      }, 10000)
    }

    const handlePointerUp = () => {
      setFlyTargets(lastTime)
    }

    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerup', handlePointerUp)

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [])

  return (
    <>
      <div className={styles.container}>
        <canvas ref={canvasRef} id="canvas" width="800" height="800" className={styles.canvas} />
      </div>
    </>
  )
}

