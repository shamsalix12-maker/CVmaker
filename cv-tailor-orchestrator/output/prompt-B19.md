# BLOCK B19: Export System (Word & Markdown)

## COMPLETED BLOCKS
- B01 ✅: Create Empty Next.js Project — Files: [F001], [F002], [F003], [F004], [F005], [F006], [F007], [F008], [F009]
- B02 ✅: Install All Dependencies — Files: [F027], [F028], [F029], [F030], [F031], [F032], [F033], [F034], [F035], [F036], [F090], [F091]
- B03 ✅: Central TypeScript Types — Files: [F079]
- B04 ✅: Constants and Utilities — Files: [F078], [F080]
- B05 ✅: Internationalization (i18n) System — Files: [F086], [F087], [F088], [F089]
- B06 ✅: Supabase Connection and Database Setup — Files: [F063], [F064], [F065], [F093], [F094]
- B07 ✅: Development Auth (Temporary Login) — Files: [F089], [F090], [F091], [F092]
- B08 ✅: Main Layout (Header + Sidebar + Footer) — Files: [F037], [F038], [F039], [F040], [F093], [F094], [F012]
- B09 ✅: File Parsers (Word + Markdown) — Files: [F072], [F073], [F095]
- B10 ✅: AI Provider Interface (Abstract Layer) — Files: [F066], [F067], [F068], [F069], [F070], [F104]
- B11 ✅: API Key Encryption and Storage — Files: [F077], [F105], [F106], [F081]
- B12 ✅: AI-Powered CV Field Extraction — Files: [F074], [F107], [F108], [F109], [F110]
- B17 ✅: Prompt Management System — Files: [F024], [F118], [F119], [F120], [F121], [F083], [F045], [F046], [F047], [F048], [F122], [F123], [F015], [F124]

## GOAL
Create the export system that generates downloadable Word (.docx) and Markdown (.md) files
from the generated documents. This includes proper formatting, styling, and template support.


## FILES TO CREATE
[F075] src/lib/generators/docx-generator.ts
[F076] src/lib/generators/markdown-generator.ts
[F142] src/lib/generators/document-formatter.ts
[F143] src/lib/generators/index.ts
[F025] src/app/api/export/docx/route.ts
[F026] src/app/api/export/markdown/route.ts
[F144] src/app/api/export/all/route.ts

## FILES TO MODIFY
None

## EXISTING FILES YOU MAY IMPORT FROM
[F001] package.json (from B01)
[F002] tsconfig.json (from B01)
[F003] next.config.ts (from B01)
[F004] tailwind.config.ts (from B01)
[F005] .env.local (from B01)
[F006] .env.example (from B01)
[F007] src/app/layout.tsx (from B01)
[F008] src/app/page.tsx (from B01)
[F009] src/app/globals.css (from B01)
[F027] src/components/ui/button.tsx (from B02)
[F028] src/components/ui/input.tsx (from B02)
[F029] src/components/ui/card.tsx (from B02)
[F030] src/components/ui/dialog.tsx (from B02)
[F031] src/components/ui/select.tsx (from B02)
[F032] src/components/ui/textarea.tsx (from B02)
[F033] src/components/ui/tabs.tsx (from B02)
[F034] src/components/ui/badge.tsx (from B02)
[F035] src/components/ui/sonner.tsx (from B02)
[F036] src/components/ui/dropdown-menu.tsx (from B02)
[F090] src/context/AuthContext.tsx (from B07)
[F091] src/components/auth/DevLoginForm.tsx (from B07)
[F079] src/lib/types.ts (from B03)
[F078] src/lib/constants.ts (from B04)
[F080] src/lib/helpers.ts (from B04)
[F086] src/i18n/config.ts (from B05)
[F087] src/i18n/en.json (from B05)
[F088] src/i18n/fa.json (from B05)
[F089] src/lib/auth/dev-auth.ts (from B07)
[F063] src/lib/supabase/client.ts (from B06)
[F064] src/lib/supabase/server.ts (from B06)
[F065] src/lib/supabase/middleware.ts (from B06)
[F093] src/components/layout/MainLayout.tsx (from B08)
[F094] src/components/layout/MobileMenu.tsx (from B08)
[F092] src/components/auth/AuthGuard.tsx (from B07)
[F037] src/components/layout/Header.tsx (from B08)
[F038] src/components/layout/Sidebar.tsx (from B08)
[F039] src/components/layout/Footer.tsx (from B08)
[F040] src/components/layout/LanguageSwitcher.tsx (from B08)
[F012] src/app/[locale]/dashboard/page.tsx (from B08)
[F072] src/lib/parsers/docx-parser.ts (from B09)
[F073] src/lib/parsers/markdown-parser.ts (from B09)
[F095] src/lib/parsers/index.ts (from B09)
[F066] src/lib/ai/ai-provider.ts (from B10)
[F067] src/lib/ai/openai-provider.ts (from B10)
[F068] src/lib/ai/anthropic-provider.ts (from B10)
[F069] src/lib/ai/google-ai-provider.ts (from B10)
[F070] src/lib/ai/ai-factory.ts (from B10)
[F104] src/lib/ai/index.ts (from B10)
[F077] src/lib/encryption.ts (from B11)
[F105] src/app/api/ai/keys/route.ts (from B11)
[F106] src/app/api/ai/validate/route.ts (from B11)
[F081] src/hooks/useAIKeys.ts (from B11)
[F074] src/lib/cv/cv-extractor.ts (from B12)
[F107] src/lib/cv/cv-extraction-prompt.ts (from B12)
[F108] src/lib/cv/cv-validator.ts (from B12)
[F109] src/lib/cv/index.ts (from B12)
[F110] src/app/api/cv/extract/route.ts (from B12)
[F024] src/app/api/prompts/route.ts (from B17)
[F118] src/app/api/prompts/[id]/route.ts (from B17)
[F119] src/lib/prompts/prompt-service.ts (from B17)
[F120] src/lib/prompts/index.ts (from B17)
[F121] src/lib/prompts/default-prompts.ts (from B17)
[F083] src/hooks/usePrompts.ts (from B17)
[F045] src/components/prompts/PromptList.tsx (from B17)
[F046] src/components/prompts/PromptEditor.tsx (from B17)
[F047] src/components/prompts/PromptSelector.tsx (from B17)
[F048] src/components/prompts/PromptCategoryFilter.tsx (from B17)
[F122] src/components/prompts/PromptCard.tsx (from B17)
[F123] src/components/prompts/PromptPreview.tsx (from B17)
[F015] src/app/[locale]/prompts/page.tsx (from B17)
[F124] src/app/[locale]/prompts/loading.tsx (from B17)

## FILES YOU MUST NOT TOUCH
Everything not listed above.

## INSTRUCTIONS
1. Create document-formatter.ts:
   ```typescript
   // ============================================
   // [F142] src/lib/generators/document-formatter.ts
   // ============================================
   
   export interface DocumentSection {
     type: 'heading' | 'paragraph' | 'list' | 'divider';
     level?: 1 | 2 | 3;  // For headings
     content?: string;
     items?: string[];   // For lists
   }
   
   export function parseContentToSections(content: string): DocumentSection[] {
     const sections: DocumentSection[] = [];
     const lines = content.split('\n');
     let currentList: string[] = [];
     
     for (let i = 0; i < lines.length; i++) {
       const line = lines[i].trim();
       
       // Skip empty lines
       if (!line) {
         // Flush any pending list
         if (currentList.length > 0) {
           sections.push({ type: 'list', items: [...currentList] });
           currentList = [];
         }
         continue;
       }
       
       // Check for headings (Markdown style)
       if (line.startsWith('### ')) {
         if (currentList.length > 0) {
           sections.push({ type: 'list', items: [...currentList] });
           currentList = [];
         }
         sections.push({ type: 'heading', level: 3, content: line.slice(4) });
       } else if (line.startsWith('## ')) {
         if (currentList.length > 0) {
           sections.push({ type: 'list', items: [...currentList] });
           currentList = [];
         }
         sections.push({ type: 'heading', level: 2, content: line.slice(3) });
       } else if (line.startsWith('# ')) {
         if (currentList.length > 0) {
           sections.push({ type: 'list', items: [...currentList] });
           currentList = [];
         }
         sections.push({ type: 'heading', level: 1, content: line.slice(2) });
       }
       // Check for list items
       else if (line.startsWith('- ') || line.startsWith('• ') || line.startsWith('* ')) {
         currentList.push(line.slice(2));
       }
       // Check for numbered list
       else if (/^\d+\.\s/.test(line)) {
         currentList.push(line.replace(/^\d+\.\s/, ''));
       }
       // Check for divider
       else if (line === '---' || line === '***' || line === '___') {
         if (currentList.length > 0) {
           sections.push({ type: 'list', items: [...currentList] });
           currentList = [];
         }
         sections.push({ type: 'divider' });
       }
       // Regular paragraph
       else {
         if (currentList.length > 0) {
           sections.push({ type: 'list', items: [...currentList] });
           currentList = [];
         }
         sections.push({ type: 'paragraph', content: line });
       }
     }
     
     // Flush any remaining list
     if (currentList.length > 0) {
       sections.push({ type: 'list', items: currentList });
     }
     
     return sections;
   }
   
   export function cleanText(text: string): string {
     return text
       .replace(/\*\*(.*?)\*\*/g, '$1')  // Remove bold markdown
       .replace(/\*(.*?)\*/g, '$1')       // Remove italic markdown
       .replace(/`(.*?)`/g, '$1')         // Remove code markdown
       .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links, keep text
       .trim();
   }
   
   export function formatDate(date: Date, locale: string = 'en'): string {
     return date.toLocaleDateString(locale === 'fa' ? 'fa-IR' : 'en-US', {
       year: 'numeric',
       month: 'long',
       day: 'numeric'
     });
   }
   ```

2. Create docx-generator.ts:
   ```typescript
   // ============================================
   // [F075] src/lib/generators/docx-generator.ts
   // ============================================
   
   import {
     Document,
     Paragraph,
     TextRun,
     HeadingLevel,
     AlignmentType,
     BorderStyle,
     Packer,
     PageBreak,
     Table,
     TableCell,
     TableRow,
     WidthType,
   } from 'docx';
   import { parseContentToSections, DocumentSection, cleanText } from './document-formatter';
   
   export interface DocxOptions {
     title?: string;
     author?: string;
     type: 'cv' | 'cover_letter' | 'email';
     locale?: 'en' | 'fa';
   }
   
   export async function generateDocx(
     content: string,
     options: DocxOptions
   ): Promise<Buffer> {
     const sections = parseContentToSections(content);
     const paragraphs = sectionsToDocxParagraphs(sections, options);
     
     const doc = new Document({
       creator: options.author || 'CV Tailor',
       title: options.title || 'Document',
       description: `Generated ${options.type} document`,
       styles: {
         paragraphStyles: [
           {
             id: 'Normal',
             name: 'Normal',
             basedOn: 'Normal',
             next: 'Normal',
             run: {
               font: 'Arial',
               size: 24,  // 12pt
             },
             paragraph: {
               spacing: {
                 after: 200,
                 line: 276,  // 1.15 line spacing
               },
             },
           },
           {
             id: 'Heading1',
             name: 'Heading 1',
             basedOn: 'Normal',
             next: 'Normal',
             run: {
               font: 'Arial',
               size: 36,  // 18pt
               bold: true,
               color: '2E74B5',
             },
             paragraph: {
               spacing: {
                 before: 400,
                 after: 200,
               },
             },
           },
           {
             id: 'Heading2',
             name: 'Heading 2',
             basedOn: 'Normal',
             next: 'Normal',
             run: {
               font: 'Arial',
               size: 28,  // 14pt
               bold: true,
               color: '404040',
             },
             paragraph: {
               spacing: {
                 before: 300,
                 after: 150,
               },
             },
           },
         ],
       },
       sections: [
         {
           properties: {
             page: {
               margin: {
                 top: 1440,    // 1 inch
                 right: 1440,
                 bottom: 1440,
                 left: 1440,
               },
             },
           },
           children: paragraphs,
         },
       ],
     });
     
     const buffer = await Packer.toBuffer(doc);
     return Buffer.from(buffer);
   }
   
   function sectionsToDocxParagraphs(
     sections: DocumentSection[],
     options: DocxOptions
   ): Paragraph[] {
     const paragraphs: Paragraph[] = [];
     const isRTL = options.locale === 'fa';
     
     for (const section of sections) {
       switch (section.type) {
         case 'heading':
           paragraphs.push(
             new Paragraph({
               text: cleanText(section.content || ''),
               heading: section.level === 1 
                 ? HeadingLevel.HEADING_1 
                 : section.level === 2 
                   ? HeadingLevel.HEADING_2 
                   : HeadingLevel.HEADING_3,
               alignment: isRTL ? AlignmentType.RIGHT : AlignmentType.LEFT,
               bidirectional: isRTL,
             })
           );
           break;
           
         case 'paragraph':
           paragraphs.push(
             new Paragraph({
               children: [
                 new TextRun({
                   text: cleanText(section.content || ''),
                   font: 'Arial',
                   size: 24,
                 }),
               ],
               alignment: isRTL ? AlignmentType.RIGHT : AlignmentType.LEFT,
               bidirectional: isRTL,
             })
           );
           break;
           
         case 'list':
           for (const item of section.items || []) {
             paragraphs.push(
               new Paragraph({
                 children: [
                   new TextRun({
                     text: `• ${cleanText(item)}`,
                     font: 'Arial',
                     size: 24,
                   }),
                 ],
                 indent: {
                   left: 720,  // 0.5 inch
                 },
                 alignment: isRTL ? AlignmentType.RIGHT : AlignmentType.LEFT,
                 bidirectional: isRTL,
               })
             );
           }
           break;
           
         case 'divider':
           paragraphs.push(
             new Paragraph({
               children: [],
               border: {
                 bottom: {
                   color: 'CCCCCC',
                   space: 1,
                   style: BorderStyle.SINGLE,
                   size: 6,
                 },
               },
               spacing: {
                 before: 200,
                 after: 200,
               },
             })
           );
           break;
       }
     }
     
     return paragraphs;
   }
   
   export async function generateCVDocx(
     content: string,
     name: string,
     locale: 'en' | 'fa' = 'en'
   ): Promise<Buffer> {
     return generateDocx(content, {
       title: `${name} - CV`,
       author: name,
       type: 'cv',
       locale,
     });
   }
   
   export async function generateCoverLetterDocx(
     content: string,
     name: string,
     locale: 'en' | 'fa' = 'en'
   ): Promise<Buffer> {
     return generateDocx(content, {
       title: `${name} - Cover Letter`,
       author: name,
       type: 'cover_letter',
       locale,
     });
   }
   
   export async function generateEmailDocx(
     content: string,
     name: string,
     locale: 'en' | 'fa' = 'en'
   ): Promise<Buffer> {
     return generateDocx(content, {
       title: `${name} - Application Email`,
       author: name,
       type: 'email',
       locale,
     });
   }
   ```

3. Create markdown-generator.ts:
   ```typescript
   // ============================================
   // [F076] src/lib/generators/markdown-generator.ts
   // ============================================
   
   export interface MarkdownOptions {
     title?: string;
     includeMetadata?: boolean;
     type: 'cv' | 'cover_letter' | 'email';
   }
   
   export function generateMarkdown(
     content: string,
     options: MarkdownOptions
   ): string {
     let markdown = '';
     
     // Add YAML frontmatter if requested
     if (options.includeMetadata) {
       markdown += '---\n';
       markdown += `title: "${options.title || 'Document'}"\n`;
       markdown += `type: ${options.type}\n`;
       markdown += `generated: ${new Date().toISOString()}\n`;
       markdown += '---\n\n';
     }
     
     // Add title if provided
     if (options.title) {
       markdown += `# ${options.title}\n\n`;
     }
     
     // Add content (already in markdown format or plain text)
     markdown += content;
     
     // Ensure proper line endings
     markdown = markdown.replace(/\r\n/g, '\n');
     
     return markdown;
   }
   
   export function generateCVMarkdown(
     content: string,
     name: string
   ): string {
     return generateMarkdown(content, {
       title: `${name} - CV`,
       type: 'cv',
       includeMetadata: true,
     });
   }
   
   export function generateCoverLetterMarkdown(
     content: string,
     name: string
   ): string {
     return generateMarkdown(content, {
       title: `${name} - Cover Letter`,
       type: 'cover_letter',
       includeMetadata: true,
     });
   }
   
   export function generateEmailMarkdown(
     content: string,
     name: string
   ): string {
     return generateMarkdown(content, {
       title: `${name} - Application Email`,
       type: 'email',
       includeMetadata: true,
     });
   }
   
   // Convert HTML to Markdown (basic)
   export function htmlToMarkdown(html: string): string {
     let md = html;
     
     // Headers
     md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n');
     md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n');
     md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n');
     
     // Bold and italic
     md = md.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
     md = md.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
     md = md.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
     md = md.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');
     
     // Lists
     md = md.replace(/<ul[^>]*>/gi, '');
     md = md.replace(/<\/ul>/gi, '\n');
     md = md.replace(/<ol[^>]*>/gi, '');
     md = md.replace(/<\/ol>/gi, '\n');
     md = md.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n');
     
     // Paragraphs and line breaks
     md = md.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');
     md = md.replace(/<br\s*\/?>/gi, '\n');
     
     // Links
     md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');
     
     // Remove remaining HTML tags
     md = md.replace(/<[^>]+>/g, '');
     
     // Decode HTML entities
     md = md.replace(/&nbsp;/g, ' ');
     md = md.replace(/&amp;/g, '&');
     md = md.replace(/&lt;/g, '<');
     md = md.replace(/&gt;/g, '>');
     md = md.replace(/&quot;/g, '"');
     
     // Clean up extra whitespace
     md = md.replace(/\n{3,}/g, '\n\n');
     md = md.trim();
     
     return md;
   }
   ```

4. Create index.ts:
   ```typescript
   // ============================================
   // [F143] src/lib/generators/index.ts
   // ============================================
   
   export * from './docx-generator';
   export * from './markdown-generator';
   export * from './document-formatter';
   ```

5. Create API route for Word export:
   ```typescript
   // ============================================
   // [F025] src/app/api/export/docx/route.ts
   // ============================================
   
   import { NextRequest, NextResponse } from 'next/server';
   import { generateDocx } from '@/lib/generators';
   
   export async function POST(request: NextRequest) {
     try {
       const { content, filename, type, locale } = await request.json();
       
       if (!content) {
         return NextResponse.json(
           { error: 'Content is required' },
           { status: 400 }
         );
       }
       
       const buffer = await generateDocx(content, {
         title: filename || 'Document',
         type: type || 'cv',
         locale: locale || 'en',
       });
       
       return new NextResponse(buffer, {
         headers: {
           'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
           'Content-Disposition': `attachment; filename="${filename || 'document'}.docx"`,
         },
       });
       
     } catch (error: any) {
       console.error('DOCX export error:', error);
       return NextResponse.json(
         { error: error.message || 'Export failed' },
         { status: 500 }
       );
     }
   }
   ```

6. Create API route for Markdown export:
   ```typescript
   // ============================================
   // [F026] src/app/api/export/markdown/route.ts
   // ============================================
   
   import { NextRequest, NextResponse } from 'next/server';
   import { generateMarkdown, htmlToMarkdown } from '@/lib/generators';
   
   export async function POST(request: NextRequest) {
     try {
       const { content, filename, type, isHtml } = await request.json();
       
       if (!content) {
         return NextResponse.json(
           { error: 'Content is required' },
           { status: 400 }
         );
       }
       
       // Convert HTML to Markdown if needed
       const markdownContent = isHtml ? htmlToMarkdown(content) : content;
       
       const markdown = generateMarkdown(markdownContent, {
         title: filename,
         type: type || 'cv',
         includeMetadata: true,
       });
       
       return new NextResponse(markdown, {
         headers: {
           'Content-Type': 'text/markdown; charset=utf-8',
           'Content-Disposition': `attachment; filename="${filename || 'document'}.md"`,
         },
       });
       
     } catch (error: any) {
       console.error('Markdown export error:', error);
       return NextResponse.json(
         { error: error.message || 'Export failed' },
         { status: 500 }
       );
     }
   }
   ```

7. Create API route for ZIP export (all documents):
   ```typescript
   // ============================================
   // [F144] src/app/api/export/all/route.ts
   // ============================================
   
   import { NextRequest, NextResponse } from 'next/server';
   import { generateDocx } from '@/lib/generators';
   import JSZip from 'jszip';
   
   export async function POST(request: NextRequest) {
     try {
       const { documents, name, format, locale } = await request.json();
       
       if (!documents || !documents.tailored_cv || !documents.cover_letter || !documents.application_email) {
         return NextResponse.json(
           { error: 'All documents are required' },
           { status: 400 }
         );
       }
       
       const zip = new JSZip();
       const baseName = name || 'application';
       
       if (format === 'docx' || format === 'both') {
         // Generate Word documents
         const cvBuffer = await generateDocx(documents.tailored_cv, {
           title: `${baseName} - CV`,
           type: 'cv',
           locale,
         });
         zip.file(`${baseName}-cv.docx`, cvBuffer);
         
         const coverBuffer = await generateDocx(documents.cover_letter, {
           title: `${baseName} - Cover Letter`,
           type: 'cover_letter',
           locale,
         });
         zip.file(`${baseName}-cover-letter.docx`, coverBuffer);
         
         const emailBuffer = await generateDocx(documents.application_email, {
           title: `${baseName} - Application Email`,
           type: 'email',
           locale,
         });
         zip.file(`${baseName}-email.docx`, emailBuffer);
       }
       
       if (format === 'md' || format === 'both') {
         // Add Markdown files
         zip.file(`${baseName}-cv.md`, documents.tailored_cv);
         zip.file(`${baseName}-cover-letter.md`, documents.cover_letter);
         zip.file(`${baseName}-email.md`, documents.application_email);
       }
       
       const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
       
       return new NextResponse(zipBuffer, {
         headers: {
           'Content-Type': 'application/zip',
           'Content-Disposition': `attachment; filename="${baseName}-documents.zip"`,
         },
       });
       
     } catch (error: any) {
       console.error('ZIP export error:', error);
       return NextResponse.json(
         { error: error.message || 'Export failed' },
         { status: 500 }
       );
     }
   }
   ```


## CHECKPOINT TESTS (verify ALL after completion)
□ [T01] All generator files exist
□ [T02] All export API routes exist
□ [T03] TypeScript compiles without errors
□ [T04] docx-generator exports generate functions
□ [T05] markdown-generator exports functions
□ [T06] Export routes return correct content types

## MANDATORY RULES
1. Create ONLY the files listed in "FILES TO CREATE"
2. Modify ONLY the files listed in "FILES TO MODIFY"
3. NEVER import from files not in "EXISTING FILES"
4. NEVER reference files that don't exist
5. After completion, list every file you created/modified with full path
6. Mark each checkpoint test as ✅ PASS or ❌ FAIL
7. If unsure about anything, ASK — don't guess
8. Keep each file under 200 lines
9. All user-facing text must use i18n (if i18n is set up)
10. Handle errors gracefully
