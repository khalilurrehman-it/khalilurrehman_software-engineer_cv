import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { buildCurriculumVitaeBlocks } from '../cvBlocks'
import {
  BLOCK_VERTICAL_GAP_IN_PIXELS,
  BOTTOM_PAGE_PADDING_IN_PIXELS,
  CONTENT_WIDTH_IN_PIXELS,
  HORIZONTAL_PAGE_PADDING_IN_PIXELS,
  PAGE_HEIGHT_IN_PIXELS,
  PAGE_WIDTH_IN_PIXELS,
  TOP_PAGE_PADDING_IN_PIXELS,
  paginateBlocksIntoPages,
} from '../pageGeometry'

// A clickable control rendered in the gap after a block (interactive mode only)
// that toggles a forced page break before the following block.
function PageBreakToggleControl({ isActive, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      title={isActive ? 'Remove page break' : 'Insert page break here'}
      className="export-hide group/break absolute inset-x-0 -bottom-3 z-10 flex h-6 cursor-pointer items-center justify-center"
    >
      {isActive ? (
        <span className="flex items-center gap-1 rounded bg-rose-500 px-2 py-0.5 text-[10px] font-semibold text-white shadow">
          ✕ Remove page break
        </span>
      ) : (
        <span className="flex items-center gap-1 rounded bg-neutral-800 px-2 py-0.5 text-[10px] font-semibold text-white opacity-0 shadow transition group-hover/break:opacity-100">
          ＋ Page break
        </span>
      )}
    </button>
  )
}

// Renders the CV as a stack of real A4 pages. Block heights are measured off
// screen at the exact content width, then packed into pages honouring both the
// forced manual breaks and automatic overflow breaks. In interactive mode a
// break toggle is shown after every block.
export function PaginatedCurriculumVitae({
  manualBreakBeforeIds,
  interactive = false,
  onToggleBreakBefore,
  pagesContainerRef,
}) {
  const orderedBlocks = useMemo(() => buildCurriculumVitaeBlocks(), [])
  const measuringContainerRef = useRef(null)
  const [blockHeightById, setBlockHeightById] = useState(null)

  // Measure each block's height off screen, re-measuring when fonts finish
  // loading or the layout changes so pagination stays accurate.
  useLayoutEffect(() => {
    const measuringContainer = measuringContainerRef.current
    if (!measuringContainer) return

    const measureBlockHeights = () => {
      const nextHeightById = {}
      measuringContainer.querySelectorAll('[data-block-id]').forEach((blockElement) => {
        nextHeightById[blockElement.getAttribute('data-block-id')] =
          blockElement.getBoundingClientRect().height
      })
      setBlockHeightById(nextHeightById)
    }

    measureBlockHeights()
    const resizeObserver = new ResizeObserver(measureBlockHeights)
    resizeObserver.observe(measuringContainer)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measureBlockHeights).catch(() => {})
    }
    return () => resizeObserver.disconnect()
  }, [orderedBlocks])

  const nextBlockIdByBlockId = useMemo(() => {
    const mapping = {}
    orderedBlocks.forEach((block, blockIndex) => {
      mapping[block.id] = orderedBlocks[blockIndex + 1]?.id ?? null
    })
    return mapping
  }, [orderedBlocks])

  const pages = useMemo(
    () => paginateBlocksIntoPages(orderedBlocks, blockHeightById, manualBreakBeforeIds),
    [orderedBlocks, blockHeightById, manualBreakBeforeIds],
  )

  return (
    <>
      {/* Off-screen measuring container (never visible, never exported) */}
      <div
        ref={measuringContainerRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: '-10000px',
          top: 0,
          width: `${CONTENT_WIDTH_IN_PIXELS}px`,
          visibility: 'hidden',
          pointerEvents: 'none',
        }}
        className="text-neutral-900"
      >
        {orderedBlocks.map((block) => (
          <div key={block.id} data-block-id={block.id} style={{ marginBottom: BLOCK_VERTICAL_GAP_IN_PIXELS }}>
            {block.node}
          </div>
        ))}
      </div>

      {/* The visible, paginated A4 pages */}
      <div ref={pagesContainerRef} className="flex flex-col items-center gap-6">
        {pages.map((pageBlocks, pageIndex) => (
          <div
            key={pageIndex}
            className="cv-page-sheet relative bg-white text-neutral-900 shadow-[0_6px_24px_rgba(0,0,0,0.12)]"
            style={{
              width: `${PAGE_WIDTH_IN_PIXELS}px`,
              height: `${PAGE_HEIGHT_IN_PIXELS}px`,
              paddingLeft: `${HORIZONTAL_PAGE_PADDING_IN_PIXELS}px`,
              paddingRight: `${HORIZONTAL_PAGE_PADDING_IN_PIXELS}px`,
              paddingTop: `${TOP_PAGE_PADDING_IN_PIXELS}px`,
              paddingBottom: `${BOTTOM_PAGE_PADDING_IN_PIXELS}px`,
              overflow: 'hidden',
            }}
          >
            {pageBlocks.map((block) => {
              const nextBlockId = nextBlockIdByBlockId[block.id]
              return (
                <div
                  key={block.id}
                  className="relative"
                  style={{ marginBottom: BLOCK_VERTICAL_GAP_IN_PIXELS }}
                >
                  {block.node}
                  {interactive && nextBlockId && (
                    <PageBreakToggleControl
                      isActive={manualBreakBeforeIds.has(nextBlockId)}
                      onToggle={() => onToggleBreakBefore(nextBlockId)}
                    />
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </>
  )
}
