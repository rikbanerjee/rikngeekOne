'use client'

import { motion } from 'framer-motion'
import { Download, Briefcase, GraduationCap, Award, Code2 } from 'lucide-react'

const experience = [
  {
    title: 'Senior AI Engineer',
    company: 'Tech Innovations Inc.',
    period: '2022 - Present',
    description: 'Leading AI research and development initiatives, building production ML systems.',
    achievements: [
      'Architected and deployed 5+ ML models serving 1M+ users',
      'Led team of 8 engineers on AI product development',
      'Reduced model inference latency by 60%',
    ],
  },
  {
    title: 'Machine Learning Engineer',
    company: 'AI Solutions Corp',
    period: '2020 - 2022',
    description: 'Developed and optimized machine learning pipelines for enterprise applications.',
    achievements: [
      'Built scalable MLOps infrastructure using Kubernetes',
      'Improved model accuracy by 25% through novel techniques',
      'Published 3 research papers in top-tier conferences',
    ],
  },
]

const education = [
  {
    degree: 'Ph.D. in Computer Science',
    school: 'Stanford University',
    period: '2016 - 2020',
    focus: 'Artificial Intelligence & Machine Learning',
  },
  {
    degree: 'M.S. in Computer Science',
    school: 'MIT',
    period: '2014 - 2016',
    focus: 'Computer Science',
  },
]

const skills = [
  { category: 'Languages', items: ['Python', 'TypeScript', 'C++', 'R', 'Julia'] },
  { category: 'ML/AI', items: ['PyTorch', 'TensorFlow', 'Transformers', 'scikit-learn', 'JAX'] },
  { category: 'Cloud & DevOps', items: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'MLflow'] },
  { category: 'Web & Tools', items: ['React', 'Next.js', 'FastAPI', 'Git', 'Linux'] },
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
            Experience, education, and expertise in AI engineering
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
                    <p className="text-sm text-gray-400">Focus: {edu.focus}</p>
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
                {[
                  'AWS Certified ML Specialist',
                  'Google Cloud Professional ML Engineer',
                  'Deep Learning Specialization',
                ].map((cert, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-300">
                    <Award className="w-4 h-4 text-primary-400 flex-shrink-0" />
                    <span className="text-sm">{cert}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

