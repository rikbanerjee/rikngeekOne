'use client'

import { motion } from 'framer-motion'
import { Download, Briefcase, GraduationCap, Award, Code2 } from 'lucide-react'

const experience = [
  {
    title: 'Lead Director, In-Store AI, Technology & Omni-channel',
    company: 'CVS Health',
    period: 'Sep 2022 - Present',
    description: 'Leading engineering teams building AI systems that power America\'s largest pharmacy retailer, serving 120M+ customers and 300K colleagues.',
    achievements: [
      '$90M+ annual savings through Gen AI/ML models and agentic workflows',
      'Modernized $50B+ POS transaction platform across 9,500+ stores',
      'Led 60-100+ cross-functional engineers building StoreOS with edge computing & computer vision',
      'Launched patented Virtual Verification AI and biometric authentication systems',
      'Built AI-driven pill verification, inventory detection, and omnichannel ad-tech',
    ],
  },
  {
    title: 'Sr. Manager, Pharmacy POS & Store Applications',
    company: 'CVS Health',
    period: 'Sep 2020 - Aug 2022',
    description: 'Managed engineering, product, and UX for StoreFront delivery, mobility apps, and pharmacy POS applications.',
    achievements: [
      'Led architecture and engineering for ~10K stores pharmacy modernization',
      'Built vaccine administration platform (including Covid-19)',
      'Implemented state-of-the-art @Edge engineering for analytics',
      'Delivered unified retail/pharmacy experience across all store modals',
    ],
  },
  {
    title: 'Sr. Manager, Pharmacy POS',
    company: 'CVS Health',
    period: 'Feb 2020 - Sep 2020',
    description: 'Rebuilt Pharmacy POS on web platform for unified experience across CVS and Target stores.',
    achievements: [
      'Unified POS experience across all store modals',
      'Built SRE team for product reliability tracking',
      'Modernized pharmacy applications architecture',
    ],
  },
  {
    title: 'Sr. IT Consultant & Java Developer',
    company: 'Cognizant Technology Solutions',
    period: 'Jan 2007 - Aug 2012',
    description: 'Lead developer for enterprise applications at Staples Inc. and innovation projects at Java Center of Excellence.',
    achievements: [
      'Led distributed teams on next-gen web applications',
      'Built SOA-based product management systems',
      'Developed real-time messaging frameworks',
    ],
  },
]

const education = [
  {
    degree: 'Executive Education - Competing in the Age of AI',
    school: 'Harvard Business School',
    period: 'Sep 2021 - Nov 2021',
    focus: 'AI Strategy and Business Transformation',
  },
  {
    degree: 'Professional Education - Internet of Things',
    school: 'Massachusetts Institute of Technology (MIT)',
    period: 'May 2017 - Aug 2017',
    focus: 'IoT: Roadmap to a Connected World',
  },
  {
    degree: 'B.Tech in Electronics and Communication Engineering',
    school: 'Jawaharlal Nehru Technological University',
    period: '2003 - 2007',
    focus: 'Electronics & Communication Engineering',
  },
]

const skills = [
  { category: 'Leadership', items: ['Engineering Leadership', 'Product Management', 'AI Strategy', 'Strategic Roadmaps', 'Team Building'] },
  { category: 'AI/ML Expertise', items: ['Gen AI', 'Agentic Systems', 'Computer Vision', 'ML Models', 'Edge AI', 'MLOps'] },
  { category: 'Architecture', items: ['Enterprise Architecture', 'Distributed Systems', 'Edge Computing', 'Kafka/SRE', 'Cloud Infrastructure'] },
  { category: 'Product & Tech', items: ['Omnichannel', 'E-commerce', 'Ad-Tech', 'POS Systems', 'DevOps', 'Reliability Engineering'] },
]

export default function Resume() {
  return (
    <section id="resume" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-4">
            <Briefcase className="w-4 h-4 text-primary-400" />
            <span className="text-sm text-gray-300">Professional Background</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Resume</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-6">
            Director of Engineering | Gen AI & Agentic AI | 18+ Years Transforming Enterprise Operations
          </p>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/50"
          >
            <Download className="w-5 h-5" />
            Download Resume
          </motion.a>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Experience & Education */}
          <div className="lg:col-span-2 space-y-8">
            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Experience</h3>
              </div>

              <div className="space-y-6">
                {experience.map((job, index) => (
                  <div key={index} className="glass-effect rounded-xl p-6 transition-all duration-500 relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                      <div>
                        <h4 className="text-xl font-bold text-white">{job.title}</h4>
                        <p className="text-primary-400">{job.company}</p>
                      </div>
                      <span className="text-sm text-gray-400 mt-1 sm:mt-0">{job.period}</span>
                    </div>
                    <p className="text-gray-400 mb-3">{job.description}</p>
                    <ul className="space-y-2">
                      {job.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-300">
                          <span className="text-primary-400 mt-1">•</span>
                          <span className="text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Education</h3>
              </div>

              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="glass-effect rounded-xl p-6 transition-all duration-500 relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                      <div>
                        <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                        <p className="text-primary-400">{edu.school}</p>
                      </div>
                      <span className="text-sm text-gray-400 mt-1 sm:mt-0">{edu.period}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">Focus: {edu.focus}</p>
                    {edu.award && (
                      <div className="flex items-center gap-2 mt-2">
                        <Award className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-yellow-500/80">{edu.award}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Skills & Certifications */}
          <div className="space-y-8">
            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Skills</h3>
              </div>

              <div className="space-y-6">
                {skills.map((skillGroup, index) => (
                  <div key={index} className="glass-effect rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">{skillGroup.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-sm rounded-full bg-slate-800 text-gray-300 border border-slate-700 hover:border-primary-500 transition-colors duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Certifications</h3>
              </div>

              <div className="glass-effect rounded-xl p-6 space-y-3">
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-primary-400 mb-3">Patents</h4>
                  {[
                    'Virtual Verification in Pharmacy Workflow (Patent #20240249428)',
                    'Automated Prescription Product Counting (Patent #20210374762)',
                  ].map((cert, index) => (
                    <div key={index} className="flex items-start gap-2 text-gray-300 mb-2">
                      <Award className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-1" />
                      <span className="text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-primary-400 mb-3">Certifications</h4>
                  {[
                    'Professional Scrum Master - PSM 1 (Scrum.org)',
                    'Strategic Thinking Habit (LinkedIn Learning)',
                  ].map((cert, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-300 mb-2">
                      <Award className="w-4 h-4 text-primary-400 flex-shrink-0" />
                      <span className="text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

