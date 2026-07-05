// Renders a single skill category (e.g. "Frontend Development") together with
// its bulleted list of labelled skill items.
export function SkillCategoryGroup({ skillCategory }) {
  return (
    <div className="avoid-break">
      <h3 className="mb-1 text-sm font-bold text-neutral-900">{skillCategory.group}</h3>
      <ul className="list-disc space-y-0.5 pl-[18px] text-[13.5px] text-neutral-700">
        {skillCategory.items.map((skillItem, skillItemIndex) => (
          <li key={skillItemIndex}>
            {skillItem.label && (
              <strong className="font-semibold">{skillItem.label}: </strong>
            )}
            {skillItem.value}
          </li>
        ))}
      </ul>
    </div>
  )
}
