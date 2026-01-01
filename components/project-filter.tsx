"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const filters = [
  { id: "all", label: "All Projects", icon: "🌌" },
  { id: "frontend", label: "Frontend", icon: "🎨" },
  { id: "backend", label: "Backend", icon: "⚙️" },
]

interface ProjectFilterProps {
  selectedFilter: string
  onFilterChange: (filter: string) => void
}

export default function ProjectFilter({ selectedFilter, onFilterChange }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {filters.map((filter) => (
        <motion.div key={filter.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant={selectedFilter === filter.id ? "default" : "outline"}
            onClick={() => onFilterChange(filter.id)}
            className={`glass-morphism border-white/20 ${
              selectedFilter === filter.id
                ? "bg-cyan-400/20 border-cyan-400 text-cyan-400"
                : "hover:border-cyan-400/50 text-white"
            }`}
          >
            <span className="mr-2">{filter.icon}</span>
            {filter.label}
          </Button>
        </motion.div>
      ))}
    </div>
  )
}
