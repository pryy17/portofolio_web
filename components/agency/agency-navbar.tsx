"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export function AgencyNavbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 bg-transparent backdrop-blur-sm border-b border-white/5"
        >
            <div className="flex items-center justify-between max-w-7xl mx-auto h-16">
                <div className="flex items-center gap-2">
                    <Link href="/" className="text-2xl font-bold tracking-tighter text-white font-sora">
                        ADR
                        <span className="text-orange-500">.</span>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                    <Link href="/" className="hover:text-white transition-colors">
                        Owner
                    </Link>
                    <Link href="/agency" className="hover:text-white transition-colors">
                        Agency
                    </Link>
                </nav>

                <div className="hidden md:block">
                    <Button className="bg-white text-black hover:bg-zinc-200 rounded-full px-6 py-2 font-medium">
                        <Link href="https://wasap.at/7Gh0Lb" target="_blank">
                            Let's Talk
                        </Link>
                    </Button>
                </div>

                {/* Mobile Menu Toggle & CTA */}
                <div className="flex md:hidden items-center gap-4">
                    <Button className="bg-white text-black hover:bg-zinc-200 rounded-full px-4 py-1.5 text-xs font-medium">
                        <Link href="https://wasap.at/7Gh0Lb" target="_blank">
                            Let's Talk
                        </Link>
                    </Button>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-white/70 hover:text-white transition-colors focus:outline-none"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden overflow-hidden bg-black/95 backdrop-blur-xl border-t border-white/5"
                    >
                        <div className="flex flex-col gap-6 p-8">
                            <Link
                                href="/"
                                onClick={() => setIsOpen(false)}
                                className="text-2xl font-medium text-white hover:text-orange-500 transition-colors"
                            >
                                Owner
                            </Link>
                            <Link
                                href="/agency"
                                onClick={() => setIsOpen(false)}
                                className="text-2xl font-medium text-white hover:text-orange-500 transition-colors"
                            >
                                Agency
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    )
}
