'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, BookOpen, Tag } from 'lucide-react'
import Link from 'next/link'

// Homepage blog section shows latest 3 posts fetched at build time via a data prop.
// The actual data is passed from the server component in page.tsx.
interface PostMeta {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  categoryColor: string
  image: string
  tags: string[]
}

interface Props {
  posts: PostMeta[]
}

export default function Blog({ posts }: Props) {
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
            <span className="text-white">Blog &amp; </span>
            <span className="gradient-text">Articles</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Thoughts on AI, technology, and the future of innovation
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-effect rounded-2xl overflow-hidden transition-all duration-500 group relative z-10"
            >
              {/* Cover image */}
              <div className="h-48 relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-700">
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-600/30 to-accent-600/30" />
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <span className={`px-3 py-1 rounded-full bg-slate-800 text-primary-400 border border-slate-700 text-xs`}>
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-3 text-sm">{post.excerpt}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors duration-300 group-hover:gap-3"
                  >
                    <span className="text-sm font-medium">Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
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
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/50"
          >
            View All Posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
