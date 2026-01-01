"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, GitCommit } from "lucide-react"

interface GitHubData {
  commits: number
  stars: number
  repos: number
  lastCommit: string
}

export default function LiveGitHubWidget() {
  const [githubData, setGithubData] = useState<GitHubData>({
    commits: 1247,
    stars: 89,
    repos: 42,
    lastCommit: "2 hours ago",
  })

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setGithubData((prev) => ({
        ...prev,
        commits: prev.commits + Math.floor(Math.random() * 3),
        lastCommit: Math.random() > 0.5 ? "Just now" : "1 hour ago",
      }))
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="glass-morphism border-white/20 hover:border-green-400/50 transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Github className="h-5 w-5 text-green-400" />
          Currently Building
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <motion.div whileHover={{ scale: 1.05 }} className="text-center p-3 rounded-lg bg-white/5">
            <div className="text-2xl font-bold text-green-400">{githubData.commits}</div>
            <div className="text-sm text-white/60">Total Commits</div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="text-center p-3 rounded-lg bg-white/5">
            <div className="text-2xl font-bold text-yellow-400">{githubData.stars}</div>
            <div className="text-sm text-white/60">Stars Earned</div>
          </motion.div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitCommit className="h-4 w-4 text-cyan-400" />
            <span className="text-white/80">Last commit:</span>
          </div>
          <Badge variant="secondary" className="bg-green-400/20 text-green-400">
            {githubData.lastCommit}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-white/60">Recent Activity:</div>
          <div className="space-y-1">
            <div className="text-sm text-white/80">🚀 Updated portfolio design system</div>
            <div className="text-sm text-white/80">✨ Added 3D animations to hero section</div>
            <div className="text-sm text-white/80">🔧 Optimized build performance</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
