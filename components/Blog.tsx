'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react'

const blogPosts = [
  {
    title: 'Retail Innovation Hub: AI, POS & Digital Transformation',
    excerpt: 'Linked In Group:Explore the latest trends in retail technology and how AI is transforming the industry.',
    date: '2025-11-08',
    readTime: '5 min reads',
    category: 'Retail Technology',
    image: 'gradient-1',
    link: 'https://www.linkedin.com/groups/13186555/',
  },
  {
    title: 'Building POS Modernization -Scale up Legacy Hardware with Bespoke Solutions',
    excerpt: 'Best practices for deploying machine learning models at scale with reliability and performance.',
    date: '2026-01-17',
    readTime: '5 min reads',
    category: 'Retail Technology',
    image: 'gradient-2',
    link: '#',
  },
]

export default function Blog() {
  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 relative">
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
            <BookOpen className="w-4 h-4 text-primary-400" />
            <span className="text-sm text-gray-300">Latest Insights</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">Blog & </span>
            <span className="gradient-text">Articles</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Thoughts on AI, technology, and the future of innovation
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-effect rounded-2xl overflow-hidden transition-all duration-500 group relative z-10"
            >
              {/* Image Placeholder */}
              <div className={`h-48 bg-gradient-to-br ${
                post.image === 'gradient-1' ? 'from-blue-500 to-purple-600' :
                post.image === 'gradient-2' ? 'from-emerald-500 to-cyan-600' :
                'from-pink-500 to-violet-600'
              } relative`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <span className="px-3 py-1 rounded-full bg-slate-800 text-primary-400 border border-slate-700">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors duration-300 group-hover:gap-3"
                  >
                    <span className="text-sm font-medium">Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Posts CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/50"
          >
            View All Posts
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

