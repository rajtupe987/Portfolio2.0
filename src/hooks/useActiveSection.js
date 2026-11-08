import { useEffect, useState } from 'react'

export function useActiveSection(sections = []) {
  const [activeSection, setActiveSection] = useState(sections[0] ?? 'home')

  useEffect(() => {
    if (!sections.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id)
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0.15, 0.45, 0.7] },
    )

    const observedElements = sections
      .map((sectionId) => document.getElementById(sectionId))
      .filter(Boolean)

    observedElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [sections])

  return activeSection
}
