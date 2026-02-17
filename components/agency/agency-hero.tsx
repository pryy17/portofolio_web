"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"

export function AgencyHero() {
    return (
        <section className="relative min-h-screen pt-32 pb-20 px-6 md:px-12 flex flex-col justify-start overflow-hidden bg-[#0a0a0a]">
            {/* Decorative Grid Lines - Simplified */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                <div className="absolute left-[20%] top-0 bottom-0 w-[1px] bg-zinc-800" />
                <div className="absolute right-[20%] top-0 bottom-0 w-[1px] bg-zinc-800" />
            </div>

            <div className="z-10 w-full max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col relative"
                    >
                        <div className="text-[10rem] md:text-[14rem] font-bold leading-none tracking-tighter text-white/5 font-sora absolute -top-20 -left-10 select-none pointer-events-none">
                            2
                        </div>
                        <div className="relative z-10 pl-6 pt-10">
                            <span className="text-orange-500 font-bold block mb-2">Since 2024</span>
                            <h2 className="text-6xl md:text-8xl font-bold leading-none text-white tracking-tighter">
                                2
                            </h2>
                            <p className="text-zinc-500 mt-2 font-medium tracking-wide">YEARS EXPERIENCE</p>
                        </div>
                    </motion.div>

                    <div className="flex flex-col items-start lg:items-end">
                        {/* Circular Badge */}
                        <div className="mb-8 border border-zinc-700 rounded-full p-6 w-32 h-32 flex items-center justify-center border-dashed animate-spin-slow">
                            <span className="text-xs text-zinc-400 font-mono text-center">SCROLL<br />DOWN</span>
                        </div>

                        <motion.h1
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white leading-[1.1] text-right"
                        >
                            We help <br />
                            to <span className="font-serif italic text-zinc-400">grow</span> your business
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-8 flex gap-4"
                        >
                        </motion.div>
                    </div>
                </div>

                {/* Big Brand Name */}
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mt-20 relative w-full"
                >
                    <h1 className="text-[15vw] leading-none font-bold text-center tracking-tighter text-white font-sora mix-blend-overlay opacity-90">
                        Atomic Digital Revolution
                    </h1>

                    {/* Floating Images on top of text */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="hidden md:block absolute top-[20%] left-[15%] w-48 h-32 bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 shadow-2xl rotate-[-12deg] z-10"
                    >
                        {/* Placeholder for project img */}
                        <div className="w-full h-full bg-gradient-to-br from-orange-900 to-black opacity-80"></div>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 20, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="hidden md:block absolute top-[10%] right-[18%] w-40 h-40 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700 shadow-2xl z-10"
                    >
                        {/* Placeholder for project img/profile */}
                        <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                            <ArrowUpRight className="w-12 h-12 text-orange-500" />
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Services Grid below Hero */}
            <div className="w-full max-w-7xl mx-auto mt-24 border-t border-zinc-900 pt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        // { title: "Digital Marketing", icon: "DM" },
                        { title: "Web Design", icon: "WD" },
                        { title: "IT Consulting", icon: "IT" },
                        // { title: "Brand Identity", icon: "BI" }
                    ].map((service, i) => (
                        <div key={i} className="flex items-start gap-4 group cursor-pointer">
                            <div className="text-orange-500 text-xs font-bold mt-1">0{i + 1}</div>
                            <div>
                                <h3 className="text-white font-medium text-lg leading-tight group-hover:text-orange-500 transition-colors">{service.title}</h3>
                                <p className="text-zinc-600 text-sm mt-2 text-justify">
                                    Top-notch services tailored to your business needs with a focus on growth.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
