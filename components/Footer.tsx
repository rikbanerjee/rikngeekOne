'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Twitter, Heart } from 'lucide-react'

const footerLinks = {
  sections: [
    {
      title: 'Navigation',
      links: [
        { name: 'Home', href: '#home' },
        { name: 'Projects', href: '#projects' },
        { name: 'Blog', href: '#blog' },
        { name: 'Research', href: '#research' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'STEM Education', href: '#stem' },
        { name: 'Resume', href: '#resume' },
        { name: 'Publications', href: '#research' },
        { name: 'Contact', href: '#contact' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { name: 'LinkedIn', href: 'https://www.linkedin.com/in/rik-banerjee/' },
        { name: 'GitHub', href: 'https://github.com' },
        { name: 'Twitter', href: 'https://twitter.com' },
        { name: 'Email', href: 'mailto:contact@rikbanerjee.com' },
      ],
    },
  ],
}

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/rik-banerjee/', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Mail, href: 'mailto:contact@rikbanerjee.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-2xl font-bold gradient-text mb-4"
            >
              Rik Banerjee
            </motion.h3>
            <p className="text-gray-400 text-sm mb-4">
              Building the future with AI, one project at a time.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="p-2 glass-effect rounded-lg hover:bg-white/10 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-slate-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Rik Banerjee. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>using Next.js & Tailwind CSS</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-1/2 left-1/4 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
        <div className="absolute -bottom-1/2 right-1/4 w-96 h-96 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
      </div>
    </footer>
  )
}

