import Link from 'next/link'
import { CATEGORIES, POSTS_PER_PAGE, type PostMeta } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import Pagination from '@/components/Pagination'

interface Props {
    posts: PostMeta[]      // posts for this page only
    totalPosts: number
    page: number
    totalPages: number
}

/** All-posts listing, shared by /blog (page 1) and /blog/page/[page]. */
export default function BlogIndex({ posts, totalPosts, page, totalPages }: Props) {
    const first = (page - 1) * POSTS_PER_PAGE + 1
    const last = first + posts.length - 1

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
                    <>
                        {totalPages > 1 && (
                            <p className="text-center text-sm text-gray-500 mb-8">
                                Showing {first}–{last} of {totalPosts} articles · Page {page} of {totalPages}
                            </p>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map(post => <PostCard key={post.slug} post={post} />)}
                        </div>
                        <Pagination page={page} totalPages={totalPages} basePath="/blog" />
                    </>
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
