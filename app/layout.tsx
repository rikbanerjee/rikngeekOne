import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rik Banerjee - Director of Engineering | Gen AI & Agentic AI @ CVS Health',
  description: 'Director of Engineering at CVS Health leading Gen AI and Agentic AI initiatives. Built AI systems delivering $90M+ annual savings, modernized $50B+ POS platform serving 120M+ customers. 18+ years transforming enterprise operations through AI innovation.',
  keywords: ['Gen AI', 'Agentic AI', 'Engineering Director', 'CVS Health', 'AI Strategy', 'Machine Learning', 'Edge Computing', 'Computer Vision', 'Enterprise AI', 'Healthcare Technology', 'Retail Innovation', 'Product Engineering', 'AI Patents'],
  authors: [{ name: 'Rik Banerjee' }],
  openGraph: {
    title: 'Rik Banerjee - Director of Engineering | Gen AI & Agentic AI',
    description: 'Engineering leader transforming enterprise operations through Gen AI—delivering $90M+ annual savings at CVS Health',
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

