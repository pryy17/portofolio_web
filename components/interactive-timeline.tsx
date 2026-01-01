"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Briefcase } from "lucide-react"
import TimelineCardWithGlass from "./3d/with3D"
import Card3DWrapper from "./3d/with3D"
const timelineData = [
  {
    id: 1,
    year: "2024 - 2025",
    title: "Front-End Web Developer",
    company: "Mitra Integrasi Informatika",
    location: "Indonesia",
    description:
      "Developed and maintained large-scale banking web applications with high reliability, focusing on performance, clean architecture, and micro-frontend adoption.",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Webpack Module Federation",
      "Tailwind CSS",
      "React Query",
      "Zustand",
    ],
    achievements: [
      "Collaborated closely with backend teams to integrate REST APIs with consistent data contracts",
      "Contributed to migration from monolithic repo to micro-frontend architecture",
      "Improved frontend performance through code-splitting, lazy loading, and bundle optimization",
      "Resolved production and development bugs to ensure stable releases in a banking environment",
    ],
  },
  {
    id: 2,
    year: "2024",
    title: "Front-End Web Engineer Intern",
    company: "Ajaib",
    location: "Indonesia",
    description:
      "Worked in an agile environment maintaining and enhancing internal web platforms and mobile web views using React.",
    technologies: ["React", "JavaScript", "Agile Scrum"],
    achievements: [
      "Maintained and added features to internal company websites",
      "Maintained React-based web views for mobile applications",
      "Learned and applied design systems and unit testing practices",
      "Collaborated within Agile Scrum development cycles",
    ],
  },
  {
    id: 3,
    year: "2023 – 2024",
    title: "Front-End Web Developer",
    company: "Laju Omega Digital",
    location: "Indonesia",
    description:
      "Built and maintained public-facing web applications focused on data visualization, user interaction, and client-driven feature development.",
    technologies: [
      "Vue.js",
      "Vuetify",
      "ApexCharts",
      "Axios",
      "Laravel",
      "HTML",
      "CSS",
      "JavaScript",
    ],
    achievements: [
      "Developed public complaint monitoring features with charts and dashboards",
      "Implemented PDF and Excel data export functionality",
      "Built ticket submission forms and consumed REST APIs",
      "Maintained and improved applications based on client feedback",
    ],
  },
  {
    id: 4,
    year: "2022",
    title: "Front-End Web Developer Intern",
    company: "Telkom Indonesia",
    location: "Indonesia",
    description:
      "Collaborated with cross-functional teams to build and enhance a web platform using React in an Agile Scrum environment.",
    technologies: ["React", "JavaScript", "Linux", "REST API"],
    achievements: [
      "Developed frontend features for Ideabox platform",
      "Implemented login and registration with validation",
      "Collaborated with UI/UX designers to translate designs into code",
      "Worked in Agile Scrum for continuous delivery",
    ],
  },
  {
    id: 5,
    year: "2022",
    title: "React Front-End Engineer",
    company: "Alterra (Kampus Merdeka)",
    location: "Indonesia",
    description:
      "Built strong foundations in React through real-world individual and team-based projects.",
    technologies: [
      "React",
      "Next.js",
      "Redux Toolkit",
      "GraphQL",
      "Apollo Client",
      "Tailwind CSS",
    ],
    achievements: [
      "Built a food ordering application using React, GraphQL, and Redux Toolkit",
      "Contributed to a Learning Management System using Next.js",
      "Learned React fundamentals, hooks, routing, forms, and state management",
      "Gained experience in testing and deployment",
    ],
  },
  {
    id: 6,
    year: "Self-Initiated",
    title: "Full-Stack / Backend Developer",
    company: "Personal Projects",
    location: "Remote",
    description:
      "Designed and developed RESTful backend systems to support scalable frontend applications.",
    technologies: [
      "Node.js",
      "Strapi",
      "PostgreSQL",
      "MySQL",
      "Prisma ORM",
    ],
    achievements: [
      "Built RESTful E-commerce APIs with authentication and RBAC",
      "Designed relational database schemas and business logic",
      "Implemented cart, order, and user management systems",
      "Integrated secure and scalable backend APIs with frontend apps",
    ],
  },
];


export default function InteractiveTimeline() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0.5)
  const timelineRef = useRef<HTMLDivElement>(null)
  const smoothProgress = useRef(0)



  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return

      const el = timelineRef.current
      const rect = el.getBoundingClientRect()

      const windowHeight = window.innerHeight

      // posisi tengah viewport (relatif viewport)
      const viewportCenter = windowHeight / 2

      // posisi absolut timeline
      const timelineStart = rect.top
      const timelineEnd = rect.top + rect.height

      /**
       * progress:
       * 0 → viewportCenter di timelineStart
       * 1 → viewportCenter di timelineEnd
       */
      const progress =
        (viewportCenter - timelineStart) /
        (timelineEnd - timelineStart)

      setScrollProgress(
        Math.max(0, Math.min(1, progress))
      )
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Call once on mount
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    let rafId: number

    const animate = () => {
      smoothProgress.current +=
        (scrollProgress - smoothProgress.current) * 0.08

      rafId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(rafId)
  }, [scrollProgress])

  useEffect(() => {
    let rafId: number

    const animate = () => {
      smoothProgress.current +=
        (scrollProgress - smoothProgress.current) * 0.01
      //            ↑ scroll        ↑ current        ↑ faktor delay

      rafId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(rafId)
  }, [scrollProgress])


  return (
    <div className="relative min-h-screen" ref={timelineRef}>
      {/* Background Image */}
      <div
        ref={timelineRef}
        className="relative z-10 py-16"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/bg-2.jpg)' }}
        />

        {/* Gradient overlays for seamless blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/100 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/100 to-transparent" />

        {/* Content */}
        <div className="relative z-10 py-16">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full" />

          {/* Scroll Progress Glow */}
          <motion.img
            src="/astronot.png"
            alt="scroll progress"
            className="absolute left-1/2 w-48 h-48 rounded-full shadow-lg pointer-events-none"
            style={{
              top: `${smoothProgress.current * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(34, 211, 238, 0.5)",
                "0 0 40px rgba(34, 211, 238, 0.8)",
                "0 0 20px rgba(34, 211, 238, 0.5)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="space-y-12 container">
            {timelineData.map((item, index) => (

              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                {/* Content Card */}

                <div className={`w-5/12 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                    className="cursor-pointer relative"
                  >
                    <Card3DWrapper>
                      <Card className="glass-morphism border-white/20 hover:border-cyan-400/50 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="h-4 w-4 text-cyan-400" />
                            <span className="text-cyan-400 font-semibold">{item.year}</span>
                          </div>

                          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>

                          <div className="flex items-center gap-2 mb-3">
                            <Briefcase className="h-4 w-4 text-purple-400" />
                            <span className="text-white/80">{item.company}</span>
                          </div>

                          <div className="flex items-center gap-2 mb-4">
                            <MapPin className="h-4 w-4 text-green-400" />
                            <span className="text-white/60">{item.location}</span>
                          </div>

                          <p className="text-white/70 mb-4">{item.description}</p>

                          <div className="flex flex-wrap gap-2">
                            {item.technologies.map((tech) => (
                              <Badge key={tech} variant="secondary" className="bg-white/10 text-white">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </Card3DWrapper>
                  </motion.div>
                </div>

                {/* Timeline Node */}
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full border-4 border-black shadow-lg"
                  />
                </div>

                {/* Spacer */}
                <div className="w-5/12" />
              </motion.div>
            ))}
          </div>

          {/* Expanded Details Modal */}
          <AnimatePresence>
            {selectedItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedItem(null)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="glass-morphism rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                >
                  {(() => {
                    const item = timelineData.find((i) => i.id === selectedItem)
                    if (!item) return null

                    return (
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                        <p className="text-white/80 mb-6">{item.description}</p>

                        <h4 className="text-lg font-semibold text-cyan-400 mb-3">Key Achievements:</h4>
                        <ul className="space-y-2 mb-6">
                          {item.achievements.map((achievement, i) => (
                            <li key={i} className="text-white/70 flex items-center">
                              <span className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
                              {achievement}
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2">
                          {item.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="bg-white/10 text-white">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )
                  })()}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div >
  )
}
