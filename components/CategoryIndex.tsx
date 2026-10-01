import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { CATEGORIES, POSTS_PER_PAGE, type PostMeta } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import Pagination from '@/components/Pagination'

interface Props {
    category: (typeof CATEGORIES)[number]
    posts: PostMeta[]      // posts for this page only
    totalPosts: number
    page: number
    totalPages: number
}

/** Per-category listing, shared by /blog/category/[category] and its /page/[page] routes. */
export default function CategoryIndex({ category: cat, posts, totalPosts, page, totalPages }: Props) {
    const first = (page - 1) * POSTS_PER_PAGE + 1
    const last = first + posts.length - 1

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
                    <p className="text-gray-400">
                        {totalPosts} article{totalPosts !== 1 ? 's' : ''}
                        {totalPages > 1 && <> · Showing {first}–{last} · Page {page} of {totalPages}</>}
                    </p>
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
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${c.slug === cat.slug
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
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map(post => <PostCard key={post.slug} post={post} />)}
                        </div>
                        <Pagination page={page} totalPages={totalPages} basePath={`/blog/category/${cat.slug}`} />
                    </>
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
