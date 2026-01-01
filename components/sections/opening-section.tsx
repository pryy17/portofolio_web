'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, easeInOut } from 'framer-motion'

export default function OpeningSection() {
    const [splashComplete, setSplashComplete] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setSplashComplete(true)
        }, 3000)

        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        document.body.style.overflow = splashComplete ? '' : 'hidden'
        return () => {
            document.body.style.overflow = ''
        }
    }, [splashComplete])

    return (
        <AnimatePresence mode="wait">
            {!splashComplete && (
                <div className="fixed inset-0 z-[100]">
                    {/* ATAS */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-1/2 bg-black flex items-end justify-center overflow-hidden"
                        initial={{ y: 0 }}
                        exit={{ y: '-100%', transition: { duration: 3, ease: easeInOut, delay: 1 }, }}
                    >
                        {/* <div className="w-[22rem] h-[11rem] mt-[30em]">
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-[22rem] object-contain translate-y-[11rem] -mt-[13em]"
                            >
                                <source src="/logo.webm" type="video/webm" />
                            </video>
                        </div> */}
                    </motion.div>


                    {/* BAWAH */}
                    <motion.div
                        className="absolute bottom-0 left-0 w-full h-1/2 bg-black flex items-start justify-center overflow-hidden"
                        initial={{ y: 0 }}
                        exit={{ y: '100%', transition: { duration: 3, ease: easeInOut, delay: 1 } }}
                    >
                        <div className="w-[22rem] h-[11rem] overflow-hidden">
                            {/* <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-[22rem] object-contain -translate-y-[11rem] -mt-[2em]"
                            >
                                <source src="/logo.webm" type="video/webm" />
                            </video> */}
                        </div>
                    </motion.div>

                    {/* kiri */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-1/2 bg-black flex items-end justify-center overflow-hidden"
                        initial={{ y: 0 }}
                        exit={{ x: '-100%', transition: { duration: 2, ease: easeInOut} }}
                    >
                        <div className="w-[22rem] h-[11rem] mt-[30em]">
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-[22rem] object-contain translate-y-[11rem] -mt-[13em]"
                            >
                                <source src="/logo.webm" type="video/webm" />
                            </video>
                        </div>
                    </motion.div>


                    {/* kanan */}
                    <motion.div
                        className="absolute bottom-0 left-0 w-full h-1/2 bg-black flex items-start justify-center overflow-hidden"
                        initial={{ y: 0 }}
                        exit={{ x: '100%', transition: { duration: 2, ease: easeInOut } }}
                    >
                        <div className="w-[22rem] h-[11rem] overflow-hidden">
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-[22rem] object-contain -translate-y-[11rem] -mt-[2em]"
                            >
                                <source src="/logo.webm" type="video/webm" />
                            </video>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
