import { FiExternalLink } from 'react-icons/fi'

// Renders a single product entry: an optionally clickable name, tagline,
// achievement/status lines, description, "what I built" highlights, and the
// tech stack. The external-link icon is tagged `export-hide`.
export function ProductEntry({ productEntry }) {
  return (
    <div>
      <p className="text-[14.5px]">
        {productEntry.url ? (
          <a
            href={productEntry.url}
            target="_blank"
            rel="noreferrer"
            title={productEntry.url}
            className="font-semibold hover:underline"
          >
            {productEntry.name}
            <FiExternalLink
              size={13}
              className="export-hide ml-1 inline-block align-middle text-neutral-500"
            />
          </a>
        ) : (
          <strong className="font-semibold">{productEntry.name}</strong>
        )}{' '}
        — {productEntry.tagline}
      </p>

      {productEntry.achievement && (
        <p className="text-[13px] font-semibold text-neutral-700">{productEntry.achievement}</p>
      )}
      {productEntry.status && (
        <p className="text-[13px] font-semibold text-neutral-700">{productEntry.status}</p>
      )}

      <p className="mt-0.5 text-[13.5px] text-neutral-700">{productEntry.description}</p>
      {productEntry.highlights && (
        <ul className="mt-1 list-disc space-y-1 pl-[18px] text-[13.5px] text-neutral-700">
          {productEntry.highlights.map((highlightText, highlightIndex) => (
            <li key={highlightIndex}>{highlightText}</li>
          ))}
        </ul>
      )}
      <p className="mt-1 text-[13px] text-neutral-500">
        <strong className="font-semibold">Tech:</strong> {productEntry.tech}
      </p>
    </div>
  )
}
