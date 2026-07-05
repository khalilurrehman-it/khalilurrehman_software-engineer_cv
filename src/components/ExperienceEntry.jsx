import { FiExternalLink } from 'react-icons/fi'
import { EntryDateAndLocationColumn } from './EntryDateAndLocationColumn'

// Renders a single professional-experience entry: role, an optionally clickable
// company name, the date/location column, and the achievement bullet points.
// The external-link icon is tagged `export-hide` so it is stripped from the PDF.
export function ExperienceEntry({ experienceEntry }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <div className="text-[14.5px]">
          <strong className="font-semibold">{experienceEntry.role}</strong>
          {experienceEntry.website ? (
            <a
              href={experienceEntry.website}
              target="_blank"
              rel="noreferrer"
              title={experienceEntry.website}
              className="italic text-neutral-500 hover:text-neutral-900 hover:underline"
            >
              , {experienceEntry.company}
              <FiExternalLink size={13} className="export-hide ml-1 inline-block align-middle" />
            </a>
          ) : (
            <span className="italic text-neutral-500">, {experienceEntry.company}</span>
          )}
        </div>
        <EntryDateAndLocationColumn>
          {experienceEntry.date} · {experienceEntry.location}
        </EntryDateAndLocationColumn>
      </div>
      <ul className="mt-1.5 list-disc space-y-1 pl-[18px] text-[13.5px] text-neutral-700">
        {experienceEntry.bullets.map((bulletText, bulletIndex) => (
          <li key={bulletIndex}>{bulletText}</li>
        ))}
      </ul>
    </div>
  )
}
