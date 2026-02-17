'use client'

import Lenis from '@studio-freight/lenis'
import React, { useEffect, PropsWithChildren, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function SmoothScrollProvider({ children }: PropsWithChildren) {
    const lenisRef = useRef<Lenis | null>(null)
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        })
        lenisRef.current = lenis

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
        }
    }, [])

    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true })
        }
    }, [pathname, searchParams])

    return children
}
