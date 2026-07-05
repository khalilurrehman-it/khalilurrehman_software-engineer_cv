import { useLayoutEffect, useRef } from 'react'
import { FiDownload, FiX } from 'react-icons/fi'
import { PaginatedCurriculumVitae } from './PaginatedCurriculumVitae'

// A full-screen modal that previews the CV as real A4 pages and lets the user
// insert or remove page breaks by clicking the control that appears between
// blocks. The preview and the exported PDF are produced from the same pages, so
// what you see is exactly what downloads.
export function PdfPreviewModal({
  manualBreakBeforeIds,
  onToggleBreakBefore,
  isGeneratingPdf,
  onRequestDownload,
  onRequestClose,
}) {
  const scrollContainerRef = useRef(null)
  const previewPagesContainerRef = useRef(null)

  // Open scrolled to the top and freeze the background page from scrolling, so
  // the preview lands in a consistent position every time it is opened.
  useLayoutEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0
    }
    const previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousBodyOverflow
    }
  }, [])

  return (
    <div
      className="no-print fixed inset-0 z-50 flex flex-col bg-black/60 backdrop-blur-sm"
      onClick={onRequestClose}
    >
      {/* Modal toolbar */}
      <div
        className="flex items-center justify-between gap-3 border-b border-neutral-700 bg-neutral-900 px-4 py-3 text-white"
        onClick={(clickEvent) => clickEvent.stopPropagation()}
      >
        <span className="text-sm font-semibold">
          PDF Preview
          <span className="ml-2 font-normal text-neutral-400">
            hover between blocks and click “＋ Page break” to split a page
          </span>
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onRequestDownload(previewPagesContainerRef.current)}
            disabled={isGeneratingPdf}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-white px-3.5 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiDownload size={15} /> {isGeneratingPdf ? 'Generating…' : 'Download PDF'}
          </button>
          <button
            onClick={onRequestClose}
            aria-label="Close preview"
            className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-neutral-600 p-2 text-white transition hover:bg-neutral-800"
          >
            <FiX size={16} />
          </button>
        </div>
      </div>

      {/* Scrollable preview area with the interactive A4 pages */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-auto p-4 sm:p-8"
        onClick={onRequestClose}
      >
        <div className="mx-auto w-fit" onClick={(clickEvent) => clickEvent.stopPropagation()}>
          <PaginatedCurriculumVitae
            manualBreakBeforeIds={manualBreakBeforeIds}
            interactive
            onToggleBreakBefore={onToggleBreakBefore}
            pagesContainerRef={previewPagesContainerRef}
          />
        </div>
      </div>
    </div>
  )
}
