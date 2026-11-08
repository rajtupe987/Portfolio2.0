import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import {
  ArrowRight,
  Building2,
  Clock3,
  Download,
  GitBranch,
  Link2,
  Mail,
  MapPin,
  Menu,
  Sparkles,
  X,
} from 'lucide-react'
import { ProjectCard, DetailPanel } from './components/ProjectCard'
import { navItems, profile, highlights, socialLinks } from './data/profile'
import { skills } from './data/skills'
import { experience } from './data/experience'
import { academics } from './data/academics'
import { projects } from './data/projects'
import { useActiveSection } from './hooks/useActiveSection'
import profilePortrait from './assets/raj-profile.png'

const sectionIds = ['home', 'about', 'skills', 'experience', 'projects', 'contact']

const skillIcons = {
  JavaScript: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M0 0h24v24H0zm1.5 1.5v21h21v-21zm2.25 2.25h16.5v16.5H3.75zm2.25 3v9h9.75v-1.5h-8.25v-7.5zm13.5 0v9h-9.75v-1.5h8.25v-7.5z" /></svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M.5 0h23v24H.5zm4.5 5.5h14v2.5h-5v10.5h-2.5V8h-6.5zm8.25 4.5h6.5v1.75h-2.5v7.75h-1.5v-7.75h-2.5z"/></svg>
  ),
  React: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="2.5" fill="currentColor"/><g fill="none" stroke="currentColor" strokeWidth="1.6"><ellipse cx="12" cy="12" rx="8.5" ry="3.8"/><ellipse cx="12" cy="12" rx="8.5" ry="3.8" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="8.5" ry="3.8" transform="rotate(-60 12 12)"/></g></svg>
  ),
  'Next.js': (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c2.3 0 4.5-.8 6.2-2.2L9.8 8.4V17h-1.8V6.8h2.2l8.1 11.8A10.1 10.1 0 0 1 12 22C6.5 22 2 17.5 2 12S6.5 2 12 2zm7 4.6v10.8h-1.8V9.3l1.8-2.7z"/></svg>
  ),
  'Tailwind CSS': (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3.5 10.8C5.2 8.7 7.1 7.7 9.4 7.7c2 0 3.2 1 3.8 2.9.8-1.5 1.9-2.9 4.3-2.9 2.8 0 4.5 1.8 4.5 4.5 0 4-3.4 7.8-8.8 7.8-5.7 0-8.7-3.7-8.7-7.6zm9.8 2.7c.4-1.1 1.1-1.7 2.1-1.7 1.1 0 1.8.7 1.8 1.9 0 1.8-1.3 3.1-3.9 3.1-1.9 0-3-1.1-3-2.8 0-1.4.8-2.3 2.1-2.3.5 0 1 .2 1.3.6z"/></svg>
  ),
  Redux: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2c5 0 9 3.7 9 8.3 0 3.8-2.8 7-7 8.2l-1.2 3.5-1.2-3.5c-4.2-1.2-7-4.4-7-8.2C3 5.7 7 2 12 2zm0 2.3c-4.1 0-6.8 2.8-6.8 6 0 3.3 2.6 5.7 6.8 6.8 4.2-1.1 6.8-3.5 6.8-6.8 0-3.2-2.7-6-6.8-6zm-2.7 3.1h.9v5.5h-.9zm3.4 0h.9v5.5h-.9z"/></svg>
  ),
  'Context API': (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.5a9.5 9.5 0 1 0 9.5 9.5A9.5 9.5 0 0 0 12 2.5zm-1.4 4.2h2.8v7.6h-2.8zm0 9.1h2.8v2.7h-2.8z"/></svg>
  ),
  'Node.js': (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.1 1.8c-.8 0-1.6.2-2.3.7L4.2 5.9c-.7.4-1.3 1.1-1.7 1.9-.4.7-.6 1.5-.6 2.3v6.3c0 .8.2 1.6.6 2.3.4.8 1 1.5 1.7 1.9l5.6 3.4c.7.5 1.5.7 2.3.7.8 0 1.5-.2 2.2-.7l5.6-3.4c.7-.4 1.3-1.1 1.7-1.9.4-.7.6-1.5.6-2.3V10a4.7 4.7 0 0 0-.6-2.3c-.4-.8-1-1.5-1.7-1.9l-5.6-3.4c-.7-.5-1.5-.7-2.3-.7zm0 2.3c.3 0 .7.1 1 .3l5.6 3.4c.2.1.3.3.5.5.1.2.2.4.2.6v6.3c0 .2-.1.4-.2.6-.1.2-.3.4-.5.5l-5.6 3.4c-.3.2-.7.3-1 .3-.3 0-.7-.1-1-.3L5.5 17c-.2-.1-.3-.3-.5-.5-.1-.2-.2-.4-.2-.6V10c0-.2.1-.4.2-.6.1-.2.3-.4.5-.5l5.6-3.4c.3-.2.7-.3 1-.3zm-1 2.9h2v6.9h-2zm0 8.4h2v2h-2z"/></svg>
  ),
  NestJS: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.5C6.8 2.5 2.5 6.8 2.5 12S6.8 21.5 12 21.5 21.5 17.2 21.5 12 17.2 2.5 12 2.5zm-2.5 4.2h5l2 3.8-2 3.8h-5l-2-3.8zm2.5 2.2l1.2 2.3L12 13.7l-1.2-2.3z"/></svg>
  ),
  Fastify: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.5 6.5h11l-1.5 2.5h-8zm1.5 4h8l-1.2 2.2H9.2zm1.7 4h4.6l-.8 2.3H10zM2 12c0-4.4 3.6-8 8-8h4c4.4 0 8 3.6 8 8s-3.6 8-8 8h-4c-4.4 0-8-3.6-8-8z"/></svg>
  ),
  GraphQL: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 1.5 3.5 6v12L12 22.5 20.5 18V6zm-1.3 3.1L7.7 6.7l.5 8.6 2.5 1.5V4.6zm2.6 0v13.2l2.5-1.5.5-8.6-3.1-1.9zm-8.3 3.3 1.8 1.1-.5 8.6-1.3-.8zm13.2 0 1.3.8-.5 8.6-1.8-1.1z"/></svg>
  ),
  'REST APIs': (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 6.5h12a2.5 2.5 0 0 1 2.5 2.5v6A2.5 2.5 0 0 1 18 17.5H6A2.5 2.5 0 0 1 3.5 15V9A2.5 2.5 0 0 1 6 6.5zm.5 2.5v6h11v-6zm2 1.5h7v1.5h-7zm0 3h5v1.5h-5z"/></svg>
  ),
  'Apollo Client': (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.5 3 7.2v9.6l9 4.7 9-4.7V7.2zm0 2.3 6.7 3.5-6.7 3.5L5.3 8.3zm-7 5.1 5.7 3v5.6-5.6l-5.7-3zm14 0v6l-5.7-3v-5.6l5.7 3z"/></svg>
  ),
  PostgreSQL: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.5c-1.8 0-3.3 1.5-3.3 3.3v1.1h6.6V5.8c0-1.8-1.5-3.3-3.3-3.3zm-4.1 5.3h8.2v1.5H7.9zm-1.3 3h10.8v1.8H6.6zm1.3 4.2h8.2v1.8H7.9zm2.1 2.7h4.1v1.3H10zm1.1-12.4h1.8v1.5h-1.8z"/></svg>
  ),
  MySQL: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7.5 4h9a2.5 2.5 0 0 1 2.5 2.5v11A2.5 2.5 0 0 1 16.5 20h-9A2.5 2.5 0 0 1 5 17.5v-11A2.5 2.5 0 0 1 7.5 4zm1.2 3.2h6.6v1.8H8.7zm0 3.3h6.6v1.8H8.7zm0 3.4h4.5v1.8H8.7z"/></svg>
  ),
  SQL: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v13A2.5 2.5 0 0 1 17.5 21h-11A2.5 2.5 0 0 1 4 18.5zm2 2.2h12v2.1H6zm0 4.1h12v2.1H6zm0 4.2h8v2.1H6z"/></svg>
  ),
  'Google Cloud Platform': (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.1 2.5A9.5 9.5 0 0 0 2.5 12s3.1 4.8 8.1 8.3c5-3.5 8.1-8.3 8.1-8.3A9.5 9.5 0 0 0 12.1 2.5zm0 2.7A6.8 6.8 0 0 1 18.6 12c-1.7 1.7-4.1 3.1-6.5 4.2-2.4-1.1-4.8-2.5-6.5-4.2A6.8 6.8 0 0 1 12.1 5.2zm-1.7 3.3h3.4v1.5h-3.4zm0 3h3.4v1.5h-3.4z"/></svg>
  ),
  Docker: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 13h2v-2H4zm3 0h2v-2H7zm3 0h2v-2h-2zm3 0h2v-2h-2zm3 0h2v-2h-2zm-3-3h2V8h-2zm-3 0h2V8h-2zm-3 0h2V8H7zm11-4h-2V4h2zm-3 0h-2V4h2zm-3 0H8V4h2zm-3 0H5V4h2zM4 17h16v2H4zm2-6.5h1.5V8H6zm3 0h1.5V8H9zm3 0h1.5V8h-1.5zm3 0h1.5V8H15z"/></svg>
  ),
  Kubernetes: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.5 3.5 7.2v9.6L12 21.5l8.5-4.7V7.2zm0 2.2 5.8 3.2L12 11.1 6.2 8.1zm-6.5 4.5 5.1 2.8v5.8L5.5 17.2zm13 0v5.7l-5.1 2.8v-5.8z"/></svg>
  ),
  'CI/CD': (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5 5h14v2H5zm0 12h14v2H5zm5-6h4v2h-4zm-2-3 3-3 3 3H8zm8 0-3 3-3-3h6zm-8 9 3 3 3-3H8zm8 0-3 3-3-3h6z"/></svg>
  ),
  Python: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.5c-1.4 0-2.8.6-3.7 1.6-.8 1-1.3 2.3-1.3 3.8v3.4h2.3V8.4c0-1 .8-1.8 1.8-1.8h2.7c1 0 1.8.8 1.8 1.8v1.8H9.7v2.2h6.4V14h-2.2v-2.3h2.2v-1.8c0-2.4-2-4.4-4.4-4.4H9.8A4.4 4.4 0 0 0 5.4 12v4.8c0 2.4 2 4.4 4.4 4.4h3.8c2.4 0 4.4-2 4.4-4.4v-2.2H15.6v2.2c0 1-.8 1.8-1.8 1.8h-3.2c-1 0-1.8-.8-1.8-1.8V12h4.4v-2.2H8.5V8.4c0-1.7 1.4-3.1 3.1-3.1h2.4c1.7 0 3.1 1.4 3.1 3.1v2.3h2.3V7.9c0-1.7-1.4-3.1-3.1-3.1H12z"/></svg>
  ),
  'Data Structures and Algorithms': (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5 5h14v3H5zm0 11h14v3H5zm3-6h8v3H8zm-3-5h4v3H5zm0 11h4v3H5zm10-6h4v3h-4z"/></svg>
  ),
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

function SectionHeader({ eyebrow, title }) {
  return (
    <div className="section-head">
      <div className="eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
    </div>
  )
}

function SkillIcon({ name }) {
  const icon = skillIcons[name] || (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.5a9.5 9.5 0 1 0 9.5 9.5A9.5 9.5 0 0 0 12 2.5zm0 2.2a7.3 7.3 0 0 1 5.9 11.8L12 8.8 6.1 16.5A7.3 7.3 0 0 1 12 4.7zm-1.1 10.9h2.2v1.8h-2.2zm0-7.5h2.2v5.8h-2.2z"/></svg>
  )

  return <span className="skill-icon">{icon}</span>
}

function App() {
  const activeSection = useActiveSection(sectionIds)
  const [selectedProject, setSelectedProject] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState('')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const { scrollYProgress } = useScroll()
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 22,
    mass: 0.3,
  })
  const ambientLiftOne = useTransform(smoothScrollProgress, [0, 1], [0, 140])
  const ambientLiftTwo = useTransform(smoothScrollProgress, [0, 1], [0, -180])
  const heroParallax = useTransform(smoothScrollProgress, [0, 1], [0, 120])
  const heroRotate = useTransform(smoothScrollProgress, [0, 1], [0, 5])

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0
      setScrollProgress(Math.min(Math.max(progress, 0), 100))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const { name, email, message } = formData
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormStatus('Please fill in your name, email, and message.')
      return
    }

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    )

    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setFormStatus('Your email client is ready to send a message.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="portfolio-shell">
      <motion.div className="ambient ambient--one" style={{ y: ambientLiftOne }} />
      <motion.div className="ambient ambient--two" style={{ y: ambientLiftTwo }} />

      <div className="scroll-progress" aria-hidden="true">
        <span style={{ width: `${scrollProgress}%` }} />
      </div>

      <header className="site-header">
        <div className="viewport navbar">
          <a href="#home" className="brand" aria-label="Raj Tupe home">
            <span className="brand-mark">R</span>
            <span className="brand-text">
              <strong>Raj Tupe</strong>
              <small>Software Engineer <span>• est 2023</span></small>
            </span>
          </a>

          <nav aria-label="Main navigation" className={mobileNavOpen ? 'nav-panel is-open' : 'nav-panel'}>
            <ul className="nav-links">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={activeSection === item.href.slice(1) ? 'is-active' : ''}
                    onClick={() => setMobileNavOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-actions">
            <a href="#contact" className="nav-cta">
              Get In Touch
              <ArrowRight size={16} />
            </a>
            <button
              type="button"
              className="mobile-toggle"
              aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen((prev) => !prev)}
            >
              {mobileNavOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="section hero">
          <div className="viewport">
            <div className="hero-bg-text">SOFTWARE ENGINEER</div>

            <div className="hero-grid">
              <motion.div
                className="hero-copy"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                <span className="intro">Hello, I&apos;m</span>
                <h1>Raj Tupe</h1>
                <span className="title">Software Engineer</span>

                <p className="hero-description">Engineering scalable products. Building experiences that matter.</p>
                <p className="hero-description">
                  I&apos;m a Software Engineer at GTET (A Narayana Group Enterprise), focused on
                  building scalable web applications, intuitive interfaces, and reliable backend
                  integrations. I enjoy turning complex requirements into practical engineering
                  solutions.
                </p>

                <div className="hero-actions">
                  <a href="#projects" className="primary-btn">
                    Explore My Work
                    <ArrowRight size={16} />
                  </a>
                  <a href="/Raj-Tupe-Resume.pdf" className="secondary-btn" download>
                    Download Resume
                    <Download size={16} />
                  </a>
                </div>

                <div className="hero-stats">
                  {highlights.map((stat) => (
                    <div key={stat.label} className="stat-pill">
                      <span>{stat.label}</span>
                      <strong>{stat.value}</strong>
                    </div>
                  ))}
                </div>

                <div className="tech-strip" aria-label="Technologies">
                  {profile.techStack.map((item) => (
                    <span key={item} className="tech-pill">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="hero-visual"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
              >
                <motion.div
                  className="hero-portrait-shell"
                  style={{ y: heroParallax, rotate: heroRotate }}
                  transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                >
                  <div className="hero-portrait-arch">
                    <img
                      src={profilePortrait}
                      alt="Raj Tupe portrait"
                      className="hero-portrait"
                    />
                  </div>
                </motion.div>

                <div className="floating-chip floating-chip--one">Full-Stack Engineering</div>
                <div className="floating-chip floating-chip--two">Frontend Architecture</div>
                <div className="floating-chip floating-chip--three">Product Development</div>
              </motion.div>
            </div>
          </div>
        </section>

        <motion.section id="about" className="section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp} transition={{ type: 'spring', stiffness: 120, damping: 18 }}>
          <div className="viewport">
            <SectionHeader eyebrow="About Me" title="I build digital products where engineering meets real-world impact." />

            <div className="about-layout">
              <div className="about-card">
                <p>
                  I&apos;m a Software Engineer at GTET (A Narayana Group Enterprise), working across
                  frontend and backend development.
                </p>
                <p>
                  My experience involves building enterprise applications, designing scalable
                  frontend architectures, implementing secure authentication systems, and
                  integrating distributed backend services.
                </p>
                <p>
                  I enjoy understanding complex product requirements, exploring technical trade-offs,
                  and developing solutions that are reliable, maintainable, and easy to use.
                </p>
                <p>
                  Beyond writing code, I believe good engineering starts with understanding the
                  problem and making thoughtful technical decisions.
                </p>
              </div>

              <div className="info-card">
                <div className="info-row">
                  <div className="info-icon"><MapPin size={18} /></div>
                  <div>
                    <span>Office / Operations (Hyderabad)</span>
                    <strong>
                      <a href="https://www.google.com/search?q=Melange+Tower+Madhapur+Hyderabad+Telangana" target="_blank" rel="noreferrer">
                        9th Floor, Melange Tower, Madhapur, Hyderabad
                      </a>
                    </strong>
                  </div>
                </div>

                <div className="info-row">
                  <div className="info-icon"><Building2 size={18} /></div>
                  <div>
                    <span>Company</span>
                    <strong>{profile.organization}</strong>
                  </div>
                </div>

                <div className="info-row">
                  <div className="info-icon"><Sparkles size={18} /></div>
                  <div>
                    <span>Role</span>
                    <strong>{profile.role}</strong>
                  </div>
                </div>

                <div className="info-row">
                  <div className="info-icon"><Clock3 size={18} /></div>
                  <div>
                    <span>Experience</span>
                    <strong>{profile.experience}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section id="skills" className="section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} transition={{ type: 'spring', stiffness: 130, damping: 18 }}>
          <div className="viewport">
            <SectionHeader eyebrow="Technical Skills" title="My Engineering Toolkit" />

            <div className="skills-grid">
              {skills.map((group) => (
                <div key={group.category} className="skill-group">
                  <h3>{group.category}</h3>
                  <div className="skill-tags">
                    {group.items.map((item) => (
                      <span key={item} className="skill-chip">
                        <SkillIcon name={item} />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section id="experience" className="section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp} transition={{ type: 'spring', stiffness: 130, damping: 18 }}>
          <div className="viewport">
            <SectionHeader eyebrow="Experience" title="Where I&apos;ve Built and Delivered." />

            <div className="experience-card">
              <div className="experience-header">
                <div>
                  <h3>{experience.company}</h3>
                  <div className="experience-meta">
                    <span>{experience.role}</span>
                    <span>•</span>
                    <span>{experience.location}</span>
                  </div>
                </div>
                <div className="experience-meta">
                  <Clock3 size={16} />
                  <span>{experience.duration}</span>
                </div>
              </div>

              <ul className="experience-list">
                {experience.contributions.map((item) => (
                  <li key={item.title} className="experience-item">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        <motion.section id="projects" className="section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp} transition={{ type: 'spring', stiffness: 130, damping: 18 }}>
          <div className="viewport">
            <SectionHeader eyebrow="Selected Work" title="Selected Engineering Work" />

            <p className="section-copy">
              A closer look at the products, platforms, and engineering challenges I&apos;ve worked on.
            </p>

            <div className="project-showcase">
              <div className="projects-grid">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} onSelect={setSelectedProject} />
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section className="section academic-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp} transition={{ type: 'spring', stiffness: 130, damping: 18 }}>
          <div className="viewport">
            <SectionHeader eyebrow="Academic Journey" title="Academic Journey & Learning" />

            <div className="timeline academic-timeline">
              {academics.map((item, index) => (
                <div key={`${item.institution}-${index}`} className={`timeline-item ${item.accent === 'secondary' ? 'timeline-item--bootcamp' : ''}`}>
                  <div className="timeline-marker" aria-hidden="true" />
                  <div className="timeline-content">
                    <div className="timeline-period">{item.period}</div>
                    <div className="timeline-card">
                      <div className="timeline-card__header">
                        <div className="timeline-card__badge">{item.type}</div>
                        <div className="timeline-card__location">{item.location}</div>
                      </div>
                      <h3>{item.institution}</h3>
                      <div className="timeline-card__title">{item.title}</div>
                      {item.meta && <div className="timeline-card__meta">{item.meta}</div>}
                      {item.extra && <div className="timeline-card__meta">{item.extra}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section id="contact" className="section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.13 }} variants={fadeUp} transition={{ type: 'spring', stiffness: 130, damping: 18 }}>
          <div className="viewport">
            <SectionHeader eyebrow="Let&apos;s Connect" title="Have an interesting idea? Let&apos;s make it happen." />

            <div className="contact-layout">
              <div className="about-card">
                <p>
                  I&apos;m always interested in meaningful engineering conversations, challenging
                  problems, and opportunities to build impactful digital products.
                </p>

                <div className="info-row">
                  <div className="info-icon"><Mail size={18} /></div>
                  <div>
                    <span>Email</span>
                    <strong><a href={socialLinks.email}>{profile.email}</a></strong>
                  </div>
                </div>

                <div className="info-row">
                  <div className="info-icon"><Link2 size={18} /></div>
                  <div>
                    <span>LinkedIn</span>
                    <strong>
                      <a href={profile.linkedin} target="_blank" rel="noreferrer">
                        {profile.linkedin}
                      </a>
                    </strong>
                  </div>
                </div>

                <div className="info-row">
                  <div className="info-icon"><Sparkles size={18} /></div>
                  <div>
                    <span>Languages</span>
                    <strong>{profile.languages.join(' | ')}</strong>
                  </div>
                </div>

                <div className="info-row">
                  <div className="info-icon"><Sparkles size={18} /></div>
                  <div>
                    <span>Interests</span>
                    <strong>{profile.interests.join(' | ')}</strong>
                  </div>
                </div>
              </div>

              <div className="contact-card">
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="name">Name</label>
                      <input id="name" name="name" value={formData.name} onChange={handleInputChange} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="email">Email</label>
                      <input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" rows="6" value={formData.message} onChange={handleInputChange} />
                  </div>

                  <button type="submit" className="contact-submit">
                    Send Message
                    <ArrowRight size={16} />
                  </button>

                  <div className="form-status" aria-live="polite">{formStatus}</div>
                </form>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="site-footer">
        <div className="viewport footer-shell">
          <div className="brand" aria-label="Raj Tupe brand">
            <span className="brand-mark">R</span>
            <span>Raj Tupe</span>
          </div>

          <div className="footer-copy">Thoughtfully engineered by Raj Tupe.</div>

          <div className="footer-links">
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
              <Link2 size={16} />
            </a>
            <a href={socialLinks.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
              <GitBranch size={16} />
            </a>
            <a href={socialLinks.email} aria-label="Email contact">
              <Mail size={16} />
            </a>
            <a href="#home" aria-label="Back to top">↑</a>
          </div>
        </div>
      </footer>

      <DetailPanel project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  )
}

export default App
