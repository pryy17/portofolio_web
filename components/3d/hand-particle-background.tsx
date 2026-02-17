"use client"
import { useRef, useState, useEffect, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial, OrbitControls } from "@react-three/drei"
import type * as THREE from "three"
import { useHandContext } from "../context/hand-context"

// Constants
const PARTICLE_COUNT = 1500 // Increased for better text resolution
const PARTICLE_SPREAD = 15
const CUBE_COUNT = 8
const CUBE_SPREAD = 10

// Helper to generate text positions (Client-side only)
function generateTextPositions(text: string, count: number): Float32Array {
    if (typeof window === 'undefined') return new Float32Array(count * 3)

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return new Float32Array(count * 3)

    canvas.width = 200
    canvas.height = 100

    // Draw text
    ctx.font = 'bold 50px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = 'white'
    ctx.fillText(text, canvas.width / 2, canvas.height / 2)

    // Get pixel data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data // RGBA
    const validPositions: number[] = []

    // Collect valid text pixels (where alpha > 0)
    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            if (data[(y * canvas.width + x) * 4 + 3] > 128) {
                // Map 2D -> 3D centered
                // x: 0..200 -> -5..5
                // y: 0..100 -> 2.5..-2.5 (inverted y)
                const px = (x / canvas.width - 0.5) * 10
                const py = -(y / canvas.height - 0.5) * 5
                validPositions.push(px, py, 0)
            }
        }
    }

    const positions = new Float32Array(count * 3)

    // Fill positions array
    for (let i = 0; i < count; i++) {
        const i3 = i * 3
        if (validPositions.length > 0) {
            // Pick a random valid position from the text pixels
            const randIdx = Math.floor(Math.random() * (validPositions.length / 3)) * 3
            positions[i3] = validPositions[randIdx]
            positions[i3 + 1] = validPositions[randIdx + 1]
            positions[i3 + 2] = validPositions[randIdx + 2]
        } else {
            positions[i3] = 0
            positions[i3 + 1] = 0
            positions[i3 + 2] = 0
        }
    }

    return positions
}

// Interpolate between two values
const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t

function ParticleField({ handPosition, gripStrength }: { handPosition: { x: number, y: number } | null, gripStrength: number }) {
    const ref = useRef<THREE.Points>(null!)
    const [positions, setPositions] = useState<Float32Array | null>(null)
    const [textPositions, setTextPositions] = useState<Float32Array | null>(null)
    const mouseRef = useRef({ x: 0, y: 0 })

    // Store both target sets
    const randomPositions = useMemo(() => {
        const arr = new Float32Array(PARTICLE_COUNT * 3)
        for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
            arr[i] = (Math.random() - 0.5) * PARTICLE_SPREAD
        }
        return arr
    }, [])

    // Initialize with random
    useEffect(() => {
        setPositions(new Float32Array(randomPositions))
    }, [randomPositions])

    // Generate text positions on mount (client-side only)
    useEffect(() => {
        setTextPositions(generateTextPositions("pryy", PARTICLE_COUNT))
    }, [])

    // Handle mouse movement for fallback
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (!handPosition) {
                mouseRef.current = {
                    x: (event.clientX / window.innerWidth) * 2 - 1,
                    y: -(event.clientY / window.innerHeight) * 2 + 1,
                }
            }
        }
        window.addEventListener('mousemove', handleMouseMove, { passive: true })
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [handPosition])


    useFrame((state) => {
        if (ref.current && positions && textPositions) {
            // Normal rotation (slow down when strong grip to make text readable)
            const rotationSpeed = 0.001 * (1 - gripStrength)
            ref.current.rotation.x += rotationSpeed
            ref.current.rotation.y += rotationSpeed

            // Interaction target (mouse or hand)
            const targetX = handPosition ? handPosition.x : mouseRef.current.x
            const targetY = handPosition ? handPosition.y : mouseRef.current.y

            // Move container based on hand/mouse
            ref.current.position.x = targetX * 0.5
            ref.current.position.y = targetY * 0.5

            // MORPHING LOGIC
            // Directly modify the position attribute in the geometry for performance
            const currentPositions = ref.current.geometry.attributes.position.array as Float32Array

            // Lerp factor
            const easeFactor = 0.1

            for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
                // Calculate the "Goal" position for this particle based on current grip strength
                // grip 0 -> randomPos, grip 1 -> textPos
                // grip 0.5 -> halfway
                const goalX = lerp(randomPositions[i], textPositions[i], gripStrength)
                const goalY = lerp(randomPositions[i + 1], textPositions[i + 1], gripStrength)
                const goalZ = lerp(randomPositions[i + 2], textPositions[i + 2], gripStrength)

                // Smoothly move current particle towards the goal
                currentPositions[i] += (goalX - currentPositions[i]) * easeFactor
                currentPositions[i + 1] += (goalY - currentPositions[i + 1]) * easeFactor
                currentPositions[i + 2] += (goalZ - currentPositions[i + 2]) * easeFactor
            }

            ref.current.geometry.attributes.position.needsUpdate = true
        }
    })

    if (!positions) return null

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={true}>
            <PointMaterial transparent color="#00ffff" size={0.03} sizeAttenuation={true} depthWrite={false} />
        </Points>
    )
}

function CodeConstellation({ handPosition, gripStrength }: { handPosition: { x: number, y: number } | null, gripStrength: number }) {
    const ref = useRef<THREE.Group>(null!)
    const [cubes, setCubes] = useState<Array<{ position: [number, number, number], key: number }>>([])
    const mouseRef = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const newCubes = Array.from({ length: CUBE_COUNT }).map((_, i) => ({
            position: [(Math.random() - 0.5) * CUBE_SPREAD, (Math.random() - 0.5) * CUBE_SPREAD, (Math.random() - 0.5) * CUBE_SPREAD] as [number, number, number],
            key: i
        }))
        setCubes(newCubes)
    }, [])

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (!handPosition) {
                mouseRef.current = {
                    x: (event.clientX / window.innerWidth) * 2 - 1,
                    y: -(event.clientY / window.innerHeight) * 2 + 1,
                }
            }
        }
        window.addEventListener('mousemove', handleMouseMove, { passive: true })
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [handPosition])


    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.elapsedTime * 0.01

            const targetX = handPosition ? handPosition.x : mouseRef.current.x
            const targetY = handPosition ? handPosition.y : mouseRef.current.y

            ref.current.position.x = targetX * 0.3
            ref.current.position.y = targetY * 0.3

            // Fade out cubes when text is formed (using grip strength)
            // Grip 0 -> Scale 1
            // Grip 1 -> Scale 0
            const targetScale = 1 - gripStrength
            ref.current.scale.setScalar(targetScale)
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

function FallbackParticles() {
    return <div className="absolute inset-0 bg-transparent" />
}

export default function HandParticleBackground() {
    const [webglSupported, setWebglSupported] = useState(true)

    // Convert to use HandContext
    const { enableCam, handResult, isModelLoaded, webcamRunning, isGripping, gripStrength } = useHandContext()

    // Computed hand position from landmarks (using index finger tip or average)
    const handPosition = handResult?.landmarks && handResult.landmarks.length > 0
        ? {
            // Map 0..1 to -1..1 and invert X for mirror effect
            x: (1 - handResult.landmarks[0][8].x) * 2 - 1,
            y: -(handResult.landmarks[0][8].y * 2 - 1)
        }
        : null

    useEffect(() => {
        try {
            const canvas = document.createElement("canvas")
            const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
            if (!gl) setWebglSupported(false)
        } catch (e) {
            setWebglSupported(false)
        }
    }, [])

    if (!webglSupported) return <FallbackParticles />

    return (
        <div className="relative w-full h-full">
            {/* Webcam Preview (Optional - can be hidden or styled) */}
            <div className="absolute top-4 left-4 z-50">
                <div className="bg-black/80 p-2 rounded-lg text-white text-xs">
                    {!isModelLoaded ? (
                        <p>Loading Hand Tracker...</p>
                    ) : (
                        <button
                            onClick={enableCam}
                            className="px-3 py-1 bg-cyan-600 rounded hover:bg-cyan-500 transition"
                        >
                            {webcamRunning ? "Stop Camera" : "Enable Hand Control"}
                        </button>
                    )}
                    <div className="mt-1 text-[10px] text-gray-400">
                        {isGripping ? "Morphing..." : "Tracking"} <br />
                        Strength: {Math.round((gripStrength || 0) * 100)}%
                    </div>
                </div>
                {/* Note: Actual Video feed is now in HandProvider */}
            </div>

            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                style={{ background: "transparent" }}
                gl={{
                    antialias: false,
                    alpha: true,
                    powerPreference: "high-performance",
                }}
                dpr={[1, 1.5]}
            >
                <ParticleField handPosition={handPosition} gripStrength={gripStrength || 0} />
                <CodeConstellation handPosition={handPosition} gripStrength={gripStrength || 0} />
                <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    zoomSpeed={0.6}
                    rotateSpeed={0.4}
                    minDistance={3}
                    maxDistance={10}
                />
            </Canvas>
        </div>
    )
}
