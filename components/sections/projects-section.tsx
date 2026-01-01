"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import ProjectGalaxy from "@/components/3d/project-galaxy"
import ProjectFilter from "@/components/project-filter"

export default function ProjectsSection() {
  const [selectedFilter, setSelectedFilter] = useState("all")

  return (
    <section id="projects" className="py-20 relative min-h-screen">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 liquid-gradient font-sora">Projects</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Explore my projects as planets in a 3D universe. Click on any planet to dive deeper into the project
            details.
          </p>

          <ProjectFilter selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} />
        </motion.div>

        {/* 3D Galaxy Container */}
        <div className="h-[600px] w-full relative">
          <ProjectGalaxy selectedFilter={selectedFilter} />
        </div>
      </div>
    </section>
  )
}
