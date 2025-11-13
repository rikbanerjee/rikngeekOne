'use client'

import { motion } from 'framer-motion'
import { FileText, ExternalLink, Users, Award } from 'lucide-react'

const researchPapers = [
  {
    title: 'Efficient Transformer Architectures for Low-Resource NLP',
    authors: 'R. Banerjee, et al.',
    venue: 'NeurIPS 2024',
    abstract: 'Novel approach to reduce computational complexity in transformer models while maintaining performance.',
    citations: 45,
    link: '#',
    tags: ['NLP', 'Transformers', 'Efficiency'],
  },
  {
    title: 'Federated Learning in Healthcare: Privacy-Preserving Medical Diagnosis',
    authors: 'R. Banerjee, A. Smith, J. Chen',
    venue: 'ICML 2024',
    abstract: 'Framework for collaborative machine learning across medical institutions without sharing sensitive data.',
    citations: 32,
    link: '#',
    tags: ['Federated Learning', 'Healthcare', 'Privacy'],
  },
  {
    title: 'Meta-Learning for Rapid Model Adaptation in Dynamic Environments',
    authors: 'R. Banerjee, M. Johnson',
    venue: 'ICLR 2024',
    abstract: 'Meta-learning techniques enabling models to quickly adapt to new tasks with minimal training samples.',
    citations: 28,
    link: '#',
    tags: ['Meta-Learning', 'Few-Shot Learning', 'Adaptation'],
  },
]

export default function Research() {
  return (
    <section id="research" className="py-20 px-4 sm:px-6 lg:px-8 relative">
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
            <Award className="w-4 h-4 text-primary-400" />
            <span className="text-sm text-gray-300">Publications</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">Research </span>
            <span className="gradient-text">Articles</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Contributing to the advancement of AI through peer-reviewed research
          </p>
        </motion.div>

        {/* Research Papers */}
        <div className="space-y-6">
          {researchPapers.map((paper, index) => (
            <motion.div
              key={paper.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-effect rounded-2xl p-6 transition-all duration-500 group relative z-10"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  {/* Paper Icon & Title */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary-400 transition-colors duration-300">
                        {paper.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{paper.authors}</span>
                      </div>
                    </div>
                  </div>

                  {/* Abstract */}
                  <p className="text-gray-400 mb-4 ml-11">{paper.abstract}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 ml-11">
                    {paper.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full bg-slate-800 text-gray-300 border border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metadata & Actions */}
                <div className="lg:w-48 flex flex-row lg:flex-col gap-4 lg:items-end">
                  <div className="text-center lg:text-right">
                    <div className="text-2xl font-bold text-primary-400">{paper.citations}</div>
                    <div className="text-sm text-gray-500">Citations</div>
                    <div className="mt-2 px-3 py-1 rounded-full bg-slate-800 text-xs text-gray-300 inline-block">
                      {paper.venue}
                    </div>
                  </div>
                  <a
                    href={paper.link}
                    className="flex items-center gap-2 px-4 py-2 glass-effect rounded-lg hover:bg-white/10 text-primary-400 hover:text-primary-300 transition-all duration-300 whitespace-nowrap"
                  >
                    <span className="text-sm font-medium">View Paper</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Publications', value: '12+' },
            { label: 'Citations', value: '105+' },
            { label: 'H-Index', value: '8' },
            { label: 'Conferences', value: '6+' },
          ].map((stat, index) => (
            <div key={stat.label} className="glass-effect rounded-xl p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

