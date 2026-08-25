import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import StickyCTA from './components/StickyCTA'
import FloatingCall from './components/FloatingCall'
import Home from './pages/Home'
import Services from './pages/Services'
import AreasIndex from './pages/AreasIndex'
import AreaPage from './pages/AreaPage'
import About from './pages/About'
import Contact from './pages/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/areas" element={<AreasIndex />} />
            <Route path="/areas/:slug" element={<AreaPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <StickyCTA />
        <FloatingCall />
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
