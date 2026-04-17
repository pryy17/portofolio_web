"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

const projects = [
    {
        title: "Edutiv",
        category: "frontend",
        year: "2023",
        image: "https://portofolio-web-git-main-pryy17.vercel.app/assets/edutiv.png",
        size: "normal"
    },
    {
        title: "AI ERP Platform",
        category: "frontend",
        year: "2024",
        image: "/erp.png",
        size: "wide"
    },
    {
        title: "Foodys",
        category: "backend",
        year: "2023",
        image: "https://portofolio-web-git-main-pryy17.vercel.app/assets/foodys.png",
        size: "normal"
    },
    {
        title: "SPBE APP",
        category: "frontend",
        year: "2024",
        image: "https://portofolio-web-git-main-pryy17.vercel.app/assets/spbe.png",
        size: "normal"
    },
    {
        title: "Movies List",
        category: "frontend",
        year: "2025",
        image: "https://res.cloudinary.com/dsgz61dvy/image/upload/v1766988248/Screenshot_2025-12-29_093022_khrafa.png",
        size: "wide"
    },
    {
        title: "restaurant booking",
        category: "frontend",
        year: "2024",
        image: "/restaurant.png",
        size: "normal"
    },
    {
        title: "AI ecommerce",
        category: "frontend",
        year: "2024",
        image: "/ecommerce.png",
        size: "normal"
    },
    {
        title: "digital product",
        category: "frontend",
        year: "2024",
        image: "/digital.png",
        size: "wide"
    },
    {
        title: "company profile",
        category: "frontend",
        year: "2024",
        image: "/company.png",
        size: "normal"
    },
    {
        title: "hospital landing page",
        category: "frontend",
        year: "2024",
        image: "https://res.cloudinary.com/dsgz61dvy/image/upload/v1774925814/Screenshot_15_gzgndn.png",
        size: "normal"
    }
]

export function AgencyFeatured() {
    return (
        <section className="py-24 px-6 md:px-12 bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <span className="text-orange-500 font-mono tracking-widest text-sm uppercase">Portfolio</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">featured <span className="text-orange-500 italic font-serif">Work.</span></h2>
                    </div>

                    <div className="hidden md:flex gap-2">
                        {/* Categories or filters could go here */}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`group relative ${project.size === 'wide' ? 'md:col-span-2 aspect-[2/1]' : 'aspect-[4/3]'} rounded-xl overflow-hidden cursor-pointer`}
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <span className="text-orange-500 text-sm font-medium mb-1 block">{project.category}</span>
                                        <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                                    </div>
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                        <ArrowUpRight className="text-black w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
