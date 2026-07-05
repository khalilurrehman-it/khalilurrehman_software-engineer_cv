import { FiMail, FiPhone } from 'react-icons/fi'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { cv } from '../cvData'

// Maps the `icon` name stored in each contact record to the matching
// react-icons component that should be rendered beside it.
const contactIconComponentByName = {
  mail: FiMail,
  phone: FiPhone,
  linkedin: FaLinkedin,
  github: FaGithub,
}

// The top block of the CV: full name, professional title, optional summary
// paragraph, and the grid of clickable contact links.
export function CurriculumVitaeHeader() {
  return (
    <header className="mb-2">
      <h1 className="text-[32px] font-bold leading-tight tracking-tight text-neutral-900">
        {cv.name}
      </h1>
      <p className="text-base text-neutral-500">{cv.title}</p>

      {cv.summary && (
        <p className="mt-3 max-w-[62ch] text-sm text-neutral-700">{cv.summary}</p>
      )}

      <div className="mt-2 grid grid-cols-1 gap-y-1.5 gap-x-8 sm:grid-cols-2">
        {cv.contacts.map((contactLink) => {
          const ContactIconComponent = contactIconComponentByName[contactLink.icon]
          return (
            <a
              key={contactLink.label}
              href={contactLink.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-neutral-700 hover:underline"
            >
              {ContactIconComponent && (
                <ContactIconComponent className="shrink-0 text-neutral-900" size={15} />
              )}
              <span>{contactLink.label}</span>
            </a>
          )
        })}
      </div>
    </header>
  )
}
