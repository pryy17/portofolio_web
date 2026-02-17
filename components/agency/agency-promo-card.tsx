"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { useState } from "react"

export function AgencyPromoCard() {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Link href="/agency" className="block w-full h-full">
            <motion.div
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 p-8 h-full group cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Glowing orb effect */}
                <motion.div
                    animate={{
                        x: isHovered ? [0, 100, 0] : 0,
                        y: isHovered ? [0, -50, 0] : 0,
                        opacity: isHovered ? 0.4 : 0.1
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-20 -right-20 w-64 h-64 bg-orange-500 rounded-full blur-[100px]"
                />

                <div className="relative z-10 flex flex-col justify-between h-full min-h-[200px]">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-500 text-xs font-bold uppercase tracking-wider border border-orange-500/20">
                                New
                            </span>
                            <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
                        </div>

                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 font-sora">
                            Atomic <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Digital</span> Revolution
                        </h3>

                        <p className="text-zinc-400 max-w-md">
                            Discover the future of web development. We build immersive, high-performance digital experiences for forward-thinking brands.
                        </p>
                    </div>

                    <div className="mt-8 flex items-center gap-3 text-white font-medium group-hover:text-orange-400 transition-colors">
                        <span>Enter the Agency</span>
                        <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`} />
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}
