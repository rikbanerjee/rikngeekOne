import { getAllPosts, getPageCount, paginate } from '@/lib/posts'
import BlogIndex from '@/components/BlogIndex'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Blog — Rik Banerjee | AI, Retail IT & Tech Insights',
    description: 'Technical articles on AI, Retail IT, Enterprise trends, and STEM education by Rik Banerjee.',
}

export default function BlogPage() {
    const allPosts = getAllPosts()

    return (
        <BlogIndex
            posts={paginate(allPosts, 1)}
            totalPosts={allPosts.length}
            page={1}
            totalPages={getPageCount(allPosts.length)}
        />
    )
}
