'use client'

import Lenis from '@studio-freight/lenis'
import React, { useEffect, PropsWithChildren, useRef, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

function SmoothScrollHandler({ lenisRef }: { lenisRef: React.MutableRefObject<Lenis | null> }) {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true })
        }
    }, [pathname, searchParams, lenisRef])

    return null
}

export default function SmoothScrollProvider({ children }: PropsWithChildren) {
    const lenisRef = useRef<Lenis | null>(null)

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

    return (
        <React.Fragment>
            <Suspense fallback={null}>
                <SmoothScrollHandler lenisRef={lenisRef} />
            </Suspense>
            {children}
        </React.Fragment>
    )
}
