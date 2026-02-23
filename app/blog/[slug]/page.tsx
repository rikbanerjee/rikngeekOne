import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPostSlugs, getPost } from '@/lib/posts'
import { Calendar, Clock, Tag, ArrowLeft, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
    return getAllPostSlugs().map(slug => ({ slug }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params
    const post = await getPost(params.slug)
    if (!post) return { title: 'Post Not Found' }
    return {
        title: `${post.title} — Rik Banerjee`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: post.image ? [post.image] : [],
            type: 'article',
        },
    }
}

export default async function PostPage(props: Props) {
    const params = await props.params
    const post = await getPost(params.slug)
    if (!post) notFound()

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-16">

            {/* Hero / Cover image */}
            <div className="relative w-full h-72 sm:h-96 mb-0 overflow-hidden">
                {post.image ? (
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-900/60 to-accent-900/60" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative">

                {/* Back link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors duration-300"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Blog
                </Link>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${post.categoryColor}`}>
                        {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-400">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-400">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                    </span>
                    <span className="text-sm text-gray-400">by {post.author}</span>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                    {post.title}
                </h1>

                {/* Tags */}
                {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-10">
                        {post.tags.map(tag => (
                            <span key={tag} className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-800 text-gray-400 text-xs">
                                <Tag className="w-3 h-3" />{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Article content */}
                <article
                    className="prose prose-invert prose-lg max-w-none
            prose-headings:text-white prose-headings:font-bold
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-primary-400 prose-a:no-underline hover:prose-a:text-primary-300
            prose-strong:text-white
            prose-code:text-emerald-400 prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-gray-900 prose-pre:rounded-xl prose-pre:border prose-pre:border-slate-700
            prose-blockquote:border-primary-500 prose-blockquote:bg-slate-800/50 prose-blockquote:rounded-r-lg prose-blockquote:text-gray-300
            prose-ul:text-gray-300 prose-ol:text-gray-300
            prose-hr:border-slate-700
            prose-img:rounded-xl prose-img:my-8"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Divider */}
                <hr className="border-slate-700 my-12" />

                {/* Footer nav */}
                <div className="flex justify-between items-center">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg glass-effect text-gray-300 hover:text-white transition-all duration-300"
                    >
                        <ArrowLeft className="w-4 h-4" /> All Articles
                    </Link>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg glass-effect text-gray-300 hover:text-white transition-all duration-300"
                    >
                        rikngeek.com <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </main>
    )
}
