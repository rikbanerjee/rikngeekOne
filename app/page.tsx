'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Blog from '@/components/Blog'
// import Research from '@/components/Research'
import STEMEducation from '@/components/STEMEducation'
import Resume from '@/components/Resume'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navigation />
      <Hero />
      <Projects />
      <Blog />
      {/* <Research /> */}
      <STEMEducation />
      <Resume />
      <Footer />
    </main>
  )
}

