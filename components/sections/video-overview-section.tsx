"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, Pause, ExternalLink } from "lucide-react"

const videosData = [
    {
        id: 1,
        title: "AI ERP Platform",
        description: "Enterprise Resource Planning dengan fitur AI untuk manajemen inventaris, penjualan, dan analisis data.",
        url: "https://res.cloudinary.com/dsgz61dvy/video/upload/v1774422367/Video_Project_8_new_v2mmpa.mp4",
        thumbnail: "/erp.png",
        demo: "",
        tag: "Fullstack",
        color: "#33FF57",
    },
    {
        id: 2,
        title: "AI ecommerce",
        description: "Website ecommerce dengan fitur AI untuk rekomendasi produk.",
        url: "https://res.cloudinary.com/dsgz61dvy/video/upload/v1774422985/Video_Project_8_1_new_unlpvx.mp4",
        thumbnail: "/ecommerce.png",
        demo: "",
        tag: "Fullstack",
        color: "#FF5733",
    },
]

export default function VideoOverviewSection() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const iframeRef = useRef<HTMLIFrameElement>(null)

    const total = videosData.length
    const current = videosData[activeIndex]

    const prev = () => {
        setIsPlaying(false)
        setActiveIndex((i) => (i - 1 + total) % total)
    }

    const next = () => {
        setIsPlaying(false)
        setActiveIndex((i) => (i + 1) % total)
    }

    // keyboard navigation
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") prev()
            if (e.key === "ArrowRight") next()
        }
        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [])

    return (
        <section className="relative py-24 overflow-hidden" id="video-overview">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.07)_0%,transparent_70%)]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/60 tracking-widest uppercase mb-4">
                        Project Showcase
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Video{" "}
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Overview
                        </span>
                    </h2>
                    <p className="text-white/50 text-lg max-w-xl mx-auto">
                        Lihat demo langsung dari setiap project yang telah dibangun.
                    </p>
                </motion.div>

                {/* Main Carousel */}
                <div className="flex flex-col lg:flex-row gap-10 items-center">
                    {/* Video Player */}
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="relative w-full lg:w-2/3 rounded-2xl overflow-hidden shadow-2xl"
                        style={{ boxShadow: `0 0 60px ${current.color}30` }}
                    >
                        {/* Color accent border */}
                        <div
                            className="absolute inset-0 rounded-2xl pointer-events-none z-10"
                            style={{ boxShadow: `inset 0 0 0 1.5px ${current.color}40` }}
                        />

                        {isPlaying ? (
                            <iframe
                                ref={iframeRef}
                                src={`${current.url}?autoplay=1`}
                                className="w-full aspect-video"
                                allow="autoplay; fullscreen"
                                allowFullScreen
                            />
                        ) : (
                            <div className="relative w-full aspect-video cursor-pointer group" onClick={() => setIsPlaying(true)}>
                                <img
                                    src={current.thumbnail || "/placeholder.svg"}
                                    alt={current.title}
                                    className="w-full h-full object-cover"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-300" />
                                {/* Play button */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.div
                                        whileHover={{ scale: 1.12 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-sm"
                                        style={{ background: `${current.color}99`, boxShadow: `0 0 30px ${current.color}60` }}
                                    >
                                        <Play className="w-8 h-8 text-white fill-white ml-1" />
                                    </motion.div>
                                </div>
                            </div>
                        )}

                        {/* Pause button overlay when playing */}
                        {isPlaying && (
                            <button
                                onClick={() => setIsPlaying(false)}
                                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 backdrop-blur hover:bg-black/70 transition"
                            >
                                <Pause className="w-4 h-4 text-white" />
                            </button>
                        )}
                    </motion.div>

                    {/* Info Panel */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-6">
                        {/* Active info */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <span
                                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
                                    style={{ background: `${current.color}25`, color: current.color }}
                                >
                                    {current.tag}
                                </span>
                                <h3 className="text-2xl font-bold text-white mb-3">{current.title}</h3>
                                <p className="text-white/60 text-sm leading-relaxed mb-5">{current.description}</p>
                                {current.demo && (
                                    <a
                                        href={current.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
                                        style={{ background: `${current.color}20`, color: current.color, border: `1px solid ${current.color}40` }}
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Live Demo
                                    </a>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className="flex items-center gap-4 mt-2">
                            <button
                                onClick={prev}
                                className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200"
                            >
                                <ChevronLeft className="w-5 h-5 text-white" />
                            </button>

                            {/* Dots */}
                            <div className="flex gap-2 flex-1 justify-center">
                                {videosData.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => { setIsPlaying(false); setActiveIndex(i) }}
                                        className="transition-all duration-300 rounded-full"
                                        style={{
                                            width: i === activeIndex ? "28px" : "8px",
                                            height: "8px",
                                            background: i === activeIndex ? current.color : "rgba(255,255,255,0.2)",
                                        }}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={next}
                                className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200"
                            >
                                <ChevronRight className="w-5 h-5 text-white" />
                            </button>
                        </div>

                        {/* Counter */}
                        <p className="text-center text-white/30 text-xs tracking-widest">
                            {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                        </p>
                    </div>
                </div>

                {/* Thumbnail Strip */}
                <div className="mt-10 flex gap-3 overflow-x-auto pb-2 scrollbar-hide justify-center flex-wrap">
                    {videosData.map((v, i) => (
                        <motion.button
                            key={v.id}
                            onClick={() => { setIsPlaying(false); setActiveIndex(i) }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            className="relative flex-shrink-0 w-28 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300"
                            style={{
                                borderColor: i === activeIndex ? v.color : "rgba(255,255,255,0.08)",
                                boxShadow: i === activeIndex ? `0 0 14px ${v.color}50` : "none",
                                opacity: i === activeIndex ? 1 : 0.5,
                            }}
                        >
                            <img src={v.thumbnail || "/placeholder.svg"} alt={v.title} className="w-full h-full object-cover" />
                            {i === activeIndex && (
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                    <Play className="w-4 h-4 text-white fill-white" />
                                </div>
                            )}
                        </motion.button>
                    ))}
                </div>
            </div>
        </section>
    )
}
