// The right-aligned date/location column shared by experience and education
// entries. Content is passed as children so each caller controls its own layout
// (e.g. "date · location" on one line, or date and location stacked).
export function EntryDateAndLocationColumn({ children }) {
  return (
    <div className="shrink-0 whitespace-nowrap text-right text-[13px] text-neutral-500">
      {children}
    </div>
  )
}
