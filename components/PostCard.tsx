import Link from 'next/link'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import type { PostMeta } from '@/lib/posts'
import SwatchCover from '@/components/SwatchCover'

export default function PostCard({ post }: { post: PostMeta }) {
    return (
        <article className="glass-effect rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all duration-500">
            {/* Cover image */}
            <div className="relative h-52 bg-gradient-to-br from-slate-800 to-slate-700 overflow-hidden">
                {post.image && (post.image.startsWith('/') || post.image.startsWith('http')) ? (
                    <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <SwatchCover seed={post.slug} className="group-hover:scale-105 transition-transform duration-500" />
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

                {post.externalLink ? (
                    <a
                        href={post.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary-400 hover:text-primary-300 text-sm font-medium transition-all duration-300 group-hover:gap-3"
                    >
                        Read on Substack <ArrowRight className="w-4 h-4" />
                    </a>
                ) : (
                    <Link
                        href={`/blog/${post.slug}`}
                        className="flex items-center gap-2 text-primary-400 hover:text-primary-300 text-sm font-medium transition-all duration-300 group-hover:gap-3"
                    >
                        Read article <ArrowRight className="w-4 h-4" />
                    </Link>
                )}
            </div>
        </article>
    )
}
