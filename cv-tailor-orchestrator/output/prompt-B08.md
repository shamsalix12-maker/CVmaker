# BLOCK B08: Main Layout (Header + Sidebar + Footer)

## COMPLETED BLOCKS
- B01 ✅: Create Empty Next.js Project — Files: [F001], [F002], [F003], [F004], [F005], [F006], [F007], [F008], [F009]
- B02 ✅: Install All Dependencies — Files: [F027], [F028], [F029], [F030], [F031], [F032], [F033], [F034], [F035], [F036], [F090], [F091]
- B03 ✅: Central TypeScript Types — Files: [F079]
- B04 ✅: Constants and Utilities — Files: [F078], [F080]
- B05 ✅: Internationalization (i18n) System — Files: [F086], [F087], [F088], [F089]
- B06 ✅: Supabase Connection and Database Setup — Files: [F063], [F064], [F065], [F093], [F094]
- B07 ✅: Development Auth (Temporary Login) — Files: [F089], [F090], [F091], [F092]

## GOAL
Create the main application layout with Header, Sidebar navigation, and Footer.
The layout should be responsive, support RTL for Farsi, and include language switching.


## FILES TO CREATE
[F037] src/components/layout/Header.tsx
[F038] src/components/layout/Sidebar.tsx
[F039] src/components/layout/Footer.tsx
[F040] src/components/layout/LanguageSwitcher.tsx
[F093] src/components/layout/MainLayout.tsx
[F094] src/components/layout/MobileMenu.tsx
[F012] src/app/[locale]/dashboard/page.tsx

## FILES TO MODIFY
[F010] src/app/[locale]/layout.tsx
[F087] src/i18n/en.json
[F088] src/i18n/fa.json
[F009] src/app/globals.css

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
[F093] src/lib/supabase/database.types.ts (from B06)
[F094] supabase/schema.sql (from B06)
[F092] src/components/auth/AuthGuard.tsx (from B07)

## FILES YOU MUST NOT TOUCH
Everything not listed above.

## INSTRUCTIONS
1. Create Header.tsx:
   - Logo/App name on the left (links to dashboard)
   - LanguageSwitcher component
   - User avatar/name from AuthContext
   - Logout button
   - Use shadcn/ui Button and DropdownMenu
   - Responsive: hide some elements on mobile

2. Create Sidebar.tsx:
   - Navigation links:
     * Dashboard (/[locale]/dashboard)
     * My CV (/[locale]/cv-manager)
     * New Application (/[locale]/new-application)
     * My Applications (/[locale]/applications)
     * Prompt Management (/[locale]/prompts)
     * Settings (/[locale]/settings)
   - Highlight active link
   - Use lucide-react icons
   - Collapsible on desktop (optional)
   - Hidden on mobile (replaced by MobileMenu)

3. Create Footer.tsx:
   - Simple: "© 2025 CV Tailor. All rights reserved."
   - Centered, subtle styling

4. Create LanguageSwitcher.tsx:
   - Show current language (EN/FA)
   - Click to switch
   - Use next-intl's useRouter and usePathname
   - When switching, redirect to same page in new locale

5. Create MobileMenu.tsx:
   - Hamburger icon button
   - Opens a drawer/sheet with navigation links
   - Use shadcn Sheet or custom implementation

6. Create MainLayout.tsx:
   - Combines: Header (top), Sidebar (left), main content (center), Footer (bottom)
   - Responsive grid/flex layout
   - On mobile: no sidebar, use MobileMenu
   - Handle RTL: sidebar on right for Farsi

7. Create dashboard/page.tsx:
   - Simple placeholder: "Welcome to Dashboard"
   - Wrap with AuthGuard
   - Will be expanded later

8. Update [locale]/layout.tsx:
   - Detect if route needs MainLayout (authenticated routes)
   - For now, apply MainLayout to all routes except login

9. Add to translations (nav section):
   - dashboard, cv_manager, new_application, applications, prompts, settings
   - logout, language


## CHECKPOINT TESTS (verify ALL after completion)
□ [T01] All layout component files exist
□ [T02] Dashboard page exists
□ [T03] TypeScript compiles without errors
□ [T04] Header uses AuthContext
□ [T05] Sidebar has all navigation links
□ [T06] LanguageSwitcher handles locale change
□ [T07] MainLayout combines all components
□ [T08] English translations have nav keys
□ [T09] Farsi translations have nav keys
□ [T10] Dashboard page uses AuthGuard

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
