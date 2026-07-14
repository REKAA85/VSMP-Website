import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import './BackLink.scss'

interface BackLinkProps {
  to: string
  children: ReactNode
}

function BackLink({ to, children }: BackLinkProps) {
  return (
    <Link to={to} className="back-link">
      &larr; {children}
    </Link>
  )
}

export default BackLink
