// ═══════════════════════════════════════════════════════════════
// [F095-PDF] src/lib/parsers/pdf-parser.ts
// PDF Parser using pdf-parse
// ═══════════════════════════════════════════════════════════════

/**
 * Parses a PDF file and extracts text.
 * This function only works on the server as it depends on Node.js internals via pdf-parse.
 */
export async function parsePdf(file: File): Promise<{ text: string }> {
    if (typeof window !== 'undefined') {
        throw new Error('PDF parsing is not supported in the browser. Please use the server-side extraction.');
    }

    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        if (buffer.length === 0) {
            throw new Error('PDF file is empty');
        }

        // Dynamic import logic for better compatibility
        const pdfParseModule = (await import('pdf-parse')) as any;
        // Handle common variations in how pdf-parse is exported
        const pdfParse = pdfParseModule.default || pdfParseModule.pdfParse || pdfParseModule;
        const data = await pdfParse(buffer);

        if (!data.text || data.text.trim().length === 0) {
            throw new Error('PDF contains no extractable text. It might be a scanned document (image).');
        }

        console.log(`[PDF Parser] Successfully extracted ${data.text.length} characters from ${data.numpages} pages.`);

        return {
            text: data.text
        };
    } catch (error: any) {
        console.error('[PDF Parser] Error:', error);
        throw new Error(`Failed to parse PDF: ${error.message || 'Unknown error'}`);
    }
}
