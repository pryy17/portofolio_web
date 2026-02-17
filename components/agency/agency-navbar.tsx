"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

export function AgencyNavbar() {
    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 bg-transparent backdrop-blur-sm"
        >
            <div className="flex items-center gap-2">
                <div className="text-2xl font-bold tracking-tighter text-white font-sora">
                    ADR
                    <span className="text-orange-500">.</span>
                </div>
            </div>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                <Link href="/" className="hover:text-white transition-colors">
                    Owner
                </Link>
                <Link href="/agency" className="hover:text-white transition-colors">
                    Agency
                </Link>
            </nav>

            <Button className="bg-white text-black hover:bg-zinc-200 rounded-full px-6 py-2 font-medium">
                <Link href="https://wasap.at/7Gh0Lb" target="_blank">
                    Let's Talk
                </Link>
            </Button>
        </motion.header>
    )
}
