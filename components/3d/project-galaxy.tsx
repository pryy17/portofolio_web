"use client"

import { useRef, useState, useEffect, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text, Billboard, Image } from "@react-three/drei"
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
    position: [0, 3, 0],
    color: "#FF5733",
    description: "sebuah website learning management system yang menggunakan berbagai macam implementasi teknologi di dalamnya di aman user dapat melihat video, auth, memberi rating, claim sertifikat, completed video, dll.",
    technologies: ["React", "Tailwind", "redux"],
    github: "https://github.com/edutiv/frontend-web",
    demo: "https://edutiv-web.vercel.app/",
    image: "https://portofolio-web-git-main-pryy17.vercel.app/assets/edutiv.png",
  },
  {
    id: 2,
    name: "AI ERP Platform",
    category: "frontend",
    position: [-1.5, 2.2, 1.3],
    color: "#33FF57",
    description: "Modern e-commerce platform with advanced filtering and payment integration.",
    technologies: ["Next.js", "Strapi", "open AI", "PostgreSQL", "vercel Chat Bot"],
    github: "https://github.com/pryy17/AI-commerce",
    demo: "https://demo.com",
    image: "/erp.png",
  },
  {
    id: 3,
    name: "Foodys",
    category: "backend",
    position: [0.2, 1.5, -2.6],
    color: "#3357FF",
    description: "sebuah website food order di lengkapi dengan fitur login list makanan, detail makanan, fitur keranjang dan simulasi payment website ini di dukung oleh teknologi graphql untuk database nya.",
    technologies: ["Node.js", "Redis", "Docker", "AWS"],
    github: "https://github.com/pryy17/React_mini-project",
    demo: "https://react-mini-project-p9oc.vercel.app/",
    image: "https://portofolio-web-git-main-pryy17.vercel.app/assets/foodys.png",
  },
  {
    id: 4,
    name: "SPBE APP",
    category: "frontend",
    position: [1.8, 0.8, 2.3],
    color: "#F033FF",
    description: "sebuah prototipe website untuk memandu asesor internal dalam mengevaluasi sistem pemerintahan SPBE di setiap lembaga daerah",
    technologies: ["React", "TypeScript", "Strapi"],
    github: "https://panduan-spbe.vercel.app/",
    demo: "https://panduan-spbe.vercel.app/",
    image: "https://portofolio-web-git-main-pryy17.vercel.app/assets/spbe.png",
  },
  {
    id: 5,
    name: "Movies List",
    category: "frontend",
    position: [-2.9, 0, -0.5],
    color: "#33FFF0",
    description: "website menampilkan api dari film sekarang bisa menambahkan wistlist dan terdapat fitu pencarian",
    technologies: ["React", "TypeScript", "open API"],
    github: "https://github.com/pryy17/movies-elemes",
    demo: "https://movies-elemes.vercel.app/",
    image: "https://res.cloudinary.com/dsgz61dvy/image/upload/v1766988248/Screenshot_2025-12-29_093022_khrafa.png",
  },
  {
    id: 6,
    name: "restaurant booking",
    category: "frontend",
    position: [2.4, -0.8, -1.6],
    color: "#FFD433",
    description: "sebuah website untuk memesan makanan di restoran",
    technologies: ["React", "TypeScript", "open API"],
    github: "https://github.com/pryy17/restaurant-booking",
    demo: "https://hpkjvhj5oc5io.ok.kimi.link",
    image: "/restaurant.png",
  },
  {
    id: 7,
    name: "AI ecommerce",
    category: "frontend",
    position: [-0.7, -1.5, 2.5],
    color: "#FF336E",
    description: "sebuah website ecommerce yang di lengkapi dengan fitur AI untuk membantu user dalam mencari produk yang sesuai dengan kebutuhan mereka",
    technologies: ["React", "TypeScript", "open API"],
    github: "",
    demo: "",
    image: "/ecommerce.png",
  },
  {
    id: 8,
    name: "digital product",
    category: "frontend",
    position: [-0.9, -2.2, -1.8],
    color: "#A533FF",
    description: "sebuah website untuk menjual produk digital",
    technologies: ["React", "TypeScript", "open API"],
    github: "",
    demo: "https://zgmq7gclmqonq.ok.kimi.link",
    image: "/digital.png",
  },
  {
    id: 9,
    name: "company profile",
    category: "frontend",
    position: [0, -3, 0],
    color: "#33FF99",
    description: "sebuah website company profile untuk perusahaan",
    technologies: ["React", "TypeScript", "open API"],
    github: "",
    demo: "https://3bltmhdcta5ac.ok.kimi.link",
    image: "/company.png",
  },
  {
    id: 10,
    name: "hospital landing page",
    category: "frontend",
    position: [2, -2, 2],
    color: "#33FF99",
    description: "sebuah website landing page untuk rumah sakit",
    technologies: ["React", "TypeScript", "open API"],
    github: "",
    demo: "https://p5jjc7afce22k.ok.kimi.link/",
    image: "https://res.cloudinary.com/dsgz61dvy/image/upload/v1774925814/Screenshot_15_gzgndn.png",
  },
]

function ProjectPlanet({ project, onClick, isSelected }: any) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = project.position[1] + Math.sin(state.clock.elapsedTime * 2 + project.id) * 0.05
    }
  })

  return (
    <group ref={groupRef} position={project.position}>
      <Billboard>
        <Image
          url={project.image || "/placeholder.svg"}
          scale={[1.6, 1]}
          transparent
          opacity={isSelected ? 1 : 0.8}
          onClick={onClick}
          onPointerOver={(e) => {
            e.stopPropagation()
            document.body.style.cursor = "pointer"
          }}
          onPointerOut={() => {
            document.body.style.cursor = "auto"
          }}
        />
        <Text position={[0, -0.7, 0]} fontSize={0.15} color="white" anchorX="center" anchorY="middle">
          {project.name}
        </Text>
      </Billboard>
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

          <Suspense fallback={null}>
            {filteredProjects.map((project) => (
              <ProjectPlanet
                key={project.id}
                project={project}
                isSelected={selectedProject?.id === project.id}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </Suspense>

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
              className="glass-morphism rounded-lg p-6 max-w-5xl w-full max-h-[100vh] overflow-y-auto"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedProject.image || "/placeholder.svg?height=200&width=300"}
                    alt={selectedProject.name}
                    className="w-full h-60 object-cover rounded-lg mb-4"
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
