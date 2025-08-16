import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import PageTransition from './components/PageTransition.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import News from './pages/News.jsx'
import Gallery from './pages/Gallery.jsx'
import Contact from './pages/Contact.jsx'
import Apply from './pages/Apply.jsx'      // ← НОВОЕ

export default function App() {
   const location = useLocation()
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <ScrollToTop />
      <AnimatePresence mode="wait">
       <PageTransition key={location.pathname}>
         <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/apply" element={<Apply />} />
          </Routes>
        </PageTransition>
      </AnimatePresence>
      <Footer />
    </div>
  )
}