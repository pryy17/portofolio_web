"use client"

import { useEffect, useRef, useState } from "react"
import { FilesetResolver, HandLandmarker, type HandLandmarkerResult } from "@mediapipe/tasks-vision"

export function useHandTracking() {
    const [handLandmarker, setHandLandmarker] = useState<HandLandmarker | null>(null)
    const [webcamRunning, setWebcamRunning] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [handResult, setHandResult] = useState<HandLandmarkerResult | null>(null)
    const requestRef = useRef<number>(null)

    useEffect(() => {
        const createHandLandmarker = async () => {
            const vision = await FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
            )
            const handLandmarker = await HandLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
                    delegate: "GPU",
                },
                runningMode: "VIDEO",
                numHands: 2,
            })
            setHandLandmarker(handLandmarker)
        }

        createHandLandmarker()
    }, [])

    const enableCam = async () => {
        if (!handLandmarker) {
            console.log("Wait! objectDetector not loaded yet.")
            return
        }

        if (webcamRunning) {
            setWebcamRunning(false)
            return
        }

        setWebcamRunning(true)

        const constraints = {
            video: true,
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia(constraints)
            if (videoRef.current) {
                videoRef.current.srcObject = stream
                videoRef.current.addEventListener("loadeddata", predictWebcam)
            }
        } catch (error) {
            console.error("Error accessing webcam:", error)
            setWebcamRunning(false)
        }
    }

    const predictWebcam = () => {
        if (videoRef.current && handLandmarker) {
            // Only detect when video has enough data
            if (videoRef.current.videoWidth > 0 && videoRef.current.videoHeight > 0) {
                const startTimeMs = performance.now()
                const result = handLandmarker.detectForVideo(videoRef.current, startTimeMs)
                setHandResult(result)
            }
            requestRef.current = requestAnimationFrame(predictWebcam)
        }
    }

    // Cleanup
    useEffect(() => {
        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current)
            }
        }
    }, [])

    // Detect Fist Gesture (with strength 0-1)
    const { isGripping, gripStrength } = handResult?.landmarks && handResult.landmarks.length > 0
        ? (() => {
            const landmarks = handResult.landmarks[0]
            const wrist = landmarks[0]
            const tips = [8, 12, 16, 20].map(i => landmarks[i])

            // Calculate average distance from fingertips to wrist
            const avgDistance = tips.reduce((acc, tip) => {
                const dx = tip.x - wrist.x
                const dy = tip.y - wrist.y
                const dz = tip.z - wrist.z
                return acc + Math.sqrt(dx * dx + dy * dy + dz * dz)
            }, 0) / 4

            // Distance thresholds
            // 0.4+ is fully open (Strength 0)
            // 0.2 or less is fully closed (Strength 1)
            const MAX_DIST = 0.45
            const MIN_DIST = 0.2

            // Calculate normalized strength
            const strength = Math.max(0, Math.min(1, 1 - (avgDistance - MIN_DIST) / (MAX_DIST - MIN_DIST)))

            return {
                isGripping: strength > 0.92,
                gripStrength: strength
            }
        })()
        : { isGripping: false, gripStrength: 0 }

    return {
        enableCam,
        webcamRunning,
        videoRef,
        handResult,
        isModelLoaded: !!handLandmarker,
        isGripping,
        gripStrength // Return the normalized 0-1 value
    }
}
