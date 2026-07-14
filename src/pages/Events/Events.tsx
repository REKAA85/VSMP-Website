import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import BackLink from '../../components/BackLink/BackLink'
import { formatDateRange, loadEvents } from '../../data/events'
import './Events.scss'

function Events() {
  const events = useMemo(loadEvents, [])

  return (
    <div className="events">
      <BackLink to="/">Back home</BackLink>
      <h1 className="events__heading">Events</h1>

      <div className="events__grid">
        {events.map((event) => (
          <Link
            key={event.slug}
            to={`/events/${event.slug}`}
            className="events__card"
          >
            <img
              src={`/assets/${event.image}`}
              alt={event.title}
              className="events__photo"
            />
            <div className="events__body">
              <h2>{event.title}</h2>
              <p className="events__date">
                {formatDateRange(event.startDate, event.endDate)}
              </p>
              <p className="events__description">
                {event.description.split(/\n\s*\n/)[0]}
              </p>
              <span className="events__read-more">Read more &rarr;</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Events
