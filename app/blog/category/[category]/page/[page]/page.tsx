import { notFound } from 'next/navigation'
import { getPostsByCategory, getPageCount, paginate, extraPageNumbers, CATEGORIES } from '@/lib/posts'
import CategoryIndex from '@/components/CategoryIndex'
import type { Metadata } from 'next'

interface Props { params: Promise<{ category: string; page: string }> }

// Only pages 2..N exist; page 1 is /blog/category/[category]. Anything else 404s.
export const dynamicParams = false

export async function generateStaticParams() {
    return CATEGORIES.flatMap(c =>
        extraPageNumbers(getPostsByCategory(c.slug).length).map(page => ({ category: c.slug, page }))
    )
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params
    const cat = CATEGORIES.find(c => c.slug === params.category)
    if (!cat) return { title: 'Category Not Found' }
    return {
        title: `${cat.label} — Page ${params.page} | Rik Banerjee Blog`,
        description: `Articles about ${cat.label} by Rik Banerjee`,
    }
}

export default async function CategoryPaginatedPage(props: Props) {
    const params = await props.params
    const cat = CATEGORIES.find(c => c.slug === params.category)
    if (!cat) notFound()

    const page = Number(params.page)
    const posts = getPostsByCategory(params.category)
    const totalPages = getPageCount(posts.length)
    if (!Number.isInteger(page) || page < 2 || page > totalPages) notFound()

    return (
        <CategoryIndex
            category={cat}
            posts={paginate(posts, page)}
            totalPosts={posts.length}
            page={page}
            totalPages={totalPages}
        />
    )
}
