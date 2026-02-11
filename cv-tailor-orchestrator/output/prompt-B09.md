# BLOCK B09: File Parsers (Word + Markdown)

## COMPLETED BLOCKS
- B01 ✅: Create Empty Next.js Project — Files: [F001], [F002], [F003], [F004], [F005], [F006], [F007], [F008], [F009]
- B02 ✅: Install All Dependencies — Files: [F027], [F028], [F029], [F030], [F031], [F032], [F033], [F034], [F035], [F036], [F090], [F091]
- B03 ✅: Central TypeScript Types — Files: [F079]
- B04 ✅: Constants and Utilities — Files: [F078], [F080]
- B05 ✅: Internationalization (i18n) System — Files: [F086], [F087], [F088], [F089]
- B06 ✅: Supabase Connection and Database Setup — Files: [F063], [F064], [F065], [F093], [F094]
- B07 ✅: Development Auth (Temporary Login) — Files: [F089], [F090], [F091], [F092]
- B08 ✅: Main Layout (Header + Sidebar + Footer) — Files: [F037], [F038], [F039], [F040], [F093], [F094], [F012]

## GOAL
Create utility functions to parse Word (.docx) and Markdown (.md) files
and extract their text content. These will be used to parse uploaded CVs.


## FILES TO CREATE
[F072] src/lib/parsers/docx-parser.ts
[F073] src/lib/parsers/markdown-parser.ts
[F095] src/lib/parsers/index.ts

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

## FILES YOU MUST NOT TOUCH
Everything not listed above.

## INSTRUCTIONS
1. Create docx-parser.ts:
   ```typescript
   import mammoth from 'mammoth';
   
   export interface ParsedDocument {
     text: string;
     html?: string;
     metadata?: {
       wordCount: number;
       hasImages: boolean;
     };
   }
   
   export async function parseDocx(file: File | Buffer): Promise<ParsedDocument> {
     // If File, convert to ArrayBuffer first
     // Use mammoth.extractRawText() for text
     // Use mammoth.convertToHtml() for HTML (optional)
     // Return ParsedDocument
     // Handle errors gracefully
   }
   
   export async function parseDocxFromArrayBuffer(arrayBuffer: ArrayBuffer): Promise<ParsedDocument> {
     // Direct parsing from ArrayBuffer
   }
   ```

2. Create markdown-parser.ts:
   ```typescript
   import { unified } from 'unified';
   import remarkParse from 'remark-parse';
   import remarkHtml from 'remark-html';
   
   export interface ParsedMarkdown {
     text: string;
     html: string;
     metadata?: {
       wordCount: number;
       headings: string[];
     };
   }
   
   export async function parseMarkdown(content: string): Promise<ParsedMarkdown> {
     // Parse markdown to AST
     // Extract plain text (strip formatting)
     // Convert to HTML
     // Extract headings
     // Return ParsedMarkdown
   }
   
   export async function parseMarkdownFile(file: File): Promise<ParsedMarkdown> {
     // Read file as text
     // Call parseMarkdown
   }
   ```

3. Create index.ts:
   ```typescript
   export * from './docx-parser';
   export * from './markdown-parser';
   
   export type SupportedFileType = 'docx' | 'md' | 'txt';
   
   export function detectFileType(filename: string): SupportedFileType | null {
     // Check file extension
     // Return type or null if unsupported
   }
   
   export async function parseFile(file: File): Promise<{ text: string; html?: string }> {
     // Detect type
     // Call appropriate parser
     // Throw error if unsupported
   }
   ```

IMPORTANT:
- Handle errors gracefully (corrupted files, empty files, etc.)
- Return meaningful error messages
- Keep functions pure and testable
- Word count should count actual words, not characters


## CHECKPOINT TESTS (verify ALL after completion)
□ [T01] All parser files exist
□ [T02] TypeScript compiles without errors
□ [T03] docx-parser exports parseDocx function
□ [T04] markdown-parser exports parseMarkdown function
□ [T05] index.ts exports all parsers and utilities
□ [T06] Error handling is implemented

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
