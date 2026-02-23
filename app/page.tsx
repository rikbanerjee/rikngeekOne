import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Blog from '@/components/Blog'
import STEMEducation from '@/components/STEMEducation'
import Resume from '@/components/Resume'
import Footer from '@/components/Footer'
import { getAllPosts } from '@/lib/posts'

export default function Home() {
  // Fetch the 3 most recent posts at build time to show in the homepage Blog section
  const latestPosts = getAllPosts().slice(0, 3)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navigation />
      <Hero />
      <Projects />
      <Blog posts={latestPosts} />
      {/* <Research /> */}
      <STEMEducation />
      <Resume />
      <Footer />
    </main>
  )
}
