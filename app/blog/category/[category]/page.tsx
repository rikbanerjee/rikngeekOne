import { notFound } from 'next/navigation'
import { getPostsByCategory, getPageCount, paginate, CATEGORIES } from '@/lib/posts'
import CategoryIndex from '@/components/CategoryIndex'
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
        <CategoryIndex
            category={cat}
            posts={paginate(posts, 1)}
            totalPosts={posts.length}
            page={1}
            totalPages={getPageCount(posts.length)}
        />
    )
}
