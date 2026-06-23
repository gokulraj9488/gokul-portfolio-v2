import SmoothScroll from './components/providers/SmoothScroll.jsx'
import AtmosphereBackground from './components/atmosphere/AtmosphereBackground.jsx'
import CustomCursor from './components/ui/CustomCursor.jsx'
import JourneyRail from './components/ui/JourneyRail.jsx'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import Hero from './components/sections/Hero.jsx'
import FeaturedProduct from './components/sections/FeaturedProduct.jsx'
import BuildingSystems from './components/sections/BuildingSystems.jsx'
import EngineeringCapabilities from './components/sections/EngineeringCapabilities.jsx'
import ExperienceTimeline from './components/sections/ExperienceTimeline.jsx'
import SelectedProjects from './components/sections/SelectedProjects.jsx'
import Certifications from './components/sections/Certifications.jsx'
import Contact from './components/sections/Contact.jsx'

export default function App() {
  return (
    <SmoothScroll>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <AtmosphereBackground />
      <CustomCursor />
      <JourneyRail />
      <Navbar />
      <main id="main">
        {/* Proof before philosophy: Hero -> live product -> earned framework -> the rest. */}
        <Hero />
        <FeaturedProduct />
        <BuildingSystems />
        <EngineeringCapabilities />
        <ExperienceTimeline />
        <SelectedProjects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
