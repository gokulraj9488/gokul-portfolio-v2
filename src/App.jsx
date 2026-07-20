import { motion, AnimatePresence } from 'framer-motion'
import SmoothScroll from './components/providers/SmoothScroll.jsx'
import AtmosphereBackground from './components/atmosphere/AtmosphereBackground.jsx'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import Home from './pages/Home.jsx'
import BroksForge from './pages/BroksForge.jsx'
import NotFound from './pages/NotFound.jsx'
import CommandPalette from './components/workshop/CommandPalette.jsx'
import RecruiterMode from './components/workshop/RecruiterMode.jsx'
import DevOverlay from './components/workshop/DevOverlay.jsx'
import TerminalDock from './components/workshop/TerminalDock.jsx'
import NyanCat from './components/workshop/NyanCat.jsx'
import MouseLight from './components/workshop/MouseLight.jsx'
import GarageDrawer from './components/workshop/GarageDrawer.jsx'
import IdleHint from './components/workshop/IdleHint.jsx'
import BikeRail from './components/ui/BikeRail.jsx'
import { RouterProvider, useRouter } from './lib/router.jsx'
import { WorkshopProvider } from './lib/workshop.jsx'
import { easePremium } from './lib/motion.js'

const PAGES = { '/': Home, '/broksforge': BroksForge }

// The GT650 rides the home page only — the product page keeps its own rhythm.
function HomeRail() {
  const { path } = useRouter()
  if (path !== '/') return null
  return <BikeRail />
}

function Routes() {
  const { path } = useRouter()
  const Page = PAGES[path] ?? NotFound
  return (
    <main id="main">
      {/* Route transition: a short fade-lift. initial={false} keeps first paint
          (and the prerendered HTML) free of animation styles. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={path}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: easePremium }}
        >
          <Page />
        </motion.div>
      </AnimatePresence>
    </main>
  )
}

// initialPath is provided by the build-time prerender (entry-server); in the
// browser the router reads window.location instead.
export default function App({ initialPath }) {
  return (
    <RouterProvider initialPath={initialPath}>
      <WorkshopProvider>
        <SmoothScroll>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <AtmosphereBackground />
          <Navbar />
          <Routes />
          <Footer />
        </SmoothScroll>
        {/* the play layer — all client-only, all discoverable */}
        <HomeRail />
        <CommandPalette />
        <RecruiterMode />
        <DevOverlay />
        <TerminalDock />
        <NyanCat />
        <MouseLight />
        <GarageDrawer />
        <IdleHint />
      </WorkshopProvider>
    </RouterProvider>
  )
}
