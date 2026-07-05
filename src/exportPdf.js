// Renders each on-screen A4 page (`.cv-page-sheet`) inside the given container
// into its own PDF page and triggers a direct file download (no print dialog).
// Because every page is already an A4-proportioned sheet with its own margins,
// each one maps one-to-one onto a PDF page — no image slicing, so margins and
// page breaks match the preview exactly.
// Every real <a href> is re-added as a clickable link annotation on top of the
// page image, so links (email, LinkedIn, GitHub, company/product sites) work in
// the exported PDF.
// Elements with the class `export-hide` are removed from the exported PDF.
// jsPDF + html2canvas-pro are loaded on demand to keep the initial bundle small.
export async function downloadCvPdf(pagesContainer, filename = 'CV.pdf') {
  if (!pagesContainer) return

  const [{ jsPDF }, { default: html2canvas }] = await Promise.all([
    import('jspdf'),
    import('html2canvas-pro'),
  ])

  const pageSheets = Array.from(pagesContainer.querySelectorAll('.cv-page-sheet'))
  if (pageSheets.length === 0) return

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  })
  const pageWidthInMm = pdf.internal.pageSize.getWidth() // 210
  const pageHeightInMm = pdf.internal.pageSize.getHeight() // 297

  for (let pageIndex = 0; pageIndex < pageSheets.length; pageIndex += 1) {
    const pageSheet = pageSheets[pageIndex]

    const canvas = await html2canvas(pageSheet, {
      scale: 2, // higher resolution for crisp text
      useCORS: true,
      backgroundColor: '#ffffff',
      onclone: (clonedDocument) => {
        clonedDocument.querySelectorAll('.export-hide').forEach((element) => {
          element.style.display = 'none'
        })
      },
    })

    const imageData = canvas.toDataURL('image/jpeg', 0.92)
    if (pageIndex > 0) pdf.addPage()
    pdf.addImage(imageData, 'JPEG', 0, 0, pageWidthInMm, pageHeightInMm, undefined, 'FAST')

    addClickableLinkAnnotations(pdf, pageSheet, pageWidthInMm, pageHeightInMm)
  }

  pdf.save(filename)
}

// Overlays a clickable link annotation over every <a href> on the page image,
// converting each anchor's on-screen position into PDF millimetres.
function addClickableLinkAnnotations(pdf, pageSheet, pageWidthInMm, pageHeightInMm) {
  const sheetRect = pageSheet.getBoundingClientRect()
  if (!sheetRect.width || !sheetRect.height) return

  const pixelsToMmX = pageWidthInMm / sheetRect.width
  const pixelsToMmY = pageHeightInMm / sheetRect.height

  pageSheet.querySelectorAll('a[href]').forEach((anchorElement) => {
    const url = anchorElement.href
    if (!url) return

    const anchorRect = anchorElement.getBoundingClientRect()
    if (!anchorRect.width || !anchorRect.height) return

    const xInMm = (anchorRect.left - sheetRect.left) * pixelsToMmX
    const yInMm = (anchorRect.top - sheetRect.top) * pixelsToMmY
    const widthInMm = anchorRect.width * pixelsToMmX
    const heightInMm = anchorRect.height * pixelsToMmY

    pdf.link(xInMm, yInMm, widthInMm, heightInMm, { url })
  })
}
