import Markdown from 'markdown-to-jsx'
import { useMemo } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import BackLink from '../../components/BackLink/BackLink'
import { formatDateRange, getEventBySlug } from '../../data/events'
import { asset } from '../../lib/asset'
import './EventDetail.scss'

function EventDetail() {
  const { slug } = useParams<{ slug: string }>()
  const event = useMemo(() => (slug ? getEventBySlug(slug) : undefined), [slug])

  if (!event) {
    return <Navigate to="/events" replace />
  }

  return (
    <article className="event-detail">
      <BackLink to="/events">All events</BackLink>

      <img
        src={asset(`/assets/${event.image}`)}
        alt={event.title}
        className="event-detail__photo"
      />

      <div className="event-detail__panel">
        <h1>{event.title}</h1>
        <p className="event-detail__date">
          {formatDateRange(event.startDate, event.endDate)}
        </p>

        <div className="event-detail__body">
          <Markdown>{event.description}</Markdown>
        </div>

        {event.participants && event.participants.length > 0 && (
          <div className="event-detail__participants">
            <h2>Participants</h2>
            <ul>
              {event.participants.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        )}

        {event.extra && <p className="event-detail__extra">{event.extra}</p>}
      </div>
    </article>
  )
}

export default EventDetail
