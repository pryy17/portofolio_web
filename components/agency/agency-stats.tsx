"use client"

import { motion } from "framer-motion"

export function AgencyStats() {
    return (
        <section className="py-24 px-6 md:px-12 bg-[#0a0a0a] overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <div className="relative">
                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight"
                        >
                            Crafting <span className="text-zinc-600">digital</span> products
                        </motion.h2>

                        <div className="mt-12 grid grid-cols-3 gap-8">
                            <div>
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2">5+</div>
                                <div className="text-zinc-500 text-sm">Satisfied<br />Clients</div>
                            </div>
                            <div>
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2">98%</div>
                                <div className="text-zinc-500 text-sm">Success<br />Rate</div>
                            </div>
                            {/* <div>
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2">223m</div>
                                <div className="text-zinc-500 text-sm">Investments<br />Raised</div>
                            </div> */}
                        </div>
                    </div>

                    <div className="text-zinc-400 text-lg md:text-xl leading-relaxed space-y-8">
                        <p>
                            We dive into your business streams in order to bring the authentic underlying values that your brand creates for its customers.
                        </p>
                        <div className="flex gap-4">
                            <div className="w-1 bg-orange-500 h-auto" />
                            <p className="italic text-zinc-300">
                                "We believe that every brand has a story to tell, and we are here to help you tell yours in the most compelling way possible."
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
