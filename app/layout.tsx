import type React from "react"
import type { Metadata } from "next"
import { Inter, Sora } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import SmoothScrollProvider from "@/components/smooth-scroll"
import { HandProvider } from "@/components/providers/hand-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" })

export const metadata: Metadata = {
  title: "Priandy Dwi Handika - Creative Technologist",
  description: "Inventing tomorrow's web, one line of code at a time.",
  keywords: ["developer", "portfolio", "full-stack", "creative technologist"],
  authors: [{ name: "Priandy Dwi Handika" }],
  openGraph: {
    title: "Priandy Dwi Handika - Creative Technologist",
    description: "Inventing tomorrow's web, one line of code at a time.",
    type: "website",
  },
  generator: 'senotron'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SmoothScrollProvider>
            <HandProvider>
              {children}
            </HandProvider>
            <Toaster />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
