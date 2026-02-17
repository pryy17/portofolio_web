"use client"

import React, { useEffect, useRef, useState } from "react"
import { HandContext } from "@/components/context/hand-context"
import { useHandTracking } from "@/components/hooks/use-hand-tracking"

export function HandProvider({ children }: { children: React.ReactNode }) {
    // 1. Get raw data from the existing hook
    const {
        enableCam,
        webcamRunning,
        videoRef,
        handResult,
        isModelLoaded,
        isGripping,
        gripStrength,
    } = useHandTracking()

    const [cursorPosition, setCursorPosition] = useState<{ x: number, y: number } | null>(null)
    const [isPinching, setIsPinching] = useState(false)

    // Refs for gesture logic
    const lastScrollTime = useRef(0)
    const wasPinching = useRef(false)

    // Cursor Refs
    const cursorRef = useRef<{ x: number; y: number } | null>(null) // Smoothed Position (for logic & render)
    const targetCursorRef = useRef<{ x: number; y: number } | null>(null) // Raw Input Position

    const scrollStartRef = useRef<{ y: number } | null>(null) // Reference for scroll start position

    // Helper: Linear Interpolation
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor

    // 2. Capture Raw Input
    useEffect(() => {
        if (!handResult || !handResult.landmarks || handResult.landmarks.length === 0) {
            targetCursorRef.current = null
            setIsPinching(false)
            return
        }

        const landmarks = handResult.landmarks[0]
        const indexTip = landmarks[8]
        const thumbTip = landmarks[4]

        // --- A. Raw Cursor Position (Index Tip) ---
        // Mirror X because it's a webcam
        const x = (1 - indexTip.x) * window.innerWidth
        const y = indexTip.y * window.innerHeight

        targetCursorRef.current = { x, y }

        // --- B. Pinch Detection (Click) ---
        const dx = indexTip.x - thumbTip.x
        const dy = indexTip.y - thumbTip.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        const PINCH_THRESHOLD = 0.05
        // Strict mutual exclusion: Cannot pinch if gripping (scrolling)
        const currentlyPinching = distance < PINCH_THRESHOLD && !isGripping

        setIsPinching(currentlyPinching)

        // Conflict Resolution: If gripping starts, cancel any pending pinch "release" interpretation
        if (isGripping) {
            wasPinching.current = false
        }

        // Trigger Click on Release
        // Note: We use the *smoothed* cursor position for the click target to match visuals
        if (wasPinching.current && !currentlyPinching) {
            if (cursorRef.current) {
                const element = document.elementFromPoint(cursorRef.current.x, cursorRef.current.y) as HTMLElement
                if (element) {
                    element.click()
                    console.log("Clicked:", element)
                }
            }
        }
        wasPinching.current = currentlyPinching

    }, [handResult, webcamRunning])


    // 3. Animation Loop (Smoothing + Scroll Logic)
    useEffect(() => {
        if (!webcamRunning) return

        let animationFrameId: number

        const updateLoop = () => {
            // --- Smoothing Logic ---
            if (targetCursorRef.current) {
                if (!cursorRef.current) {
                    // Initialize immediately if fresh capture
                    cursorRef.current = { ...targetCursorRef.current }
                } else {
                    // Smooth Interpolation
                    // Factor 0.35 provides faster response while keeping some smoothing
                    const SMOOTHING_FACTOR = 0.35

                    cursorRef.current.x = lerp(cursorRef.current.x, targetCursorRef.current.x, SMOOTHING_FACTOR)
                    cursorRef.current.y = lerp(cursorRef.current.y, targetCursorRef.current.y, SMOOTHING_FACTOR)
                }

                // Update State for Visuals
                setCursorPosition({ ...cursorRef.current })

            } else {
                setCursorPosition(null)
                cursorRef.current = null
            }


            // --- Scroll Logic (Relative / Drag) ---
            if (isGripping && cursorRef.current) {
                // Initialize start point if just started gripping
                if (!scrollStartRef.current) {
                    scrollStartRef.current = { y: cursorRef.current.y }
                }

                const currentY = cursorRef.current.y
                const startY = scrollStartRef.current.y
                const deltaY = currentY - startY

                // Threshold to avoid jitter from small unintentional movements
                const DEADZONE = 20

                if (Math.abs(deltaY) > DEADZONE) {
                    // Speed factor
                    const speed = (deltaY - (Math.sign(deltaY) * DEADZONE)) * 0.25

                    window.scrollBy({ top: speed, behavior: "auto" })
                }
            } else {
                // Reset start ref when not gripping
                scrollStartRef.current = null
            }

            animationFrameId = requestAnimationFrame(updateLoop)
        }

        updateLoop()

        return () => {
            cancelAnimationFrame(animationFrameId)
        }
    }, [webcamRunning, isGripping])


    return (
        <HandContext.Provider value={{
            handResult,
            isGripping,
            gripStrength,
            cursorPosition,
            isPinching,
            enableCam,
            webcamRunning,
            isModelLoaded
        }}>
            {children}

            {/* Hidden Video Element required by MediaPipe */}
            <div className="fixed top-0 left-0 -z-50 opacity-0 pointer-events-none">
                <video
                    ref={videoRef}
                    className="w-1 h-1"
                    autoPlay
                    playsInline
                />
            </div>

            {/* Visual Cursor */}
            {webcamRunning && cursorPosition && (
                <div
                    className="fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out"
                    style={{
                        left: cursorPosition.x,
                        top: cursorPosition.y,
                        transform: `translate(-50%, -50%) scale(${isPinching ? 0.8 : 1})`,
                    }}
                >
                    <div className={`
                        w-6 h-6 rounded-full border-2 
                        ${isGripping ? "bg-red-500/50 border-red-500" : isPinching ? "bg-green-500/50 border-green-500" : "bg-cyan-500/30 border-cyan-400"}
                        shadow-[0_0_10px_rgba(34,211,238,0.5)]
                    `} />
                    {/* Optional: Add a label or icon */}
                    {isGripping && <div className="absolute top-8 left-1/2 -translate-x-1/2 text-xs text-red-400 font-bold tracking-widest uppercase">Scroll</div>}
                </div>
            )}

            {/* Global Activation Button */}
            <div className="fixed bottom-4 right-4 z-[9998]">
                {isModelLoaded && (
                    <button
                        onClick={enableCam}
                        className={`
                        flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 shadow-lg
                        ${webcamRunning
                                ? 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30'
                                : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/30'
                            }
                        backdrop-blur-md
                    `}
                    >
                        <span className={`w-2 h-2 rounded-full ${webcamRunning ? 'bg-red-400 animate-pulse' : 'bg-cyan-400'}`} />
                        {webcamRunning ? 'Disable Hand Control' : 'Enable Hand Control'}
                    </button>
                )}
            </div>
        </HandContext.Provider>
    )
}
