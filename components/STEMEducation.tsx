'use client'

import { motion } from 'framer-motion'
import { Rocket, Beaker, Code, Lightbulb, GraduationCap, Play } from 'lucide-react'

const stemResources = [
  {
    title: 'AI for Kids: Introduction to Machine Learning',
    description: 'Interactive course teaching children the basics of AI through fun, hands-on projects.',
    icon: Rocket,
    level: 'Beginner',
    ageGroup: '8-12 years',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Build Your First Robot',
    description: 'Step-by-step guide to creating a simple robot using Arduino and basic sensors.',
    icon: Beaker,
    level: 'Intermediate',
    ageGroup: '10-14 years',
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Coding Adventures: Python for Young Minds',
    description: 'Learn programming fundamentals through game development and creative projects.',
    icon: Code,
    level: 'Beginner',
    ageGroup: '7-11 years',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'Science Experiments at Home',
    description: 'Collection of safe and exciting science experiments using household items.',
    icon: Lightbulb,
    level: 'All Levels',
    ageGroup: '6-14 years',
    color: 'from-amber-500 to-orange-500',
  },
]

export default function STEMEducation() {
  return (
    <section id="stem" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-4">
            <GraduationCap className="w-4 h-4 text-primary-400" />
            <span className="text-sm text-gray-300">Education & Learning</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">STEM </span>
            <span className="gradient-text">Education</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Inspiring the next generation of innovators through hands-on learning
          </p>
        </motion.div>

        {/* STEM Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {stemResources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-effect rounded-2xl p-6 transition-all duration-500 group relative z-10"
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${resource.color} p-3 mb-4`}>
                <resource.icon className="w-full h-full text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors duration-300">
                {resource.title}
              </h3>
              <p className="text-gray-400 mb-4">{resource.description}</p>

              {/* Metadata */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 text-xs rounded-full bg-slate-800 text-gray-300 border border-slate-700">
                  {resource.level}
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-slate-800 text-gray-300 border border-slate-700">
                  {resource.ageGroup}
                </span>
              </div>

              {/* CTA */}
              <button className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors duration-300">
                <Play className="w-4 h-4" />
                <span className="text-sm font-medium">Start Learning</span>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-effect rounded-2xl p-8 text-center relative z-10"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Empowering Young Minds
            </h3>
            <p className="text-gray-400 mb-6">
              I believe every child should have access to quality STEM education. Through engaging content,
              interactive projects, and accessible resources, I&apos;m working to make science and technology
              education fun, inclusive, and inspiring for learners of all backgrounds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/50"
              >
                Explore Resources
              </a>
              <a
                href="#"
                className="px-6 py-3 glass-effect hover:bg-white/10 text-white rounded-lg font-semibold transition-all duration-300"
              >
                Get Involved
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

