import fm from 'front-matter'

export interface EventAttributes {
  title: string
  image: string
  startDate: string
  endDate: string
  extra?: string
  participants?: string[]
}

export interface EventEntry extends EventAttributes {
  slug: string
  description: string
}

const rawEvents = import.meta.glob('/src/content/events/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export function loadEvents(): EventEntry[] {
  return Object.entries(rawEvents)
    .map(([path, raw]) => {
      const { attributes, body } = fm<EventAttributes>(raw)
      const slug = path.split('/').pop()!.replace(/\.md$/, '')
      return { slug, description: body.trim(), ...attributes }
    })
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
}

export function getEventBySlug(slug: string): EventEntry | undefined {
  return loadEvents().find((event) => event.slug === slug)
}

export function formatDateRange(start: string, end: string) {
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }
  const startLabel = new Date(`${start}T00:00:00`).toLocaleDateString('en-US', options)
  if (start === end) return startLabel
  const endLabel = new Date(`${end}T00:00:00`).toLocaleDateString('en-US', options)
  return `${startLabel} – ${endLabel}`
}
