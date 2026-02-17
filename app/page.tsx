import { AgencyNavbar } from "@/components/agency/agency-navbar"
import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import ProjectsSection from "@/components/sections/projects-section"
import SkillsSection from "@/components/sections/skills-section"
import BlogSection from "@/components/sections/blog-section"
import ContactSection from "@/components/sections/contact-section"
import OpeningSection from "@/components/sections/opening-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <OpeningSection />
      <AgencyNavbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      {/* <BlogSection /> */}
      <ContactSection />
    </main>
  )
}
