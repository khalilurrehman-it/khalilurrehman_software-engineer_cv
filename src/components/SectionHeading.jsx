// Renders the underlined heading that introduces each curriculum vitae section
// (e.g. "Skills", "Professional Experience", "Products").
export function SectionHeading({ children }) {
  return (
    <h2 className="mb-2 border-b-2 border-neutral-900 pb-1 text-[15px] font-bold tracking-wide text-neutral-900">
      {children}
    </h2>
  )
}
