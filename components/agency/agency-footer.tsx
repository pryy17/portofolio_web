"use client"

import { Github, Instagram, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

export function AgencyFooter() {
    return (
        <footer className="bg-[#0a0a0a] pt-24 pb-8 px-6 md:px-12 border-t border-zinc-900">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-8">
                            Have an idea? <br />
                            <span className="text-zinc-500">Let's build it.</span>
                        </h2>
                        <div className="flex gap-4">
                            <span className="w-3 h-3 rounded-full bg-green-500 mt-2 block animate-pulse"></span>
                            <p className="text-zinc-400">Available for new projects</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8 justify-end items-start md:items-end">
                        <a href="mailto:priandy170501@gmail.com" className="text-2xl md:text-4xl font-bold text-white hover:text-orange-500 transition-colors border-b border-zinc-800 pb-2">
                            priandy170501@gmail.com
                        </a>
                        <div className="flex gap-6">
                            <Link href="#" className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all text-zinc-400">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all text-zinc-400">
                                <Twitter className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all text-zinc-400">
                                <Linkedin className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all text-zinc-400">
                                <Github className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-zinc-900 pt-12 text-sm text-zinc-500">
                    <div>
                        <h4 className="text-white font-bold mb-4">Sitemap</h4>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-orange-500">Home</Link></li>
                            <li><Link href="#" className="hover:text-orange-500">Services</Link></li>
                            <li><Link href="#" className="hover:text-orange-500">Works</Link></li>
                            <li><Link href="#" className="hover:text-orange-500">About</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">Socials</h4>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-orange-500">Instagram</Link></li>
                            <li><Link href="#" className="hover:text-orange-500">Twitter</Link></li>
                            <li><Link href="#" className="hover:text-orange-500">LinkedIn</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">Office</h4>
                        <p>123 Design Street,<br />Cengkareng, Jakarta Barat, 11450</p>
                    </div>
                    <div className="md:text-right">
                        <p>© 2026 ADR Agency.<br />All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
