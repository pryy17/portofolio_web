import HandParticleBackground from "@/components/3d/hand-particle-background"

export default function HandDemoPage() {
    return (
        <main className="relative min-h-screen w-full bg-black overflow-hidden">
            <div className="absolute inset-0 z-0">
                <HandParticleBackground />
            </div>
        </main>
    )
}
