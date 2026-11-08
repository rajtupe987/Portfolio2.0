import { ArrowUpRight, Sparkles } from 'lucide-react'

export function ProjectCard({ project, onSelect }) {
  return (
    <article className="project-card">
      <div className="project-card__image-wrap">
        <img src={project.image} alt={project.title} loading="lazy" />
      </div>

      <div className="project-card__content">
        <h3>{project.title}</h3>
        <p>{project.shortDescription}</p>

        <div className="project-card__stack">
          {project.stack.slice(0, 3).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <button type="button" className="project-card__button" onClick={() => onSelect(project)}>
          View Details
          <ArrowUpRight size={16} />
        </button>
      </div>
    </article>
  )
}

export function DetailPanel({ project, onClose }) {
  if (!project) return null

  return (
    <div className="project-modal" role="dialog" aria-modal="true" aria-label={`${project.title} details`}>
      <div className="project-modal__backdrop" onClick={onClose} />
      <div className="project-modal__panel">
        <button type="button" className="project-modal__close" onClick={onClose} aria-label="Close project details">
          ×
        </button>

        <div className="project-modal__header">
          <div className="project-modal__eyebrow">
            <Sparkles size={14} /> Selected Work
          </div>
          <h3>{project.title}</h3>
        </div>

        <div className="project-modal__image-wrap">
          <img src={project.image} alt={project.title} />
        </div>

        <div className="project-modal__grid">
          <div>
            <h4>Project Overview</h4>
            <p>{project.overview}</p>
          </div>
          <div>
            <h4>Problem / Objective</h4>
            <p>{project.objective}</p>
          </div>
          <div>
            <h4>My Responsibilities</h4>
            <ul>
              {project.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Technical Implementation</h4>
            <ul>
              {project.implementation.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Technology Stack</h4>
            <div className="project-modal__tags">
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <div>
            <h4>Engineering Challenges</h4>
            <ul>
              {project.challenges.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
