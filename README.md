# CV Builder — Khalil Ur Rehman

A personal résumé/CV built as a small React app so it can be updated by editing
plain data — no redesigning in Canva or any other tool. The CV renders as real
A4 pages in the browser, lets you place page breaks visually, and exports a
pixel-accurate, clickable PDF.

## Why

Editing a CV in a design tool means re-laying-out everything for every small
change. Here, all the content lives in one file (`src/cvData.js`). Change the
text and the layout, pagination, and PDF update automatically.

## Features

- **Data-driven** — the entire CV is generated from `src/cvData.js`. Add a job,
  project, or skill by editing an array; the page rebuilds itself.
- **Real A4 pages** — content is measured and packed into true A4-proportioned
  pages with consistent margins (not one long scroll).
- **Interactive page breaks** — open **Preview**, hover between any two blocks,
  and click **＋ Page break** to force a break (or remove one). What you see is
  exactly what you download.
- **Automatic pagination** — content that overflows a page flows to the next one
  automatically, and entries are never split across a page.
- **Direct PDF download** — one click generates and downloads the PDF (no browser
  print dialog).
- **Clickable links in the PDF** — email, phone, LinkedIn, GitHub, and the
  company/project/product links stay clickable in the exported file.

## Tech stack

- **React 19** + **Vite** (with the React Compiler)
- **Tailwind CSS v4** for styling
- **react-icons** for icons
- **jsPDF** + **html2canvas-pro** for PDF export (loaded on demand)

## Getting started

```bash
# install dependencies
npm install

# start the dev server (http://localhost:5173)
npm run dev

# type-check / lint
npm run lint

# production build
npm run build

# preview the production build
npm run preview
```

## Editing the CV

Open **`src/cvData.js`** — it holds every piece of content: name, title,
contacts, skills, experience, products, projects, education, courses, and
languages. A few conventions:

- **Skills columns** — each skill group has a `side: 'left' | 'right'` field
  that decides which column it appears in.
- **Links** — experience entries and products can include a `website` / `url`
  which makes the name clickable (and clickable in the PDF).
- **Products** — support optional `achievement`, `status`, `url`, and
  `highlights` fields.
- **Default page break** — add `pageBreakAfter: true` to an entry to make the
  page break after it by default (you can still adjust breaks live in Preview).

## Project structure

```
src/
  cvData.js                 # ← all CV content (edit this)
  cvBlocks.jsx              # turns the data into ordered, page-breakable blocks
  pageGeometry.js           # A4 page dimensions + the pagination algorithm
  exportPdf.js              # renders each page to a PDF page + adds link annotations
  App.jsx                   # toolbar, shared page-break state, layout
  components/
    PaginatedCurriculumVitae.jsx   # measures blocks and renders the A4 pages
    PdfPreviewModal.jsx            # interactive preview with page-break controls
    CurriculumVitaeHeader.jsx      # name, title, contact links
    SectionHeading.jsx
    SkillCategoryGroup.jsx
    ExperienceEntry.jsx
    ProductEntry.jsx
    ProjectEntry.jsx
    EntryDateAndLocationColumn.jsx
```

## How page breaks work

1. The CV is split into atomic **blocks** (header, skills, each experience /
   product / project entry, education, courses, languages).
2. Each block's height is measured off-screen at the exact page content width.
3. Blocks are packed into pages, starting a new page whenever a manual break is
   set or the content would overflow the usable page height.
4. On export, every on-screen A4 page is rendered one-to-one to a PDF page, so
   the download matches the preview exactly.

## License

Personal project — content © Khalil Ur Rehman.
