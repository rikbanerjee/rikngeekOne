import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts, CATEGORIES } from '@/lib/posts'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Blog — Rik Banerjee | AI, Retail IT & Tech Insights',
    description: 'Technical articles on AI, Retail IT, Enterprise trends, and STEM education by Rik Banerjee.',
}

export default function BlogPage() {
    const posts = getAllPosts()

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
                        Blog &amp; <span className="gradient-text">Articles</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Thoughts on AI, retail technology, enterprise trends, and STEM education.
                    </p>
                </div>

                {/* Category filter */}
                <div className="flex flex-wrap gap-3 justify-center mb-12">
                    <Link
                        href="/blog"
                        className="px-4 py-2 rounded-full glass-effect text-white text-sm font-medium hover:bg-primary-600 transition-all duration-300"
                    >
                        All Posts
                    </Link>
                    {CATEGORIES.map(cat => (
                        <Link
                            key={cat.slug}
                            href={`/blog/category/${cat.slug}`}
                            className="px-4 py-2 rounded-full glass-effect text-gray-300 text-sm font-medium hover:text-white hover:bg-slate-700 transition-all duration-300"
                        >
                            {cat.label}
                        </Link>
                    ))}
                </div>

                {/* Posts grid */}
                {posts.length === 0 ? (
                    <p className="text-center text-gray-400 py-20">No posts yet. Run <code className="bg-slate-800 px-2 py-1 rounded">npm run post</code> to publish one.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map(post => (
                            <article
                                key={post.slug}
                                className="glass-effect rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all duration-500"
                            >
                                {/* Cover image */}
                                <div className="relative h-52 bg-gradient-to-br from-slate-800 to-slate-700 overflow-hidden">
                                    {post.image ? (
                                        post.image.startsWith('/') || post.image.startsWith('http') ? (
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : null
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/30 to-accent-600/30" />
                                    )}
                                    {/* Category badge */}
                                    <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${post.categoryColor} bg-opacity-90`}>
                                        {post.category}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" />
                                            {post.readTime}
                                        </span>
                                    </div>

                                    <h2 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors duration-300">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                                    {/* Tags */}
                                    {post.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {post.tags.slice(0, 3).map(tag => (
                                                <span key={tag} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 text-gray-400 text-xs">
                                                    <Tag className="w-2.5 h-2.5" />{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="flex items-center gap-2 text-primary-400 hover:text-primary-300 text-sm font-medium transition-all duration-300 group-hover:gap-3"
                                    >
                                        Read article <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                {/* Back home */}
                <div className="text-center mt-16">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg glass-effect text-gray-300 hover:text-white hover:bg-slate-700 transition-all duration-300"
                    >
                        ← Back to rikngeek.com
                    </Link>
                </div>
            </div>
        </main>
    )
}
