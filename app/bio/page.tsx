import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Download, Briefcase, Building } from 'lucide-react'
import type { Metadata } from 'next'

// Configure marked safely
marked.setOptions({ breaks: true })

const BIO_PATH = path.join(process.cwd(), 'content/bio.md')

export const metadata: Metadata = {
    title: 'Speaker Bio — Rik Banerjee',
    description: 'Concise Bio for AI events and speaking engagements.',
}

export default async function BioPage() {
    let htmlContent = ''
    let data = { title: 'Speaker Bio', image: '/images/rik_headshot.jpg', role: '', company: '' }

    try {
        if (fs.existsSync(BIO_PATH)) {
            const raw = fs.readFileSync(BIO_PATH, 'utf8')
            const parsed = matter(raw)
            data = { ...data, ...parsed.data }
            htmlContent = await marked(parsed.content)
        } else {
            htmlContent = '<p>Bio content not found. Please add content/bio.md.</p>'
        }
    } catch (error) {
        console.error("Error reading bio:", error)
        htmlContent = `<p>Error loading bio content.</p>`
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors duration-300"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column - Profile Picture & Quick Info */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden glass-effect border border-slate-800 shadow-2xl">
                            {data.image ? (
                                <img
                                    src={data.image}
                                    alt={data.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-primary-900/60 to-accent-900/60" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <h1 className="text-2xl font-bold text-white mb-3">
                                    {data.title.replace('Meet ', '')}
                                </h1>
                                {data.role && (
                                    <div className="flex items-start gap-2 text-sm text-gray-300 mb-2">
                                        <Briefcase className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                                        <span className="leading-tight">{data.role}</span>
                                    </div>
                                )}
                                {data.company && (
                                    <div className="flex items-center gap-2 text-sm text-gray-300">
                                        <Building className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                        <span>{data.company}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-3">
                            <a
                                href={data.image || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium transition-all duration-300 shadow-lg shadow-purple-900/20"
                            >
                                <Download className="w-5 h-5" />
                                Download Headshot
                            </a>
                        </div>
                    </div>

                    {/* Right Column - Markdown Content */}
                    <div className="lg:col-span-8">
                        <div className="glass-effect rounded-3xl p-8 sm:p-10 border border-slate-800 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>

                            <article
                                className="prose prose-invert prose-lg max-w-none relative z-10
                                prose-headings:text-white prose-headings:font-bold
                                prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-0
                                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                                prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6 text-base sm:text-lg
                                prose-a:text-primary-400 prose-a:no-underline hover:prose-a:text-primary-300
                                prose-strong:text-white
                                prose-code:text-emerald-400 prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                                prose-pre:bg-gray-900 prose-pre:rounded-xl prose-pre:border prose-pre:border-slate-800
                                prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:bg-slate-800/30 prose-blockquote:rounded-r-xl prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:text-gray-300 prose-blockquote:italic
                                prose-ul:text-gray-300 prose-ol:text-gray-300
                                prose-hr:border-slate-800
                                prose-img:rounded-2xl prose-img:my-8 prose-img:shadow-2xl"
                                dangerouslySetInnerHTML={{ __html: htmlContent }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
