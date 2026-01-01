"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, OrbitControls, useTexture } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import * as THREE from "three"
import { Card, CardContent } from "@/components/ui/card"

const skillsData = [
  {
    name: "React",
    category: "Frontend",
    level: 0,
    color: "#61DAFB",
    image: "https://cdn.simpleicons.org/react/61DAFB",
    description:
      "Advanced React development with hooks, state management, reusable components, and performance optimization in large-scale apps.",
  },
  {
    name: "Vue.js",
    category: "Frontend",
    level: 0,
    color: "#42B883",
    image: "https://cdn.simpleicons.org/vuedotjs/42B883",
    description:
      "Developing interactive user interfaces and dashboards using Vue.js, Vuetify, and data-driven components.",
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    level: 0,
    color: "#38BDF8",
    image: "https://cdn.simpleicons.org/tailwindcss/38BDF8",
    description:
      "Utility-first styling approach for building responsive, consistent, and maintainable UI systems.",
  },
  {
    name: "Framer Motion",
    category: "Frontend",
    level: 0,
    color: "#E91E63",
    image: "https://cdn.simpleicons.org/framer/E91E63",
    description:
      "Creating smooth, performant UI animations and scroll-based interactions for modern web experiences.",
  },
  {
    name: "Redux Toolkit",
    category: "State Management",
    level: 0,
    color: "#764ABC",
    image: "https://cdn.simpleicons.org/redux/764ABC",
    description:
      "Managing global state with predictable patterns, async logic, and scalable store architecture.",
  },
  {
    name: "Next.js",
    category: "Frontend",
    level: 0,
    color: "#000000",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnpvq-9Dn8yppMdAZ2gYR13r4X68EEllKJKg&s",
    description:
      "Building scalable web applications using App Router, dynamic imports, image optimization, and server-side rendering.",
  },
  {
    name: "Node.js",
    category: "Backend",
    level: 0,
    color: "#339933",
    image: "https://cdn.simpleicons.org/nodedotjs/339933",
    description:
      "Building RESTful APIs and backend services to support scalable frontend applications.",
  },
  {
    name: "Strapi",
    category: "Backend",
    level: 0,
    color: "#8E75FF",
    image: "https://cdn.simpleicons.org/strapi/8E75FF",
    description:
      "Developing headless CMS and APIs with authentication, RBAC, and relational data modeling.",
  },
  {
    name: "React",
    category: "Frontend",
    level: 0,
    color: "#61DAFB",
    image: "https://cdn.simpleicons.org/react/61DAFB",
    description:
      "Advanced React development with hooks, state management, reusable components, and performance optimization in large-scale apps.",
  },
  {
    name: "GraphQL",
    category: "Backend",
    level: 0,
    color: "#E535AB",
    image: "https://cdn.simpleicons.org/graphql/E535AB",
    description:
      "Consuming and managing GraphQL APIs for efficient data fetching.",
  },
  {
    name: "Prisma",
    category: "Database",
    level: 0,
    color: "#0C344B",
    image: "https://cdn.simpleicons.org/prisma/0C344B",
    description:
      "Designing database schemas and managing relational data with type-safe ORM workflows.",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    level: 0,
    color: "#336791",
    image: "https://cdn.simpleicons.org/postgresql/336791",
    description:
      "Designing and querying relational databases for production-grade applications.",
  },
  {
    name: "MySQL",
    category: "Database",
    level: 0,
    color: "#4479A1",
    image: "https://cdn.simpleicons.org/mysql/4479A1",
    description:
      "Managing relational data structures and queries for web-based systems.",
  },
  {
    name: "Git",
    category: "Tooling",
    level: 0,
    color: "#F05032",
    image: "https://cdn.simpleicons.org/git/F05032",
    description:
      "Version control workflows using Git for team collaboration and production stability.",
  },
  {
    name: "Agile Scrum",
    category: "Industry Knowledge",
    level: 0,
    color: "#FF9800",
    image: "https://cdn.simpleicons.org/scrumalliance/FF9800",
    description:
      "Working in Agile Scrum environments with sprint planning and cross-functional collaboration.",
  },
  {
    name: "Problem Solving",
    category: "Industry Knowledge",
    level: 0,
    color: "#4CAF50",
    image: "https://cdn.simpleicons.org/thinkpad/4CAF50",
    description:
      "Analyzing complex systems, debugging issues, and delivering effective solutions.",
  },
  {
    name: "Teamwork",
    category: "Industry Knowledge",
    level: 0,
    color: "#2196F3",
    image: "",
    description:
      "Collaborating effectively within cross-functional engineering teams.",
  },
];

const radius = 3.7;

const skillsWithPosition = skillsData.map((skill, i) => {
  const phi = Math.acos(1 - (2 * (i + 1)) / skillsData.length);
  const theta = Math.PI * (1 + Math.sqrt(5)) * i;

  return {
    ...skill,
    position: [
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    ],
  };
});



function SkillOrb({ skill, onClick, isHovered }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const textRef = useRef<THREE.Group>(null)

  // Load texture from skill.image
  const texture = useTexture(skill.image || '/placeholder.svg') as THREE.Texture

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      if (isHovered) {
        meshRef.current.scale.setScalar(1.1 + Math.sin(state.clock.elapsedTime * 2) * 0.05)
      } else {
        meshRef.current.scale.setScalar(1)
      }
    }

    // Billboard effect for text - always face camera
    if (textRef.current) {
      textRef.current.lookAt(state.camera.position)
    }
  })

  const size = (skill.level / 100) * 0.6 + 0.2
  const imageSize = size * 1.5 // Make image slightly larger than the original sphere

  return (
    <group position={skill.position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto"
        }}
      >
        <planeGeometry args={[imageSize, imageSize]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={isHovered ? 0.9 : 0.7}
          side={THREE.DoubleSide}
        />
      </mesh>

      <group ref={textRef}>
        <Text position={[0, -imageSize / 2 - 0.4, 0]} fontSize={0.2} color="white" anchorX="center" anchorY="middle">
          {skill.name}
        </Text>
      </group>
    </group>
  )
}

// Fallback 2D skills grid
function FallbackSkillsGrid({ skills, onSkillClick }: any) {
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
      {skills.map((skill: any) => (
        <motion.div
          key={skill.name}
          whileHover={{ scale: 1.05 }}
          onClick={() => onSkillClick(skill)}
          className="cursor-pointer"
        >
          <Card className="glass-morphism border-white/20 hover:border-cyan-400/50 transition-all duration-300">
            <CardContent className="p-4 text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold"
                style={{ backgroundColor: skill.color + "20", color: skill.color }}
              >
                {skill.level}%
              </div>
              <h3 className="text-white font-semibold mb-1">{skill.name}</h3>
              <p className="text-white/60 text-sm">{skill.category}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

export default function SkillWheel() {
  const [hoveredSkill, setHoveredSkill] = useState<any>(null)
  const [selectedSkill, setSelectedSkill] = useState<any>(null)
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

  return (
    <div className="relative w-full h-full">
      {webglSupported && !canvasError ? (
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60 }}
          onError={handleCanvasError}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, -5, -5]} intensity={0.4} color="#ff00ff" />

          {skillsWithPosition.map((skill) => (
            <SkillOrb
              key={skill.name}
              skill={skill}
              isHovered={hoveredSkill?.name === skill.name}
              onClick={() => setSelectedSkill(skill)}
            />
          ))}

          <OrbitControls enableZoom={true} enablePan={false} enableRotate={true} maxDistance={8} minDistance={4} />
        </Canvas>
      ) : (
        <FallbackSkillsGrid skills={skillsWithPosition} onSkillClick={setSelectedSkill} />
      )}

      {/* Skill Details */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-4 left-4 right-4 glass-morphism rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-white">{selectedSkill.name}</h3>
              <button onClick={() => setSelectedSkill(null)} className="text-white/60 hover:text-white">
                ✕
              </button>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white">{selectedSkill.category}</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedSkill.level}%` }}
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-400"
                  />
                </div>
                <span className="text-white/80">{selectedSkill.level}%</span>
              </div>
            </div>

            <p className="text-white/70">{selectedSkill.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
