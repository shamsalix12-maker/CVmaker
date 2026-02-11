# BLOCK B07: Development Auth (Temporary Login)

## COMPLETED BLOCKS
- B01 ✅: Create Empty Next.js Project — Files: [F001], [F002], [F003], [F004], [F005], [F006], [F007], [F008], [F009]
- B02 ✅: Install All Dependencies — Files: [F027], [F028], [F029], [F030], [F031], [F032], [F033], [F034], [F035], [F036], [F090], [F091]
- B03 ✅: Central TypeScript Types — Files: [F079]
- B04 ✅: Constants and Utilities — Files: [F078], [F080]
- B05 ✅: Internationalization (i18n) System — Files: [F086], [F087], [F088], [F089]
- B06 ✅: Supabase Connection and Database Setup — Files: [F063], [F064], [F065], [F093], [F094]

## GOAL
Create a simple temporary authentication system for development purposes.
This will be replaced with Google OAuth in the final phase.
Users can "login" by entering their email and name - no password required.
This allows development to proceed without OAuth complexity.


## FILES TO CREATE
[F089] src/lib/auth/dev-auth.ts
[F090] src/context/AuthContext.tsx
[F091] src/components/auth/DevLoginForm.tsx
[F092] src/components/auth/AuthGuard.tsx

## FILES TO MODIFY
[F011] src/app/[locale]/page.tsx
[F010] src/app/[locale]/layout.tsx
[F087] src/i18n/en.json
[F088] src/i18n/fa.json

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
[F090] src/lib/utils.ts (from B02)
[F091] components.json (from B02)
[F079] src/lib/types.ts (from B03)
[F078] src/lib/constants.ts (from B04)
[F080] src/lib/helpers.ts (from B04)
[F086] src/i18n/config.ts (from B05)
[F087] src/i18n/en.json (from B05)
[F088] src/i18n/fa.json (from B05)
[F089] src/i18n/request.ts (from B05)
[F063] src/lib/supabase/client.ts (from B06)
[F064] src/lib/supabase/server.ts (from B06)
[F065] src/lib/supabase/middleware.ts (from B06)
[F093] src/lib/supabase/database.types.ts (from B06)
[F094] supabase/schema.sql (from B06)

## FILES YOU MUST NOT TOUCH
Everything not listed above.

## INSTRUCTIONS
1. Create dev-auth.ts with these functions:
   - devLogin(email: string, name: string): Creates or retrieves user from Supabase
   - devLogout(): Clears the session
   - getCurrentUser(): Returns current user or null
   - Use localStorage to persist the user ID during development

2. Create AuthContext.tsx:
   - Provide user state, loading state, login/logout functions
   - Check for existing session on mount
   - Export useAuth hook

3. Create DevLoginForm.tsx:
   - Simple form with email and name fields
   - Submit button
   - Loading state during login
   - Error message display
   - Use i18n for all text
   - Support RTL for Farsi

4. Create AuthGuard.tsx:
   - Wrap protected pages
   - If not authenticated, redirect to login page
   - Show loading spinner while checking auth

5. Update [locale]/page.tsx:
   - Show DevLoginForm if not authenticated
   - Redirect to /dashboard if authenticated

6. Update [locale]/layout.tsx:
   - Wrap children with AuthProvider

7. Add to en.json and fa.json under "auth" key:
   - login_title, email_label, name_label, login_button, logging_in, 
     login_error, welcome_back, logout, email_placeholder, name_placeholder

IMPORTANT: This is temporary for development. Keep it simple.
Do NOT implement password, OAuth, or complex session management.


## CHECKPOINT TESTS (verify ALL after completion)
□ [T01] dev-auth.ts file exists
□ [T02] AuthContext.tsx file exists
□ [T03] DevLoginForm.tsx file exists
□ [T04] AuthGuard.tsx file exists
□ [T05] TypeScript compiles without errors
□ [T06] AuthContext exports useAuth hook
□ [T07] DevLoginForm uses i18n
□ [T08] English translations have auth keys
□ [T09] Farsi translations have auth keys
□ [T10] Layout includes AuthProvider

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
