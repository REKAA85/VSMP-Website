import BackLink from '../../components/BackLink/BackLink'
import staffData from '../../data/staff.json'
import { asset } from '../../lib/asset'
import './Staff.scss'

interface StaffMember {
  name: string
  title: string
  info: string
  image: string
}

interface StaffSection {
  section: string
  members: StaffMember[]
}

const sections = staffData as StaffSection[]

function Staff() {
  return (
    <div className="staff">
      
      <div className="staff__bg" aria-hidden="true">
        <div className="staff__bg-color" />
      </div>

      <div className="staff__content">
        <BackLink to="/">Back home</BackLink>
        <h1 className="staff__heading">Staff</h1>

        {sections.map(({ section, members }) => (
          <section key={section} className="staff__section">
            <h2>{section}</h2>
            <div className="staff__grid">
              {members.map((member) => (
                <div key={member.name} className="staff__card">
                  <img
                    src={asset(`/assets/staff/${member.image}`)}
                    alt={member.name}
                    className="staff__photo"
                  />
                  <h3>{member.name}</h3>
                  <p className="staff__title">{member.title}</p>
                  <p className="staff__info">{member.info}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default Staff
