# BLOCK B25: DOCX File Generator

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
- B19 ✅: Export System (Word & Markdown) — Files: [F075], [F076], [F142], [F143], [F025], [F026], [F144]
- B20 ✅: Template Management System — Files: [F145], [F146], [F147], [F148], [F149], [F150], [F060], [F061], [F062], [F151], [F152]
- B23 ✅: Settings Page — Files: [F049], [F165], [F166], [F167], [F168]

## GOAL
Create a system to generate formatted Word (.docx) files from document content.
This includes API routes for exporting CV, cover letter, and email as Word files.
Uses the 'docx' library to create professional, formatted documents.


## FILES TO CREATE
[F075] src/lib/generators/docx-generator.ts
[F142] src/lib/generators/docx-styles.ts
[F143] src/lib/generators/docx-templates.ts
[F025] src/app/api/export/docx/route.ts
[F144] src/lib/generators/index.ts

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
[F075] src/lib/generators/docx-generator.ts (from B19)
[F076] src/lib/generators/markdown-generator.ts (from B19)
[F142] src/lib/generators/document-formatter.ts (from B19)
[F143] src/lib/generators/index.ts (from B19)
[F025] src/app/api/export/docx/route.ts (from B19)
[F026] src/app/api/export/markdown/route.ts (from B19)
[F144] src/app/api/export/all/route.ts (from B19)
[F145] src/lib/templates/template-service.ts (from B20)
[F146] src/lib/templates/template-parser.ts (from B20)
[F147] src/lib/templates/index.ts (from B20)
[F148] src/app/api/templates/route.ts (from B20)
[F149] src/app/api/templates/[id]/route.ts (from B20)
[F150] src/hooks/useTemplates.ts (from B20)
[F060] src/components/templates/TemplateUploader.tsx (from B20)
[F061] src/components/templates/TemplateSelector.tsx (from B20)
[F062] src/components/templates/TemplatePreview.tsx (from B20)
[F151] src/components/templates/TemplateList.tsx (from B20)
[F152] src/components/templates/TemplateCard.tsx (from B20)
[F049] src/components/ai/AIKeyManager.tsx (from B23)
[F165] src/components/settings/SettingsNav.tsx (from B23)
[F166] src/components/settings/ProfileSettings.tsx (from B23)
[F167] src/components/settings/LanguageSettings.tsx (from B23)
[F168] src/components/settings/TemplateSettings.tsx (from B23)

## FILES YOU MUST NOT TOUCH
Everything not listed above.

## INSTRUCTIONS
1. Create docx-styles.ts:
   ```typescript
   // ============================================
   // [F142] src/lib/generators/docx-styles.ts
   // ============================================
   
   import {
     HeadingLevel,
     AlignmentType,
     TabStopPosition,
     TabStopType,
     convertInchesToTwip,
     BorderStyle,
   } from 'docx';
   
   // Color palette
   export const COLORS = {
     primary: '2563EB',      // Blue
     secondary: '64748B',    // Slate
     text: '1E293B',         // Dark slate
     lightText: '64748B',    // Light slate
     accent: '0EA5E9',       // Sky blue
     border: 'E2E8F0',       // Light border
     background: 'F8FAFC',   // Light background
   };
   
   // Font sizes in half-points (1 point = 2 half-points)
   export const FONT_SIZES = {
     title: 48,          // 24pt
     heading1: 36,       // 18pt
     heading2: 28,       // 14pt
     heading3: 24,       // 12pt
     body: 22,           // 11pt
     small: 20,          // 10pt
     caption: 18,        // 9pt
   };
   
   // Spacing in twips (1 inch = 1440 twips)
   export const SPACING = {
     paragraph: 240,     // 12pt after paragraph
     section: 480,       // 24pt after section
     line: 276,          // 1.15 line spacing
   };
   
   // Common text run styles
   export const TEXT_STYLES = {
     title: {
       bold: true,
       size: FONT_SIZES.title,
       color: COLORS.text,
       font: 'Calibri',
     },
     heading1: {
       bold: true,
       size: FONT_SIZES.heading1,
       color: COLORS.primary,
       font: 'Calibri',
     },
     heading2: {
       bold: true,
       size: FONT_SIZES.heading2,
       color: COLORS.text,
       font: 'Calibri',
     },
     heading3: {
       bold: true,
       size: FONT_SIZES.heading3,
       color: COLORS.text,
       font: 'Calibri',
     },
     body: {
       size: FONT_SIZES.body,
       color: COLORS.text,
       font: 'Calibri',
     },
     bodyBold: {
       bold: true,
       size: FONT_SIZES.body,
       color: COLORS.text,
       font: 'Calibri',
     },
     subtle: {
       size: FONT_SIZES.small,
       color: COLORS.lightText,
       font: 'Calibri',
     },
     link: {
       size: FONT_SIZES.body,
       color: COLORS.primary,
       font: 'Calibri',
       underline: {},
     },
   };
   
   // Paragraph styles
   export const PARAGRAPH_STYLES = {
     title: {
       alignment: AlignmentType.CENTER,
       spacing: { after: SPACING.paragraph },
     },
     heading: {
       spacing: { before: SPACING.section, after: SPACING.paragraph },
     },
     body: {
       spacing: { after: SPACING.paragraph, line: SPACING.line },
     },
     bullet: {
       spacing: { after: 120, line: SPACING.line },
     },
     contact: {
       alignment: AlignmentType.CENTER,
       spacing: { after: 60 },
     },
   };
   
   // Page margins
   export const PAGE_MARGINS = {
     top: convertInchesToTwip(0.75),
     right: convertInchesToTwip(0.75),
     bottom: convertInchesToTwip(0.75),
     left: convertInchesToTwip(0.75),
   };
   
   // Section properties
   export const SECTION_PROPERTIES = {
     page: {
       margin: PAGE_MARGINS,
     },
   };
   ```

2. Create docx-templates.ts:
   ```typescript
   // ============================================
   // [F143] src/lib/generators/docx-templates.ts
   // ============================================
   
   import {
     Document,
     Paragraph,
     TextRun,
     HeadingLevel,
     AlignmentType,
     BorderStyle,
     Table,
     TableRow,
     TableCell,
     WidthType,
     Header,
     Footer,
     PageNumber,
     NumberFormat,
   } from 'docx';
   import { TEXT_STYLES, PARAGRAPH_STYLES, SECTION_PROPERTIES, COLORS, SPACING } from './docx-styles';
   
   // Helper to create a styled text run
   export function createTextRun(
     text: string, 
     style: keyof typeof TEXT_STYLES = 'body'
   ): TextRun {
     return new TextRun({
       text,
       ...TEXT_STYLES[style],
     });
   }
   
   // Helper to create a paragraph with runs
   export function createParagraph(
     runs: TextRun | TextRun[],
     options: {
       heading?: HeadingLevel;
       alignment?: AlignmentType;
       spacing?: { before?: number; after?: number };
       bullet?: { level: number };
     } = {}
   ): Paragraph {
     const runsArray = Array.isArray(runs) ? runs : [runs];
     
     return new Paragraph({
       children: runsArray,
       heading: options.heading,
       alignment: options.alignment,
       spacing: options.spacing || PARAGRAPH_STYLES.body.spacing,
       bullet: options.bullet,
     });
   }
   
   // Create section header with line
   export function createSectionHeader(title: string): Paragraph[] {
     return [
       new Paragraph({
         children: [createTextRun(title, 'heading1')],
         spacing: { before: SPACING.section, after: 120 },
         border: {
           bottom: {
             color: COLORS.primary,
             space: 4,
             size: 12,
             style: BorderStyle.SINGLE,
           },
         },
       }),
     ];
   }
   
   // Create contact info line
   export function createContactLine(items: string[]): Paragraph {
     const runs: TextRun[] = [];
     
     items.forEach((item, index) => {
       if (index > 0) {
         runs.push(new TextRun({
           text: '  •  ',
           ...TEXT_STYLES.subtle,
         }));
       }
       runs.push(new TextRun({
         text: item,
         ...TEXT_STYLES.subtle,
       }));
     });
     
     return new Paragraph({
       children: runs,
       alignment: AlignmentType.CENTER,
       spacing: { after: 60 },
     });
   }
   
   // Create experience/education entry
   export function createExperienceEntry(
     title: string,
     subtitle: string,
     dateRange: string,
     description?: string,
     bullets?: string[]
   ): Paragraph[] {
     const paragraphs: Paragraph[] = [];
     
     // Title and date on same line
     paragraphs.push(new Paragraph({
       children: [
         createTextRun(title, 'bodyBold'),
         new TextRun({ text: '\t' }),
         createTextRun(dateRange, 'subtle'),
       ],
       tabStops: [
         {
           type: 'right' as any,
           position: 9360, // Right align at 6.5 inches
         },
       ],
       spacing: { after: 60 },
     }));
     
     // Subtitle (company/institution)
     paragraphs.push(new Paragraph({
       children: [createTextRun(subtitle, 'subtle')],
       spacing: { after: 120 },
     }));
     
     // Description
     if (description) {
       paragraphs.push(new Paragraph({
         children: [createTextRun(description, 'body')],
         spacing: { after: 120 },
       }));
     }
     
     // Bullet points
     if (bullets && bullets.length > 0) {
       bullets.forEach(bullet => {
         paragraphs.push(new Paragraph({
           children: [createTextRun(bullet, 'body')],
           bullet: { level: 0 },
           spacing: { after: 60 },
         }));
       });
     }
     
     return paragraphs;
   }
   
   // Create skills section
   export function createSkillsSection(skills: string[]): Paragraph[] {
     const skillText = skills.join('  •  ');
     
     return [
       ...createSectionHeader('Skills'),
       new Paragraph({
         children: [createTextRun(skillText, 'body')],
         spacing: { after: SPACING.paragraph },
       }),
     ];
   }
   
   // Create footer with page numbers
   export function createFooter(): Footer {
     return new Footer({
       children: [
         new Paragraph({
           alignment: AlignmentType.CENTER,
           children: [
             new TextRun({
               children: [PageNumber.CURRENT],
               ...TEXT_STYLES.caption,
             }),
             new TextRun({
               text: ' / ',
               ...TEXT_STYLES.caption,
             }),
             new TextRun({
               children: [PageNumber.TOTAL_PAGES],
               ...TEXT_STYLES.caption,
             }),
           ],
         }),
       ],
     });
   }
   ```

3. Create docx-generator.ts:
   ```typescript
   // ============================================
   // [F075] src/lib/generators/docx-generator.ts
   // ============================================
   
   import {
     Document,
     Paragraph,
     TextRun,
     Packer,
     AlignmentType,
     HeadingLevel,
     Header,
     Footer,
     PageNumber,
   } from 'docx';
   import {
     TEXT_STYLES,
     PARAGRAPH_STYLES,
     SECTION_PROPERTIES,
     COLORS,
     SPACING,
   } from './docx-styles';
   import {
     createTextRun,
     createParagraph,
     createSectionHeader,
     createContactLine,
     createExperienceEntry,
     createSkillsSection,
     createFooter,
   } from './docx-templates';
   
   export type DocumentType = 'cv' | 'cover_letter' | 'email';
   
   export interface GenerateDocxOptions {
     content: string;
     type: DocumentType;
     title?: string;
     metadata?: {
       author?: string;
       company?: string;
       jobTitle?: string;
     };
   }
   
   // Parse markdown-like content into paragraphs
   function parseContent(content: string): Paragraph[] {
     const paragraphs: Paragraph[] = [];
     const lines = content.split('\n');
     
     let currentBullets: string[] = [];
     
     const flushBullets = () => {
       if (currentBullets.length > 0) {
         currentBullets.forEach(bullet => {
           paragraphs.push(new Paragraph({
             children: [createTextRun(bullet.replace(/^[-•*]\s*/, ''), 'body')],
             bullet: { level: 0 },
             spacing: { after: 60 },
           }));
         });
         currentBullets = [];
       }
     };
     
     for (const line of lines) {
       const trimmedLine = line.trim();
       
       if (!trimmedLine) {
         flushBullets();
         continue;
       }
       
       // Heading 1: # Title or === underline
       if (trimmedLine.startsWith('# ') || trimmedLine.startsWith('## ')) {
         flushBullets();
         const headingText = trimmedLine.replace(/^#+\s*/, '');
         const level = trimmedLine.startsWith('## ') ? 'heading2' : 'heading1';
         
         if (level === 'heading1') {
           paragraphs.push(...createSectionHeader(headingText));
         } else {
           paragraphs.push(new Paragraph({
             children: [createTextRun(headingText, 'heading2')],
             spacing: { before: SPACING.paragraph, after: 120 },
           }));
         }
         continue;
       }
       
       // Heading 3: ### Subtitle
       if (trimmedLine.startsWith('### ')) {
         flushBullets();
         const headingText = trimmedLine.replace(/^###\s*/, '');
         paragraphs.push(new Paragraph({
           children: [createTextRun(headingText, 'heading3')],
           spacing: { before: 120, after: 60 },
         }));
         continue;
       }
       
       // Bullet points
       if (/^[-•*]\s/.test(trimmedLine)) {
         currentBullets.push(trimmedLine);
         continue;
       }
       
       // Bold text: **text**
       if (trimmedLine.includes('**')) {
         flushBullets();
         const parts = trimmedLine.split(/\*\*(.*?)\*\*/g);
         const runs: TextRun[] = [];
         
         parts.forEach((part, index) => {
           if (index % 2 === 1) {
             // Bold part
             runs.push(createTextRun(part, 'bodyBold'));
           } else if (part) {
             runs.push(createTextRun(part, 'body'));
           }
         });
         
         paragraphs.push(new Paragraph({
           children: runs,
           spacing: { after: SPACING.paragraph },
         }));
         continue;
       }
       
       // Regular paragraph
       flushBullets();
       paragraphs.push(new Paragraph({
         children: [createTextRun(trimmedLine, 'body')],
         spacing: { after: SPACING.paragraph },
       }));
     }
     
     flushBullets();
     return paragraphs;
   }
   
   // Generate CV document
   function generateCVDocument(content: string, options: GenerateDocxOptions): Document {
     const paragraphs = parseContent(content);
     
     return new Document({
       creator: options.metadata?.author || 'CV Tailor',
       title: options.title || 'Tailored CV',
       description: 'CV generated by CV Tailor',
       sections: [
         {
           properties: SECTION_PROPERTIES,
           footers: {
             default: createFooter(),
           },
           children: paragraphs,
         },
       ],
     });
   }
   
   // Generate Cover Letter document
   function generateCoverLetterDocument(content: string, options: GenerateDocxOptions): Document {
     const paragraphs = parseContent(content);
     
     // Add date at the top
     const today = new Date().toLocaleDateString('en-US', {
       year: 'numeric',
       month: 'long',
       day: 'numeric',
     });
     
     const headerParagraphs: Paragraph[] = [
       new Paragraph({
         children: [createTextRun(today, 'body')],
         spacing: { after: SPACING.section },
       }),
     ];
     
     return new Document({
       creator: options.metadata?.author || 'CV Tailor',
       title: options.title || 'Cover Letter',
       description: 'Cover letter generated by CV Tailor',
       sections: [
         {
           properties: SECTION_PROPERTIES,
           children: [...headerParagraphs, ...paragraphs],
         },
       ],
     });
   }
   
   // Generate Email document
   function generateEmailDocument(content: string, options: GenerateDocxOptions): Document {
     const paragraphs = parseContent(content);
     
     return new Document({
       creator: options.metadata?.author || 'CV Tailor',
       title: options.title || 'Application Email',
       description: 'Application email generated by CV Tailor',
       sections: [
         {
           properties: SECTION_PROPERTIES,
           children: paragraphs,
         },
       ],
     });
   }
   
   // Main export function
   export async function generateDocx(options: GenerateDocxOptions): Promise<Buffer> {
     let document: Document;
     
     switch (options.type) {
       case 'cv':
         document = generateCVDocument(options.content, options);
         break;
       case 'cover_letter':
         document = generateCoverLetterDocument(options.content, options);
         break;
       case 'email':
         document = generateEmailDocument(options.content, options);
         break;
       default:
         document = generateCVDocument(options.content, options);
     }
     
     const buffer = await Packer.toBuffer(document);
     return Buffer.from(buffer);
   }
   
   // Generate all three documents as a zip (optional future feature)
   export async function generateAllDocx(
     documents: {
       cv: string;
       coverLetter: string;
       email: string;
     },
     metadata?: GenerateDocxOptions['metadata']
   ): Promise<{
     cv: Buffer;
     coverLetter: Buffer;
     email: Buffer;
   }> {
     const [cv, coverLetter, email] = await Promise.all([
       generateDocx({ content: documents.cv, type: 'cv', metadata }),
       generateDocx({ content: documents.coverLetter, type: 'cover_letter', metadata }),
       generateDocx({ content: documents.email, type: 'email', metadata }),
     ]);
     
     return { cv, coverLetter, email };
   }
   ```

4. Create API route for DOCX export:
   ```typescript
   // ============================================
   // [F025] src/app/api/export/docx/route.ts
   // ============================================
   
   import { NextRequest, NextResponse } from 'next/server';
   import { generateDocx, DocumentType } from '@/lib/generators/docx-generator';
   
   export async function POST(request: NextRequest) {
     try {
       const body = await request.json();
       const { content, type, filename, metadata } = body;
       
       if (!content) {
         return NextResponse.json(
           { error: 'Content is required' },
           { status: 400 }
         );
       }
       
       const docType: DocumentType = type || 'cv';
       const buffer = await generateDocx({
         content,
         type: docType,
         title: filename,
         metadata,
       });
       
       const fileName = filename 
         ? `${filename}.docx` 
         : `${docType}-${Date.now()}.docx`;
       
       return new NextResponse(buffer, {
         status: 200,
         headers: {
           'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
           'Content-Disposition': `attachment; filename="${fileName}"`,
           'Content-Length': buffer.length.toString(),
         },
       });
       
     } catch (error: any) {
       console.error('DOCX generation error:', error);
       return NextResponse.json(
         { error: error.message || 'Failed to generate document' },
         { status: 500 }
       );
     }
   }
   ```

5. Create generators index:
   ```typescript
   // ============================================
   // [F144] src/lib/generators/index.ts
   // ============================================
   
   export * from './docx-generator';
   export * from './docx-styles';
   export * from './docx-templates';
   ```


## CHECKPOINT TESTS (verify ALL after completion)
□ [T01] All generator files exist
□ [T02] API route exists
□ [T03] TypeScript compiles without errors
□ [T04] DOCX generator exports main function
□ [T05] Styles are properly defined
□ [T06] Templates have helper functions
□ [T07] API route handles POST

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
