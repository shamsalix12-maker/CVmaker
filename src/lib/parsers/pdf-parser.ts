// ═══════════════════════════════════════════════════════════════
// [F095-PDF] src/lib/parsers/pdf-parser.ts
// PDF Parser using pdf-parse
// ═══════════════════════════════════════════════════════════════

// @ts-ignore
import pdf from 'pdf-parse';

/**
 * Parses a PDF file and extracts text
 */
export async function parsePdf(file: File): Promise<{ text: string }> {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const data = await pdf(buffer);

        return {
            text: data.text
        };
    } catch (error: any) {
        console.error('Error parsing PDF:', error);
        throw new Error(`Failed to parse PDF: ${error.message}`);
    }
}
