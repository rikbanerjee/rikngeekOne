import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rik Banerjee - AI Engineer & Researcher',
  description: 'Portfolio showcasing AI projects, research articles, blogs, and STEM education resources by Rik Banerjee',
  keywords: ['AI', 'Machine Learning', 'Portfolio', 'Research', 'STEM Education', 'Projects'],
  authors: [{ name: 'Rik Banerjee' }],
  openGraph: {
    title: 'Rik Banerjee - AI Engineer & Researcher',
    description: 'Portfolio showcasing AI projects, research articles, and more',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

