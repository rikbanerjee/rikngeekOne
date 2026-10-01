import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
    page: number
    totalPages: number
    /** Base route for page 1, e.g. "/blog" or "/blog/category/ai". Pages 2+ are `${basePath}/page/${n}`. */
    basePath: string
}

function hrefFor(basePath: string, page: number) {
    return page <= 1 ? basePath : `${basePath}/page/${page}`
}

export default function Pagination({ page, totalPages, basePath }: Props) {
    if (totalPages <= 1) return null

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    const base = 'flex items-center justify-center min-w-[2.5rem] h-10 px-3 rounded-lg text-sm font-medium transition-all duration-300'
    const idle = 'glass-effect text-gray-300 hover:text-white hover:bg-slate-700'
    const disabled = 'glass-effect text-gray-600 cursor-not-allowed'

    return (
        <nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-2 mt-12">
            {page > 1 ? (
                <Link href={hrefFor(basePath, page - 1)} className={`${base} ${idle} gap-1`} rel="prev">
                    <ChevronLeft className="w-4 h-4" /> Prev
                </Link>
            ) : (
                <span className={`${base} ${disabled} gap-1`} aria-disabled="true">
                    <ChevronLeft className="w-4 h-4" /> Prev
                </span>
            )}

            {pages.map(n => (
                <Link
                    key={n}
                    href={hrefFor(basePath, n)}
                    aria-current={n === page ? 'page' : undefined}
                    className={`${base} ${n === page ? 'bg-primary-600 text-white' : idle}`}
                >
                    {n}
                </Link>
            ))}

            {page < totalPages ? (
                <Link href={hrefFor(basePath, page + 1)} className={`${base} ${idle} gap-1`} rel="next">
                    Next <ChevronRight className="w-4 h-4" />
                </Link>
            ) : (
                <span className={`${base} ${disabled} gap-1`} aria-disabled="true">
                    Next <ChevronRight className="w-4 h-4" />
                </span>
            )}
        </nav>
    )
}
