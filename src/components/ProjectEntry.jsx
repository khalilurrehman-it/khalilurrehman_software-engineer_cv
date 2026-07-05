// Renders a single project entry: name, tagline, description, optional
// "what I built" highlights, and the tech stack line.
export function ProjectEntry({ projectEntry }) {
  return (
    <div>
      <p className="text-[14.5px]">
        <strong className="font-semibold">{projectEntry.name}</strong> — {projectEntry.tagline}
      </p>
      <p className="text-[13.5px] text-neutral-700">{projectEntry.description}</p>
      {projectEntry.highlights && (
        <ul className="mt-1 list-disc space-y-1 pl-[18px] text-[13.5px] text-neutral-700">
          {projectEntry.highlights.map((highlightText, highlightIndex) => (
            <li key={highlightIndex}>{highlightText}</li>
          ))}
        </ul>
      )}
      <p className="mt-1 text-[13px] text-neutral-500">
        <strong className="font-semibold">Tech:</strong> {projectEntry.tech}
      </p>
    </div>
  )
}
