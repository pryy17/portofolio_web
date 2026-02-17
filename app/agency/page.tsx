import { AgencyFeatured } from "@/components/agency/agency-featured"
import { AgencyFooter } from "@/components/agency/agency-footer"
import { AgencyHero } from "@/components/agency/agency-hero"
import { AgencyNavbar } from "@/components/agency/agency-navbar"
import { AgencyServices } from "@/components/agency/agency-services"
import { AgencyStats } from "@/components/agency/agency-stats"
import { AgencyTestimonials } from "@/components/agency/agency-testimonials"

export default function AgencyPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            <AgencyNavbar />
            <AgencyHero />
            <AgencyServices />
            <AgencyFeatured />
            <AgencyStats />
            <AgencyTestimonials />
            <AgencyFooter />
        </main>
    )
}
