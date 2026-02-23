import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostsByCategory, CATEGORIES } from '@/lib/posts'
import { Calendar, Clock, ArrowRight, ArrowLeft, Tag } from 'lucide-react'
import type { Metadata } from 'next'

interface Props { params: Promise<{ category: string }> }

export async function generateStaticParams() {
    return CATEGORIES.map(c => ({ category: c.slug }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params
    const cat = CATEGORIES.find(c => c.slug === params.category)
    if (!cat) return { title: 'Category Not Found' }
    return {
        title: `${cat.label} — Rik Banerjee Blog`,
        description: `Articles about ${cat.label} by Rik Banerjee`,
    }
}

export default async function CategoryPage(props: Props) {
    const params = await props.params
    const cat = CATEGORIES.find(c => c.slug === params.category)
    if (!cat) notFound()

    const posts = getPostsByCategory(params.category)

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${cat.color}`}>
                        {cat.label}
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
                        {cat.label}
                    </h1>
                    <p className="text-gray-400">{posts.length} article{posts.length !== 1 ? 's' : ''}</p>
                </div>

                {/* Category pills */}
                <div className="flex flex-wrap gap-3 justify-center mb-12">
                    <Link href="/blog" className="px-4 py-2 rounded-full glass-effect text-gray-300 text-sm font-medium hover:text-white transition-all duration-300">
                        All Posts
                    </Link>
                    {CATEGORIES.map(c => (
                        <Link
                            key={c.slug}
                            href={`/blog/category/${c.slug}`}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${c.slug === params.category
                                ? 'bg-primary-600 text-white'
                                : 'glass-effect text-gray-300 hover:text-white hover:bg-slate-700'
                                }`}
                        >
                            {c.label}
                        </Link>
                    ))}
                </div>

                {/* Posts */}
                {posts.length === 0 ? (
                    <p className="text-center text-gray-400 py-20">No posts in this category yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map(post => (
                            <article
                                key={post.slug}
                                className="glass-effect rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all duration-500"
                            >
                                <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-700 overflow-hidden">
                                    {post.image && (
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    )}
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />
                                            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                                    </div>
                                    <h2 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors duration-300">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                                    {post.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {post.tags.slice(0, 3).map(tag => (
                                                <span key={tag} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 text-gray-400 text-xs">
                                                    <Tag className="w-2.5 h-2.5" />{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <Link href={`/blog/${post.slug}`} className="flex items-center gap-2 text-primary-400 hover:text-primary-300 text-sm font-medium transition-all duration-300 group-hover:gap-3">
                                        Read article <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                <div className="text-center mt-16">
                    <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg glass-effect text-gray-300 hover:text-white transition-all duration-300">
                        <ArrowLeft className="w-4 h-4" /> All Articles
                    </Link>
                </div>
            </div>
        </main>
    )
}
