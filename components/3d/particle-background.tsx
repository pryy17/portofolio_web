"use client"
import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Points, PointMaterial, OrbitControls } from "@react-three/drei"
import type * as THREE from "three"

function ParticleField() {
  const ref = useRef<THREE.Points>(null)
  const particlesCount = 700 
  const [positions, setPositions] = useState<Float32Array | null>(null)
  const [isRotating, setIsRotating] = useState(true)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Generate random positions for particles after mount
    const newPositions = new Float32Array(particlesCount * 3)
    for (let i = 0; i < particlesCount * 3; i++) {
      newPositions[i] = (Math.random() - 0.5) * 15
    }
    setPositions(newPositions)
  }, [])

  // Handle mouse movement for parallax - use ref instead of state
  useEffect(() => {
    let animationFrameId: number
    
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault()
        setIsRotating(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useFrame((state) => {
    if (ref.current) {
      if (isRotating) {
        ref.current.rotation.x += 0.001
        ref.current.rotation.y += 0.001
      }

      // Parallax effect based on mouse position
      ref.current.position.x = mouseRef.current.x * 0.5
      ref.current.position.y = mouseRef.current.y * 0.5
    }
  })

  const handleClick = () => {
    setIsRotating(prev => !prev)
  }

  if (!positions) return null

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={true} onClick={handleClick}>
      <PointMaterial transparent color="#00ffff" size={0.02} sizeAttenuation={true} depthWrite={false} />
    </Points>
  )
}

function CodeConstellation() {
  const ref = useRef<THREE.Group>(null)
  const [cubes, setCubes] = useState<Array<{ position: [number, number, number], key: number }>>([])
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Generate random cube positions after mount - reduced from 20 to 8
    const newCubes = Array.from({ length: 8 }).map((_, i) => ({
      position: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10] as [number, number, number],
      key: i
    }))
    setCubes(newCubes)
  }, [])

  // Handle mouse movement for parallax - use ref instead of state
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.01

      // Parallax effect for cubes
      ref.current.position.x = mouseRef.current.x * 0.3
      ref.current.position.y = mouseRef.current.y * 0.3
    }
  })

  return (
    <group ref={ref}>
      {cubes.map((cube) => (
        <mesh key={cube.key} position={cube.position}>
          <boxGeometry args={[0.05, 0.05, 0.05]} />
          <meshBasicMaterial color="#ff00ff" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  )
}

// CSS-based fallback animation
function FallbackParticles() {
  const [particles, setParticles] = useState<Array<{ left: string, top: string, delay: string, duration: string }>>([])

  useEffect(() => {
    // Generate random particle styles after mount
    const newParticles = Array.from({ length: 50 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 6}s`,
      duration: `${4 + Math.random() * 4}s`,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float opacity-60"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
    </div>
  )
}

export default function ParticleBackground() {
  const [webglSupported, setWebglSupported] = useState(true)
  const [canvasError, setCanvasError] = useState(false)

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      if (!gl) {
        setWebglSupported(false)
      }
    } catch (e) {
      setWebglSupported(false)
    }
  }, [])

  const handleCanvasError = () => {
    setCanvasError(true)
    setWebglSupported(false)
  }

  if (!webglSupported || canvasError) {
    return <FallbackParticles />
  }

  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: "transparent" }}
        onError={handleCanvasError}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]} // Limit device pixel ratio for performance
      >
        <ParticleField />
        <CodeConstellation />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.4}
          minDistance={3}
          maxDistance={10}
        />
      </Canvas>
    </div>
  )
}
