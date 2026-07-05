// ─────────────────────────────────────────────────────────────
//  Fixed geometry for the on-screen A4 pages. Content is measured
//  and packed against these dimensions so every page has real,
//  consistent top/bottom/left/right margins — and each page can be
//  exported to the PDF one-to-one (no image slicing).
// ─────────────────────────────────────────────────────────────

// On-screen page size in CSS pixels (A4 aspect ratio: 210mm × 297mm).
export const PAGE_WIDTH_IN_PIXELS = 820
export const PAGE_HEIGHT_IN_PIXELS = Math.round((PAGE_WIDTH_IN_PIXELS * 297) / 210) // 1160

// Page margins (the white space framing the content on every page).
export const HORIZONTAL_PAGE_PADDING_IN_PIXELS = 56
export const TOP_PAGE_PADDING_IN_PIXELS = 44
export const BOTTOM_PAGE_PADDING_IN_PIXELS = 48

// The usable content area inside the margins.
export const CONTENT_WIDTH_IN_PIXELS =
  PAGE_WIDTH_IN_PIXELS - 2 * HORIZONTAL_PAGE_PADDING_IN_PIXELS // 708
export const CONTENT_HEIGHT_IN_PIXELS =
  PAGE_HEIGHT_IN_PIXELS - TOP_PAGE_PADDING_IN_PIXELS - BOTTOM_PAGE_PADDING_IN_PIXELS // 1068

// Vertical gap rendered (and reserved during packing) between two blocks.
export const BLOCK_VERTICAL_GAP_IN_PIXELS = 14

// Distributes the ordered content blocks across pages. A new page is started
// when the caller has forced a manual break before a block, or when adding the
// block would overflow the usable content height.
export function paginateBlocksIntoPages(orderedBlocks, blockHeightById, manualBreakBeforeIds) {
  if (!blockHeightById) return [orderedBlocks]

  const pages = []
  let currentPageBlocks = []
  let currentPageHeight = 0

  for (const block of orderedBlocks) {
    const blockHeight = blockHeightById[block.id] ?? 0
    const wouldOverflow =
      currentPageBlocks.length > 0 &&
      currentPageHeight + blockHeight > CONTENT_HEIGHT_IN_PIXELS
    const hasManualBreak =
      currentPageBlocks.length > 0 && manualBreakBeforeIds.has(block.id)

    if (wouldOverflow || hasManualBreak) {
      pages.push(currentPageBlocks)
      currentPageBlocks = []
      currentPageHeight = 0
    }

    currentPageBlocks.push(block)
    currentPageHeight += blockHeight + BLOCK_VERTICAL_GAP_IN_PIXELS
  }

  if (currentPageBlocks.length > 0) pages.push(currentPageBlocks)
  return pages
}
