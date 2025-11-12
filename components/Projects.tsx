'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Brain, TrendingUp, Zap, Bot } from 'lucide-react'

const projects = [
  {
    title: 'Quant Alpha AI',
    description: 'Advanced quantitative trading algorithms powered by machine learning for alpha generation and portfolio optimization.',
    tags: ['Machine Learning', 'Finance', 'Trading', 'Python'],
    icon: TrendingUp,
    color: 'from-blue-500 to-cyan-500',
    demoLink: '#',
    githubLink: '#',
    featured: true,
  },
  {
    title: 'Neural Architecture Search',
    description: 'Automated ML system that discovers optimal neural network architectures for specific tasks using reinforcement learning.',
    tags: ['AutoML', 'Deep Learning', 'PyTorch', 'Research'],
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
    demoLink: '#',
    githubLink: '#',
    featured: true,
  },
  {
    title: 'Real-time AI Agent Platform',
    description: 'Build and deploy autonomous AI agents that can perform complex tasks with natural language understanding.',
    tags: ['LLM', 'Agents', 'NLP', 'TypeScript'],
    icon: Bot,
    color: 'from-emerald-500 to-teal-500',
    demoLink: '#',
    githubLink: '#',
    featured: false,
  },
  {
    title: 'Edge AI Framework',
    description: 'Lightweight ML inference framework optimized for edge devices with sub-10ms latency.',
    tags: ['Edge Computing', 'TensorFlow Lite', 'C++', 'IoT'],
    icon: Zap,
    color: 'from-amber-500 to-red-500',
    demoLink: '#',
    githubLink: '#',
    featured: false,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">AI Projects</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Cutting-edge AI solutions pushing the boundaries of what's possible
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`relative group ${project.featured ? 'md:col-span-1' : ''}`}
            >
              {/* Card */}
              <div className="h-full glass-effect rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 border-2 border-transparent hover:border-primary-500/30">
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full text-xs font-semibold">
                    Featured
                  </div>
                )}

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${project.color} p-3 mb-4`}>
                  <project.icon className="w-full h-full text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full bg-slate-800 text-gray-300 border border-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <a
                    href={project.demoLink}
                    className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors duration-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm font-medium">Live Demo</span>
                  </a>
                  <a
                    href={project.githubLink}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <Github className="w-4 h-4" />
                    <span className="text-sm font-medium">Code</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 glass-effect rounded-lg hover:bg-white/10 text-white transition-all duration-300"
          >
            View All Projects
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

