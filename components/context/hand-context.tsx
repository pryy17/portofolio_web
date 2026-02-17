"use client"

import { createContext, useContext } from "react"
import type { HandLandmarkerResult } from "@mediapipe/tasks-vision"

export interface HandContextType {
    handResult: HandLandmarkerResult | null
    isGripping: boolean
    gripStrength: number
    cursorPosition: { x: number; y: number } | null
    isPinching: boolean // For click
    enableCam: () => Promise<void>
    webcamRunning: boolean
    isModelLoaded: boolean
}

export const HandContext = createContext<HandContextType | undefined>(undefined)

export function useHandContext() {
    const context = useContext(HandContext)
    if (context === undefined) {
        throw new Error("useHandContext must be used within a HandProvider")
    }
    return context
}
