"use client"

import { Star, User } from "lucide-react"

export function AgencyTestimonials() {
    return (
        <section className="py-24 px-6 md:px-12 bg-[#0a0a0a]">
            <div className="max-w-3xl mx-auto text-center mb-16">
                <span className="text-orange-500 font-mono tracking-widest text-sm uppercase">Testimonials</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">What our <span className="text-orange-500 italic font-serif">clients</span> say?</h2>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
                    <div className="flex gap-1 text-orange-500 mb-6">
                        <Star className="fill-current w-5 h-5" />
                        <Star className="fill-current w-5 h-5" />
                        <Star className="fill-current w-5 h-5" />
                        <Star className="fill-current w-5 h-5" />
                        <Star className="fill-current w-5 h-5" />
                    </div>
                    <p className="text-zinc-300 text-lg mb-8 leading-relaxed">
                        "The team transformed our vision into a reality that exceeded our expectations. Their attention to detail and creative approach is unmatched in the industry. Truly a partner in our growth."
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center overflow-hidden">
                            <User className="w-6 h-6 text-zinc-400" />
                            {/* Img would go here */}
                        </div>
                        <div>
                            <h4 className="text-white font-bold">Alex Morgan</h4>
                            <p className="text-zinc-500 text-sm">CEO, TechStrive</p>
                        </div>
                    </div>
                </div>

                <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 mt-0 md:mt-12">
                    <div className="flex gap-1 text-orange-500 mb-6">
                        <Star className="fill-current w-5 h-5" />
                        <Star className="fill-current w-5 h-5" />
                        <Star className="fill-current w-5 h-5" />
                        <Star className="fill-current w-5 h-5" />
                        <Star className="fill-current w-5 h-5" />
                    </div>
                    <p className="text-zinc-300 text-lg mb-8 leading-relaxed">
                        "Working with UI ADR was a game changer for our brand identity. They understood our core values and translated them into a visual language that resonates with our audience."
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center overflow-hidden">
                            <User className="w-6 h-6 text-zinc-400" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold">Sarah Chen</h4>
                            <p className="text-zinc-500 text-sm">Marketing Director, Bloom</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
