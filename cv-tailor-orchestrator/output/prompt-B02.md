# BLOCK B02: Install All Dependencies

## COMPLETED BLOCKS
- B01 ✅: Create Empty Next.js Project — Files: [F001], [F002], [F003], [F004], [F005], [F006], [F007], [F008], [F009]

## GOAL
Install all npm packages required for the entire project.
This includes UI components (shadcn), Supabase, AI SDKs, 
file processing libraries, and utilities.


## FILES TO CREATE
[F027] src/components/ui/button.tsx
[F028] src/components/ui/input.tsx
[F029] src/components/ui/card.tsx
[F030] src/components/ui/dialog.tsx
[F031] src/components/ui/select.tsx
[F032] src/components/ui/textarea.tsx
[F033] src/components/ui/tabs.tsx
[F034] src/components/ui/badge.tsx
[F035] src/components/ui/toast.tsx
[F036] src/components/ui/dropdown-menu.tsx
[F090] src/lib/utils.ts
[F091] components.json

## FILES TO MODIFY
[F001] package.json
[F009] src/app/globals.css
[F004] tailwind.config.ts

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

## FILES YOU MUST NOT TOUCH
Everything not listed above.

## COMMANDS TO RUN
```
# Initialize shadcn-ui
npx shadcn-ui@latest init -y

```
```
# Add shadcn components
npx shadcn-ui@latest add button input card dialog select textarea tabs badge toast dropdown-menu

```
```
# Supabase
npm install @supabase/supabase-js @supabase/ssr

```
```
# AI SDKs
npm install openai @anthropic-ai/sdk @google/generative-ai

```
```
# File Parsing & Generation
npm install mammoth docx file-saver jszip
npm install @types/file-saver --save-dev

```
```
# Markdown Processing
npm install remark remark-html remark-parse unified

```
```
# Rich Text Editor
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-placeholder @tiptap/pm

```
```
# Internationalization
npm install next-intl

```
```
# Encryption
npm install crypto-js
npm install @types/crypto-js --save-dev

```
```
# Utilities
npm install clsx tailwind-merge lucide-react zod uuid
npm install @types/uuid --save-dev

```

## INSTRUCTIONS
1. Run shadcn-ui init first. When prompted:
   - Style: Default
   - Base color: Slate
   - CSS variables: Yes

2. Add all the shadcn components listed.

3. Install all other dependencies in order.

4. Verify no peer dependency conflicts.

5. Do NOT modify any component code yet - just install.

6. The shadcn init will create src/lib/utils.ts and modify globals.css and tailwind.config.ts - this is expected.


## CHECKPOINT TESTS (verify ALL after completion)
□ [T01] shadcn components directory exists
□ [T02] Supabase packages installed
□ [T03] AI SDK packages installed
□ [T04] File processing packages installed
□ [T05] Other required packages installed
□ [T06] TypeScript compiles without errors
□ [T07] No npm audit high vulnerabilities

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
