import BackLink from '../../components/BackLink/BackLink'
import './ComingSoon.scss'

function ComingSoon({ title }: { title: string }) {
  return (
    <div className="coming-soon">
      <h1>{title}</h1>
      <p>This page is on its way.</p>
      <BackLink to="/">Back home</BackLink>
    </div>
  )
}

export default ComingSoon
