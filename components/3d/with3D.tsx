"use client"

import React, { useRef, useState } from "react"
import { motion, type Transition } from "framer-motion"

type Card3DWrapperProps = {
  children: React.ReactNode
  maxRotate?: number
}

const spring: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
}

export default function Card3DWrapper({
  children,
  maxRotate = 18,
}: Card3DWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)

  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const [shineX, setShineX] = useState(50)
  const [shineY, setShineY] = useState(50)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()

    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    setRotateY((x - 1.5) * maxRotate)
    setRotateX(-(y - 1.5) * maxRotate)

    setShineX(x * 100)
    setShineY(y * 100)
  }

  const reset = () => {
    setRotateX(0)
    setRotateY(0)
    setShineX(50)
    setShineY(50)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ perspective: "1000px" }}
      className="relative"
    >
      {/* 3D TILT LAYER */}
      <motion.div
        animate={{ rotateX, rotateY }}
        transition={spring}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* GLASS SHINE OVERLAY */}
        <div
          className="pointer-events-none absolute inset-0 z-20 rounded-2xl"
          style={{
            backgroundImage: `url("https://png.pngtree.com/thumb_back/fw800/background/20220518/pngtree-pieces-of-glass-broken-or-cracked-on-black-photo-image_36634772.jpg")`, // ← ganti src kamu
            backgroundRepeat: "no-repeat",
            backgroundSize: "200% 200%",
            backgroundPosition: `${shineX}% ${shineY}%`,
            opacity: 0.30,
            mixBlendMode: "overlay",
          }}
        />
        {children}
      </motion.div>
    </div>
  )
}
