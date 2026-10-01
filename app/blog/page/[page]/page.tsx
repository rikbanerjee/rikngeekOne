import { notFound } from 'next/navigation'
import { getAllPosts, getPageCount, paginate, extraPageNumbers } from '@/lib/posts'
import BlogIndex from '@/components/BlogIndex'
import type { Metadata } from 'next'

interface Props { params: Promise<{ page: string }> }

// Only pages 2..N exist; page 1 is /blog. Anything else 404s.
export const dynamicParams = false

export async function generateStaticParams() {
    return extraPageNumbers(getAllPosts().length).map(page => ({ page }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const { page } = await props.params
    return {
        title: `Blog — Page ${page} | Rik Banerjee`,
        description: 'Technical articles on AI, Retail IT, Enterprise trends, and STEM education by Rik Banerjee.',
    }
}

export default async function BlogPaginatedPage(props: Props) {
    const { page: pageParam } = await props.params
    const page = Number(pageParam)
    const allPosts = getAllPosts()
    const totalPages = getPageCount(allPosts.length)
    if (!Number.isInteger(page) || page < 2 || page > totalPages) notFound()

    return (
        <BlogIndex
            posts={paginate(allPosts, page)}
            totalPosts={allPosts.length}
            page={page}
            totalPages={totalPages}
        />
    )
}
