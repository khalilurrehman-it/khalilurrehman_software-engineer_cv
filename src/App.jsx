import { useRef, useState } from 'react'
import { FiDownload, FiEye } from 'react-icons/fi'
import { PaginatedCurriculumVitae } from './components/PaginatedCurriculumVitae'
import { PdfPreviewModal } from './components/PdfPreviewModal'
import { getDefaultManualBreakBeforeIds } from './cvBlocks'
import { downloadCvPdf } from './exportPdf'

// The filename used when the visitor downloads the generated CV as a PDF.
const CURRICULUM_VITAE_PDF_FILENAME = 'Khalil Ur Rehman Software Engineer.pdf'

export default function App() {
  const pagesContainerRef = useRef(null)
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)

  // Ids of blocks that should start on a new page. Seeded from cvData.js and
  // then edited interactively from the preview. Shared by the on-page pages and
  // the preview so both — and the exported PDF — stay identical.
  const [manualBreakBeforeIds, setManualBreakBeforeIds] = useState(
    () => new Set(getDefaultManualBreakBeforeIds()),
  )

  function toggleManualBreakBefore(blockId) {
    setManualBreakBeforeIds((previousIds) => {
      const nextIds = new Set(previousIds)
      if (nextIds.has(blockId)) nextIds.delete(blockId)
      else nextIds.add(blockId)
      return nextIds
    })
  }

  // Renders the pages inside the given container (the on-page pages by default,
  // or the preview's pages when triggered from the modal) into a PDF file.
  async function generateAndDownloadPdf(sourcePagesContainer) {
    if (isGeneratingPdf) return
    setIsGeneratingPdf(true)
    try {
      await downloadCvPdf(
        sourcePagesContainer ?? pagesContainerRef.current,
        CURRICULUM_VITAE_PDF_FILENAME,
      )
    } catch (pdfGenerationError) {
      console.error('PDF export failed:', pdfGenerationError)
      alert('Sorry, the PDF could not be generated. Please try again.')
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  return (
    <div className="px-4 pb-16 pt-8">
      {/* Toolbar */}
      <div className="no-print mx-auto mb-5 flex max-w-[820px] items-center justify-between gap-3">
        <p className="text-sm text-neutral-500">
          Tip: open <span className="font-semibold text-neutral-700">Preview</span> to add or
          remove page breaks.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setIsPreviewModalOpen(true)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-800 shadow-sm transition hover:bg-neutral-100 active:translate-y-px"
          >
            <FiEye size={16} /> Preview
          </button>
          <button
            onClick={() => generateAndDownloadPdf()}
            disabled={isGeneratingPdf}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-black active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiDownload size={16} /> {isGeneratingPdf ? 'Generating…' : 'Download PDF'}
          </button>
        </div>
      </div>

      {/* The live, paginated CV pages */}
      <PaginatedCurriculumVitae
        manualBreakBeforeIds={manualBreakBeforeIds}
        pagesContainerRef={pagesContainerRef}
      />

      {/* Interactive PDF preview with clickable page-break controls */}
      {isPreviewModalOpen && (
        <PdfPreviewModal
          manualBreakBeforeIds={manualBreakBeforeIds}
          onToggleBreakBefore={toggleManualBreakBefore}
          isGeneratingPdf={isGeneratingPdf}
          onRequestDownload={generateAndDownloadPdf}
          onRequestClose={() => setIsPreviewModalOpen(false)}
        />
      )}
    </div>
  )
}
