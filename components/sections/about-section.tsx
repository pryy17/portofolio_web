"use client"
import { motion } from "framer-motion"
import InteractiveTimeline from "@/components/interactive-timeline"
import LiveGitHubWidget from "@/components/widgets/live-github-widget"
import CurrentlyLearningWidget from "@/components/widgets/currently-learning-widget"
import { AgencyPromoCard } from "@/components/agency/agency-promo-card"

export default function AboutSection() {
  return (
    <section id="about" className="py-20 relative">
      <div className="containermx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left mb-16 container px-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 liquid-gradient font-sora">About Me</h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                I’m a Web Developer who bridges design and development, crafting modern,
                scalable digital experiences that push the boundaries of the web
              </p>
            </div>
            <div>
              <AgencyPromoCard />
            </div>
          </div>
        </motion.div>

        {/* Interactive Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-16"
        >
          <InteractiveTimeline />
        </motion.div>

        {/* Dynamic Widgets */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <AgencyPromoCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className=""
          >
            <CurrentlyLearningWidget />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
