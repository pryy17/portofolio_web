"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import type * as THREE from "three"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const projectsData = [
  {
    id: 1,
    name: "Edutiv",
    category: "frontend",
    position: [2, 1, 0],
    color: "#00ffff",
    description: "sebuah website learning management system yang menggunakan berbagai macam implementasi teknologi di dalamnya di aman user dapat melihat video, auth, memberi rating, claim sertifikat, completed video, dll.",
    technologies: ["React", "Tailwind", "redux"],
    github: "https://github.com/edutiv/frontend-web",
    demo: "https://edutiv-web.vercel.app/",
    image: "https://portofolio-web-chi.vercel.app/assets/edutiv.png",
  },
  {
    id: 2,
    name: "E-commerce Platform",
    category: "frontend",
    position: [-2, -1, 1],
    color: "#ff00ff",
    description: "Modern e-commerce platform with advanced filtering and payment integration.",
    technologies: ["Next.js", "Strapi", "open AI", "PostgreSQL", "vercel Chat Bot"],
    github: "https://github.com",
    demo: "https://demo.com",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Foodys",
    category: "backend",
    position: [0, 2, -2],
    color: "#ffff00",
    description: "sebuah website food order di lengkapi dengan fitur login list makanan, detail makanan, fitur keranjang dan simulasi payment website ini di dukung oleh teknologi graphql untuk database nya.",
    technologies: ["Node.js", "Redis", "Docker", "AWS"],
    github: "https://github.com/pryy17/React_mini-project",
    demo: "https://react-mini-project-p9oc.vercel.app/",
    image: "https://portofolio-web-chi.vercel.app/assets/foodys.png",
  },
  {
    id: 4,
    name: "SPBE APP",
    category: "frontend",
    position: [-1, 0, 2],
    color: "#00ff00",
    description: "sebuah prototipe website untuk memandu asesor internal dalam mengevaluasi sistem pemerintahan SPBE di setiap lembaga daerah",
    technologies: ["React", "TypeScript", "Strapi"],
    github: "https://panduan-spbe.vercel.app/",
    demo: "https://panduan-spbe.vercel.app/",
    image: "https://portofolio-web-chi.vercel.app/assets/spbe.png",
  },
  {
    id: 4,
    name: "Movies List",
    category: "frontend",
    position: [2, -0.5, 2],
    color: "#986012ff",
    description: "website menampilkan api dari film sekarang bisa menambahkan wistlist dan terdapat fitu pencarian",
    technologies: ["React", "TypeScript", "open API"],
    github: "https://github.com/pryy17/movies-elemes",
    demo: "https://movies-elemes.vercel.app/",
    image: "https://res.cloudinary.com/dsgz61dvy/image/upload/v1766988248/Screenshot_2025-12-29_093022_khrafa.png",
  },
]

function ProjectPlanet({ project, onClick, isSelected }: any) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.05
    }
  })

  return (
    <group position={project.position}>
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
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial
          color={project.color}
          emissive={project.color}
          emissiveIntensity={isSelected ? 0.2 : 0.05}
          transparent
          opacity={0.7}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.6, 16]} />
        <meshBasicMaterial color={project.color} transparent opacity={0.2} />
      </mesh>

      <Text position={[0, -0.8, 0]} fontSize={0.15} color="white" anchorX="center" anchorY="middle">
        {project.name}
      </Text>
    </group>
  )
}

// Fallback 2D grid view
function FallbackProjectGrid({ projects, onProjectClick }: any) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project: any) => (
        <motion.div
          key={project.id}
          whileHover={{ scale: 1.05 }}
          onClick={() => onProjectClick(project)}
          className="cursor-pointer"
        >
          <Card className="glass-morphism border-white/20 hover:border-cyan-400/50 transition-all duration-300">
            <CardContent className="p-4">
              <div
                className="w-full h-32 rounded-lg mb-4 flex items-center justify-center text-4xl"
                style={{ backgroundColor: project.color + "20" }}
              >
                🚀
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{project.name}</h3>
              <p className="text-white/70 text-sm line-clamp-2">{project.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

interface ProjectGalaxyProps {
  selectedFilter: string
}

export default function ProjectGalaxy({ selectedFilter }: ProjectGalaxyProps) {
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [webglSupported, setWebglSupported] = useState(true)
  const [canvasError, setCanvasError] = useState(false)

  const filteredProjects = projectsData.filter(
    (project) => selectedFilter === "all" || project.category === selectedFilter,
  )

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
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, -5, -5]} intensity={0.4} color="#ff00ff" />

          {filteredProjects.map((project) => (
            <ProjectPlanet
              key={project.id}
              project={project}
              isSelected={selectedProject?.id === project.id}
              onClick={() => setSelectedProject(project)}
            />
          ))}

          <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} maxDistance={10} minDistance={3} />
        </Canvas>
      ) : (
        <FallbackProjectGrid projects={filteredProjects} onProjectClick={setSelectedProject} />
      )}

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-10"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-morphism rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedProject.image || "/placeholder.svg?height=200&width=300"}
                    alt={selectedProject.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">{selectedProject.name}</h3>

                  <p className="text-white/80 mb-4">{selectedProject.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.technologies.map((tech: string) => (
                      <span key={tech} className="px-2 py-1 bg-white/10 rounded text-sm text-white">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      className="glass-morphism border-cyan-400 text-cyan-400 hover:bg-cyan-400/20 bg-transparent"
                      asChild
                    >
                      <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                    </Button>

                    <Button
                      variant="outline"
                      className="glass-morphism border-purple-400 text-purple-400 hover:bg-purple-400/20 bg-transparent"
                      asChild
                    >
                      <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
