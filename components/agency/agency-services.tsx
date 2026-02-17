"use client"

import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

const services = [
    // {
    //     id: "01",
    //     title: "DIGITAL MARKETING",
    //     description: "We increase your online presence and lead generation through strategic digital marketing campaigns tailored to your specific audience.",
    //     image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
    // },
    {
        id: "02",
        title: "WEB DESIGN",
        description: "Creating stunning, user-centric website designs that not only look good but also perform exceptionally well across all devices.",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2564&auto=format&fit=crop"
    },
    {
        id: "03",
        title: "IT CONSULTING",
        description: "Expert advice to help you navigate the complex technology landscape and make informed decisions for your business infrastructure.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
    },
    // {
    //     id: "04",
    //     title: "BRAND IDENTITY",
    //     description: "Building strong, memorable brands that resonate with your target market and stand out from the competition.",
    //     image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2500&auto=format&fit=crop"
    // }
]

export function AgencyServices() {
    const [activeService, setActiveService] = useState(0)

    return (
        <section className="py-24 px-6 md:px-12 bg-[#0a0a0a] border-t border-zinc-900">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Image Preview */}
                    <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden hidden lg:block">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: activeService === index ? 1 : 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/20" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Services List */}
                    <div className="flex flex-col justify-center">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                className="border-b border-zinc-800 group"
                                onMouseEnter={() => setActiveService(index)}
                            >
                                <div className={`py-8 cursor-pointer flex items-center justify-between transition-all duration-300 ${activeService === index ? 'pl-4 border-l-4 border-orange-500' : ''}`}>
                                    <div className="flex items-center gap-6">
                                        <span className="text-orange-500 font-mono text-sm">.{service.id}</span>
                                        <h3 className={`text-2xl md:text-3xl font-bold transition-colors ${activeService === index ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                                            {service.title}
                                        </h3>
                                    </div>
                                    <Plus className={`w-6 h-6 transition-transform duration-300 ${activeService === index ? 'rotate-45 text-orange-500' : 'text-zinc-600'}`} />
                                </div>

                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{
                                        height: activeService === index ? 'auto' : 0,
                                        opacity: activeService === index ? 1 : 0
                                    }}
                                    className="overflow-hidden"
                                >
                                    <p className="pb-8 text-zinc-400 max-w-md ml-12">
                                        {service.description}
                                    </p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
