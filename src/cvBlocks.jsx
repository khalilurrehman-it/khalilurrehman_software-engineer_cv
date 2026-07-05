import { cv } from './cvData'
import { CurriculumVitaeHeader } from './components/CurriculumVitaeHeader'
import { SectionHeading } from './components/SectionHeading'
import { SkillCategoryGroup } from './components/SkillCategoryGroup'
import { EntryDateAndLocationColumn } from './components/EntryDateAndLocationColumn'
import { ExperienceEntry } from './components/ExperienceEntry'
import { ProductEntry } from './components/ProductEntry'
import { ProjectEntry } from './components/ProjectEntry'

// ─────────────────────────────────────────────────────────────
//  The CV as a flat, ordered list of atomic "blocks". A page break
//  may be forced before any block, and blocks are never split across
//  pages. The first entry of each section carries that section's
//  heading so a heading is never orphaned from its content.
// ─────────────────────────────────────────────────────────────

function SkillsBlockContent() {
  const leftColumnSkillCategories = cv.skills.filter((category) => category.side !== 'right')
  const rightColumnSkillCategories = cv.skills.filter((category) => category.side === 'right')
  return (
    <div>
      <SectionHeading>Skills</SectionHeading>
      <div className="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
        <div className="space-y-3">
          {leftColumnSkillCategories.map((skillCategory) => (
            <SkillCategoryGroup key={skillCategory.group} skillCategory={skillCategory} />
          ))}
        </div>
        <div className="space-y-3">
          {rightColumnSkillCategories.map((skillCategory) => (
            <SkillCategoryGroup key={skillCategory.group} skillCategory={skillCategory} />
          ))}
        </div>
      </div>
    </div>
  )
}

function EducationBlockContent() {
  return (
    <div>
      <SectionHeading>Education</SectionHeading>
      {cv.education.map((educationEntry, educationEntryIndex) => (
        <div
          key={educationEntryIndex}
          className={educationEntryIndex < cv.education.length - 1 ? 'mb-3' : ''}
        >
          <div className="flex items-baseline justify-between gap-4">
            <div className="text-[14.5px]">
              <strong className="font-semibold">{educationEntry.degree}</strong>
              <div className="text-[13.5px] italic text-neutral-500">
                {educationEntry.institution}
              </div>
            </div>
            <EntryDateAndLocationColumn>
              {educationEntry.date}
              <br />
              {educationEntry.location}
            </EntryDateAndLocationColumn>
          </div>
        </div>
      ))}
    </div>
  )
}

function CoursesBlockContent() {
  return (
    <div>
      <SectionHeading>Courses</SectionHeading>
      {cv.courses.map((courseEntry, courseEntryIndex) => (
        <div key={courseEntryIndex} className="flex justify-between text-sm">
          <span>
            <strong className="font-semibold">{courseEntry.name}</strong>, {courseEntry.provider}
          </span>
          <span className="text-[13px] text-neutral-500">{courseEntry.date}</span>
        </div>
      ))}
    </div>
  )
}

function LanguagesBlockContent() {
  return (
    <div>
      <SectionHeading>Languages</SectionHeading>
      <div className="flex gap-10 text-sm font-semibold">
        {cv.languages.map((languageName) => (
          <span key={languageName}>{languageName}</span>
        ))}
      </div>
    </div>
  )
}

// Builds the ordered block list. Each block has a stable `id`, its rendered
// `node`, and a `defaultBreakBefore` flag seeded from the `pageBreakAfter`
// flags in cvData.js (a break after an entry becomes a break before the next).
export function buildCurriculumVitaeBlocks() {
  const blocks = []

  blocks.push({ id: 'header', node: <CurriculumVitaeHeader /> })
  blocks.push({ id: 'skills', node: <SkillsBlockContent /> })

  cv.experience.forEach((experienceEntry, experienceIndex) => {
    blocks.push({
      id: `experience-${experienceIndex}`,
      defaultBreakBefore:
        experienceIndex > 0 && cv.experience[experienceIndex - 1].pageBreakAfter === true,
      node: (
        <>
          {experienceIndex === 0 && <SectionHeading>Professional Experience</SectionHeading>}
          <ExperienceEntry experienceEntry={experienceEntry} />
        </>
      ),
    })
  })

  cv.products.forEach((productEntry, productIndex) => {
    blocks.push({
      id: `product-${productIndex}`,
      defaultBreakBefore:
        productIndex > 0 && cv.products[productIndex - 1].pageBreakAfter === true,
      node: (
        <>
          {productIndex === 0 && <SectionHeading>Products</SectionHeading>}
          <ProductEntry productEntry={productEntry} />
        </>
      ),
    })
  })

  cv.projects.forEach((projectEntry, projectIndex) => {
    blocks.push({
      id: `project-${projectIndex}`,
      defaultBreakBefore:
        projectIndex > 0 && cv.projects[projectIndex - 1].pageBreakAfter === true,
      node: (
        <>
          {projectIndex === 0 && <SectionHeading>Projects</SectionHeading>}
          <ProjectEntry projectEntry={projectEntry} />
        </>
      ),
    })
  })

  blocks.push({ id: 'education', node: <EducationBlockContent /> })
  blocks.push({ id: 'courses', node: <CoursesBlockContent /> })
  blocks.push({ id: 'languages', node: <LanguagesBlockContent /> })

  return blocks
}

// The block ids that should start on a new page by default, derived from the
// `pageBreakAfter` flags in cvData.js.
export function getDefaultManualBreakBeforeIds() {
  return buildCurriculumVitaeBlocks()
    .filter((block) => block.defaultBreakBefore)
    .map((block) => block.id)
}
