import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

const POSTS_DIR = path.join(process.cwd(), 'content/posts')

export interface PostMeta {
    slug: string
    title: string
    excerpt: string
    date: string
    readTime: string
    category: string
    categorySlug: string
    categoryColor: string
    image: string
    tags: string[]
    author: string
}

export interface Post extends PostMeta {
    content: string   // rendered HTML
}

export const CATEGORIES = [
    { label: 'AI & Machine Learning', value: 'AI', slug: 'ai', color: 'bg-purple-100 text-purple-800' },
    { label: 'Retail IT', value: 'Retail IT', slug: 'retail-it', color: 'bg-blue-100 text-blue-800' },
    { label: 'Enterprise Trends', value: 'Enterprise Trends', slug: 'enterprise-trends', color: 'bg-green-100 text-green-800' },
    { label: 'Tech Observations', value: 'Tech Observations', slug: 'tech-observations', color: 'bg-orange-100 text-orange-800' },
    { label: 'Kids STEM', value: 'Kids STEM', slug: 'kids-stem', color: 'bg-indigo-100 text-indigo-800' },
]

// Configure marked for safe rendering
marked.setOptions({ breaks: true })

function slugToCategory(slug: string) {
    return CATEGORIES.find(c => c.slug === slug) ?? CATEGORIES[0]
}

export function getAllPostSlugs(): string[] {
    if (!fs.existsSync(POSTS_DIR)) return []
    return fs.readdirSync(POSTS_DIR)
        .filter(f => f.endsWith('.md'))
        .map(f => f.replace(/\.md$/, ''))
}

export function getAllPosts(): PostMeta[] {
    if (!fs.existsSync(POSTS_DIR)) return []
    return fs.readdirSync(POSTS_DIR)
        .filter(f => f.endsWith('.md'))
        .map(f => {
            const slug = f.replace(/\.md$/, '')
            const raw = fs.readFileSync(path.join(POSTS_DIR, f), 'utf8')
            const { data } = matter(raw)
            const cat = slugToCategory(data.categorySlug ?? 'ai')
            return {
                slug,
                title: data.title ?? slug,
                excerpt: data.excerpt ?? '',
                date: data.date ?? '',
                readTime: data.readTime ?? '5 min read',
                category: data.category ?? cat.value,
                categorySlug: data.categorySlug ?? cat.slug,
                categoryColor: data.categoryColor ?? cat.color,
                image: data.image ?? '',
                tags: data.tags ?? [],
                author: data.author ?? 'RikNGeek',
            } satisfies PostMeta
        })
        .sort((a, b) => (a.date < b.date ? 1 : -1))   // newest first
}

export function getPostsByCategory(categorySlug: string): PostMeta[] {
    return getAllPosts().filter(p => p.categorySlug === categorySlug)
}

export async function getPost(slug: string): Promise<Post | null> {
    const filePath = path.join(POSTS_DIR, `${slug}.md`)
    if (!fs.existsSync(filePath)) return null
    const raw = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(raw)
    const cat = slugToCategory(data.categorySlug ?? 'ai')
    const htmlContent = await marked(content)
    return {
        slug,
        title: data.title ?? slug,
        excerpt: data.excerpt ?? '',
        date: data.date ?? '',
        readTime: data.readTime ?? '5 min read',
        category: data.category ?? cat.value,
        categorySlug: data.categorySlug ?? cat.slug,
        categoryColor: data.categoryColor ?? cat.color,
        image: data.image ?? '',
        tags: data.tags ?? [],
        author: data.author ?? 'RikNGeek',
        content: htmlContent,
    }
}
