'use client'

import Lenis from '@studio-freight/lenis'
import React, { useEffect, PropsWithChildren } from 'react'

export default function SmoothScrollProvider({ children }: PropsWithChildren) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 3, 
            smoothWheel: true,
        })

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
    }, [])

    return children
}
