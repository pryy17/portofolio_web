"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Download, Rocket, AlertCircle } from "lucide-react"
import ParticleBackground from "@/components/3d/particle-background"
import HolographicAvatar from "@/components/3d/holographic-avatar"
import { isWebGLSupported } from "@/lib/webgl-utils"
import Link from "next/link"
import { VideoText } from "../ui/video-text"

// Custom hook for typing effect
function useTypingEffect(texts: string[], typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentFullText = texts[currentTextIndex]

    const timeout = setTimeout(() => {
      if (isTyping && !isDeleting) {
        // Typing phase
        setCurrentText(currentFullText.slice(0, currentText.length + 1))
        if (currentText.length + 1 === currentFullText.length) {
          setIsTyping(false)
          setTimeout(() => setIsDeleting(true), pauseTime)
        }
      } else if (isDeleting) {
        // Deleting phase
        setCurrentText(currentFullText.slice(0, currentText.length - 1))
        if (currentText.length - 1 === 0) {
          setIsDeleting(false)
          setIsTyping(true)
          setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [currentText, currentTextIndex, isTyping, isDeleting, texts, typingSpeed, deletingSpeed, pauseTime])

  return currentText
}

export default function HeroSection() {
  const [webglSupported, setWebglSupported] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Array of subtitle texts for typing effect
  const subtitleTexts = [
    "hello",
    "Inventing tomorrow's web, one line of code at a time.",
    "Crafting the future of the web with modern technologies.",
    "Building scalable solutions for the digital age.",
    "Transforming ideas into interactive experiences.",
    "Pushing the boundaries of web development.",
    "Creating immersive digital worlds.",
  ]

  const typedText = useTypingEffect(subtitleTexts, 80, 40, 2500)

  useEffect(() => {
    setMounted(true)
    setWebglSupported(isWebGLSupported())
  }, [])
  const customCss = `
    /* This is the key to the seamless animation.
      The @property rule tells the browser that '--angle' is a custom property
      of type <angle>. This allows the browser to smoothly interpolate it
      during animations, preventing the "jump" at the end of the loop.
    */
    @property --angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }

    /* The keyframe animation simply transitions the --angle property
      from its start (0deg) to its end (360deg).
    */
    @keyframes shimmer-spin {
      to {
        --angle: 360deg;
      }
    }
  `;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image and 3D Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/bg-1.jpg)' }}
        />
        {/* Gradient overlay for blending with next section */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/100" />
        <ParticleBackground />
      </div>

      {/* WebGL Warning */}
      {mounted && !webglSupported && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-4 right-4 z-20"
        >
          <div className="glass-morphism border-yellow-400/50 rounded-lg p-3 max-w-md mx-auto">
            <div className="flex items-center gap-2 text-yellow-400">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">3D features unavailable - displaying in 2D mode</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          {/* Holographic Avatar */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-8"
          >
            <HolographicAvatar />
          </motion.div>

          {/* Name with Liquid Gradient */}
          {/* <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-6xl md:text-8xl font-bold mb-6 liquid-gradient font-sora"
          >
            Priandy <br /> Dwi Handika
          </motion.h1> */}
          <div className="relative h-[12.3rem]">
            <div className="absolute -inset-[22rem] flex items-center h-[800px] justify-center z-0">
              <div className="w-full h-1/2">
                <VideoText
                  src="https://ls29t3z55w.ufs.sh/f/JEKFIJDsOBct0vrmLYJRG8BKHmvZQkWJ9ElIVcNfzPg63Mbo"
                  fontFamily="font-sora, Helvetica, Arial, sans-serif"
                  fontSize={6}
                  letterSpacing="0.001em"
                  textTransform="uppercase"
                  sources={[
                    { src: "fallback.webm", type: "video/webm" },
                    { src: "fallback.ogv", type: "video/ogg" }
                  ]}
                  onVideoLoad={() => console.log('Video loaded successfully')}
                  onVideoError={(error) => console.error('Video error:', error)}
                >
                  PRIANDY. <br /> DWI HANDIKA
                </VideoText>
              </div>
            </div>
          </div>
          {/* Subheading with Typing Effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mb-5"
          >
            <p className="text-xl md:text-2xl text-white/80 font-light min-h-[1rem] flex items-center justify-center">
              {typedText}
              <span className="animate-pulse text-cyan-400 ml-1">|</span>
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="glass-morphism hover:animate-glow text-white border-cyan-400 hover:border-cyan-300 px-8 py-4 text-lg bg-transparent"
              variant="outline"
            >
              <div
                className="absolute inset-0 "
                style={{
                  background: 'conic-gradient(from var(--angle), transparent 25%, #06b6d4, transparent 50%)',
                  animation: 'shimmer-spin 2.5s linear infinite',
                }}
              />
              <span className="relative z-10 inline-flex items-center justify-center w-full h-full text-gray-900 dark:text-white rounded-full group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-colors duration-300">
                <Link href={"https://github.com/pryy17"} target="_blank" >
                  🚀 Explore My Universe
                </Link>
              </span>

            </Button>
            <style>{customCss}</style>
            <a href="/resume.pdf" download>
              <Button
                size="lg"
                className="glass-morphism hover:animate-glow text-white border-purple-400 hover:border-purple-300 px-8 py-4 text-lg bg-transparent"
                variant="outline"
              >
                <Download className="mr-2 h-5 w-5" />📄 Download Resume

              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}
