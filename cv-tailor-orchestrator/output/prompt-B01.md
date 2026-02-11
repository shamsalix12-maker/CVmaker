# BLOCK B01: Create Empty Next.js Project

## COMPLETED BLOCKS
None yet

## GOAL
Create a clean, running Next.js 14+ project with TypeScript and Tailwind CSS.
This is the foundation of the entire application.


## FILES TO CREATE
[F001] package.json
[F002] tsconfig.json
[F003] next.config.js
[F004] tailwind.config.ts
[F005] .env.local
[F006] .env.example
[F007] src/app/layout.tsx
[F008] src/app/page.tsx
[F009] src/app/globals.css

## FILES TO MODIFY
None

## EXISTING FILES YOU MAY IMPORT FROM
None — this is the first block.

## FILES YOU MUST NOT TOUCH
Everything not listed above.

## COMMANDS TO RUN
```
npx create-next-app@latest cv-tailor-app \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

```

## INSTRUCTIONS
1. Run the create-next-app command with the EXACT flags specified above.
2. Navigate into the created directory: cd cv-tailor-app
3. Create .env.local with these empty placeholders:
   ```
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   ENCRYPTION_SECRET_KEY=
   ```
4. Create .env.example with the same keys (for documentation):
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ENCRYPTION_SECRET_KEY=your_32_character_secret_key
   ```
5. Verify the dev server runs: npm run dev
6. Do NOT add any extra files or modify the default setup yet.


## CHECKPOINT TESTS (verify ALL after completion)
□ [T01] package.json exists and has Next.js dependency
□ [T02] TypeScript compiles without errors
□ [T03] All required files exist
□ [T04] Tailwind is configured
□ [T05] .env.local has required placeholders

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
