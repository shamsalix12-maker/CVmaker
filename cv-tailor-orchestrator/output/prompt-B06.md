# BLOCK B06: Supabase Connection and Database Setup

## COMPLETED BLOCKS
- B01 ✅: Create Empty Next.js Project — Files: [F001], [F002], [F003], [F004], [F005], [F006], [F007], [F008], [F009]
- B02 ✅: Install All Dependencies — Files: [F027], [F028], [F029], [F030], [F031], [F032], [F033], [F034], [F035], [F036], [F090], [F091]
- B03 ✅: Central TypeScript Types — Files: [F079]
- B04 ✅: Constants and Utilities — Files: [F078], [F080]
- B05 ✅: Internationalization (i18n) System — Files: [F086], [F087], [F088], [F089]

## GOAL
Set up Supabase client connections (browser and server) and create
all database tables with proper Row Level Security (RLS) policies.
This establishes the entire data layer for the application.


## FILES TO CREATE
[F063] src/lib/supabase/client.ts
[F064] src/lib/supabase/server.ts
[F065] src/lib/supabase/middleware.ts
[F093] src/lib/supabase/database.types.ts
[F094] supabase/schema.sql

## FILES TO MODIFY
[F005] .env.local
[F006] .env.example

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

## FILES YOU MUST NOT TOUCH
Everything not listed above.

## EXACT FILE CONTENTS
### [F063] src/lib/supabase/client.ts
```typescript
// ═══════════════════════════════════════════════════════════════
// [F063] src/lib/supabase/client.ts
// Supabase Browser Client
// ═══════════════════════════════════════════════════════════════

import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

```

### [F064] src/lib/supabase/server.ts
```typescript
// ═══════════════════════════════════════════════════════════════
// [F064] src/lib/supabase/server.ts
// Supabase Server Client
// ═══════════════════════════════════════════════════════════════

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Handle cookies in read-only context (e.g., Server Components)
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Handle cookies in read-only context
          }
        },
      },
    }
  );
}

```

### [F065] src/lib/supabase/middleware.ts
```typescript
// ═══════════════════════════════════════════════════════════════
// [F065] src/lib/supabase/middleware.ts
// Supabase Middleware Client (for auth)
// ═══════════════════════════════════════════════════════════════

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  // Refresh session if expired
  await supabase.auth.getUser();

  return response;
}

```

### [F093] src/lib/supabase/database.types.ts
```typescript
// ═══════════════════════════════════════════════════════════════
// [F093] src/lib/supabase/database.types.ts
// Supabase Database Types
// ═══════════════════════════════════════════════════════════════

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          google_id: string | null
          email: string
          name: string
          avatar_url: string | null
          preferred_language: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          google_id?: string | null
          email: string
          name: string
          avatar_url?: string | null
          preferred_language?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          google_id?: string | null
          email?: string
          name?: string
          avatar_url?: string | null
          preferred_language?: string
          created_at?: string
          updated_at?: string
        }
      }
      comprehensive_cvs: {
        Row: {
          id: string
          user_id: string
          personal_info: Json
          work_experience: Json
          education: Json
          skills: Json
          certifications: Json
          languages: Json
          projects: Json
          additional_sections: Json
          raw_text: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          personal_info?: Json
          work_experience?: Json
          education?: Json
          skills?: Json
          certifications?: Json
          languages?: Json
          projects?: Json
          additional_sections?: Json
          raw_text?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          personal_info?: Json
          work_experience?: Json
          education?: Json
          skills?: Json
          certifications?: Json
          languages?: Json
          projects?: Json
          additional_sections?: Json
          raw_text?: string
          created_at?: string
          updated_at?: string
        }
      }
      prompts: {
        Row: {
          id: string
          title_en: string
          title_fa: string
          description_en: string
          description_fa: string
          prompt_text: string
          category: string
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title_en: string
          title_fa: string
          description_en?: string
          description_fa?: string
          prompt_text: string
          category?: string
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title_en?: string
          title_fa?: string
          description_en?: string
          description_fa?: string
          prompt_text?: string
          category?: string
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      ai_api_keys: {
        Row: {
          id: string
          user_id: string
          provider_name: string
          api_key_encrypted: string
          is_valid: boolean
          available_models: Json
          token_balance: string | null
          last_validated_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          provider_name: string
          api_key_encrypted: string
          is_valid?: boolean
          available_models?: Json
          token_balance?: string | null
          last_validated_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          provider_name?: string
          api_key_encrypted?: string
          is_valid?: boolean
          available_models?: Json
          token_balance?: string | null
          last_validated_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      templates: {
        Row: {
          id: string
          user_id: string
          template_name: string
          template_type: string
          file_format: string
          file_content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          template_name: string
          template_type: string
          file_format: string
          file_content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          template_name?: string
          template_type?: string
          file_format?: string
          file_content?: string
          created_at?: string
          updated_at?: string
        }
      }
      job_applications: {
        Row: {
          id: string
          user_id: string
          job_title: string
          company_name: string
          job_description: string
          selected_prompt_ids: Json
          ai_selections: Json
          output_language: string
          tone_setting: Json
          selected_template_ids: Json
          conversation_history: Json
          draft_outputs: Json
          final_output: Json | null
          edited_output: Json | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          job_title?: string
          company_name?: string
          job_description: string
          selected_prompt_ids?: Json
          ai_selections?: Json
          output_language?: string
          tone_setting?: Json
          selected_template_ids?: Json
          conversation_history?: Json
          draft_outputs?: Json
          final_output?: Json | null
          edited_output?: Json | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          job_title?: string
          company_name?: string
          job_description?: string
          selected_prompt_ids?: Json
          ai_selections?: Json
          output_language?: string
          tone_setting?: Json
          selected_template_ids?: Json
          conversation_history?: Json
          draft_outputs?: Json
          final_output?: Json | null
          edited_output?: Json | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

```

### [F094] supabase/schema.sql
```typescript
-- ═══════════════════════════════════════════════════════════════
-- [F094] supabase/schema.sql
-- Database Schema for CV Tailor
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────────────────────────────────────────────────────
-- 1. USERS TABLE
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  google_id TEXT UNIQUE,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  avatar_url TEXT,
  preferred_language TEXT DEFAULT 'en' CHECK (preferred_language IN ('en', 'fa')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────
-- 2. COMPREHENSIVE CVS TABLE
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.comprehensive_cvs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  personal_info JSONB DEFAULT '{}'::jsonb,
  work_experience JSONB DEFAULT '[]'::jsonb,
  education JSONB DEFAULT '[]'::jsonb,
  skills JSONB DEFAULT '[]'::jsonb,
  certifications JSONB DEFAULT '[]'::jsonb,
  languages JSONB DEFAULT '[]'::jsonb,
  projects JSONB DEFAULT '[]'::jsonb,
  additional_sections JSONB DEFAULT '[]'::jsonb,
  raw_text TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- ─────────────────────────────────────────────────────────────────
-- 3. PROMPTS TABLE
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.prompts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title_en TEXT NOT NULL,
  title_fa TEXT NOT NULL,
  description_en TEXT DEFAULT '',
  description_fa TEXT DEFAULT '',
  prompt_text TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────
-- 4. AI API KEYS TABLE
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.ai_api_keys (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  provider_name TEXT NOT NULL CHECK (provider_name IN ('openai', 'anthropic', 'google')),
  api_key_encrypted TEXT NOT NULL,
  is_valid BOOLEAN DEFAULT false,
  available_models JSONB DEFAULT '[]'::jsonb,
  token_balance TEXT,
  last_validated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, provider_name)
);

-- ─────────────────────────────────────────────────────────────────
-- 5. TEMPLATES TABLE
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.templates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  template_name TEXT NOT NULL,
  template_type TEXT NOT NULL CHECK (template_type IN ('cv', 'cover_letter', 'email')),
  file_format TEXT NOT NULL CHECK (file_format IN ('docx', 'md')),
  file_content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────
-- 6. JOB APPLICATIONS TABLE
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.job_applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  job_title TEXT DEFAULT '',
  company_name TEXT DEFAULT '',
  job_description TEXT NOT NULL,
  selected_prompt_ids JSONB DEFAULT '[]'::jsonb,
  ai_selections JSONB DEFAULT '[]'::jsonb,
  output_language TEXT DEFAULT 'en',
  tone_setting JSONB DEFAULT '{"mode": "preset", "preset_value": "professional", "custom_text": null}'::jsonb,
  selected_template_ids JSONB DEFAULT '{"cv": null, "cover_letter": null, "email": null}'::jsonb,
  conversation_history JSONB DEFAULT '[]'::jsonb,
  draft_outputs JSONB DEFAULT '[]'::jsonb,
  final_output JSONB,
  edited_output JSONB,
  status TEXT DEFAULT 'input' CHECK (status IN ('input', 'processing', 'clarification', 'draft_ready', 'editing', 'finalized')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ─────────────────────────────────────────────────────────────────

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comprehensive_cvs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Development policies (permissive for now - will be tightened in production)
-- Users table
CREATE POLICY "users_select_all" ON public.users FOR SELECT USING (true);
CREATE POLICY "users_insert_all" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "users_update_all" ON public.users FOR UPDATE USING (true);

-- CVs table
CREATE POLICY "cvs_all" ON public.comprehensive_cvs FOR ALL USING (true);

-- Prompts table (readable by all, manageable by all for now)
CREATE POLICY "prompts_select_all" ON public.prompts FOR SELECT USING (true);
CREATE POLICY "prompts_insert_all" ON public.prompts FOR INSERT WITH CHECK (true);
CREATE POLICY "prompts_update_all" ON public.prompts FOR UPDATE USING (true);
CREATE POLICY "prompts_delete_all" ON public.prompts FOR DELETE USING (true);

-- API Keys table
CREATE POLICY "api_keys_all" ON public.ai_api_keys FOR ALL USING (true);

-- Templates table
CREATE POLICY "templates_all" ON public.templates FOR ALL USING (true);

-- Job Applications table
CREATE POLICY "applications_all" ON public.job_applications FOR ALL USING (true);

-- ─────────────────────────────────────────────────────────────────
-- UPDATED_AT TRIGGER
-- ─────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_cvs_updated_at ON public.comprehensive_cvs;
CREATE TRIGGER update_cvs_updated_at 
  BEFORE UPDATE ON public.comprehensive_cvs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_prompts_updated_at ON public.prompts;
CREATE TRIGGER update_prompts_updated_at 
  BEFORE UPDATE ON public.prompts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_api_keys_updated_at ON public.ai_api_keys;
CREATE TRIGGER update_api_keys_updated_at 
  BEFORE UPDATE ON public.ai_api_keys
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_templates_updated_at ON public.templates;
CREATE TRIGGER update_templates_updated_at 
  BEFORE UPDATE ON public.templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_applications_updated_at ON public.job_applications;
CREATE TRIGGER update_applications_updated_at 
  BEFORE UPDATE ON public.job_applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─────────────────────────────────────────────────────────────────
-- SAMPLE PROMPTS (seed data)
-- ─────────────────────────────────────────────────────────────────

INSERT INTO public.prompts (title_en, title_fa, description_en, description_fa, prompt_text, category, sort_order) VALUES
(
  'Professional CV Tailoring',
  'تنظیم حرفه‌ای سی‌وی',
  'Create a professionally tailored CV that matches the job requirements',
  'ایجاد سی‌وی حرفه‌ای متناسب با نیازمندی‌های شغل',
  'You are an expert CV writer. Given the comprehensive CV and job description, create a tailored CV that:
1. Highlights relevant experience and skills
2. Uses keywords from the job description
3. Quantifies achievements where possible
4. Maintains a professional tone
5. Is concise and impactful

Ask clarifying questions if needed before generating the output.',
  'general',
  1
),
(
  'Tech Industry Focus',
  'تمرکز بر صنعت فناوری',
  'Optimized for technology and software positions',
  'بهینه‌شده برای موقعیت‌های فناوری و نرم‌افزار',
  'You are a tech industry recruiting specialist. Create application materials that:
1. Emphasize technical skills and technologies
2. Highlight project experience and contributions
3. Include relevant GitHub, portfolio, or technical achievements
4. Use industry-standard terminology
5. Focus on problem-solving abilities and impact

Ask about specific technologies or projects if the information seems incomplete.',
  'tech',
  2
),
(
  'Executive Level',
  'سطح مدیریتی',
  'For senior management and executive positions',
  'برای موقعیت‌های مدیریت ارشد و اجرایی',
  'You are an executive career consultant. Create application materials that:
1. Emphasize leadership experience and strategic impact
2. Quantify business results and team achievements
3. Highlight board experience, if any
4. Focus on vision and organizational transformation
5. Maintain an authoritative yet approachable tone

Ask about leadership achievements or strategic initiatives if not clear.',
  'executive',
  3
)
ON CONFLICT DO NOTHING;

```

## INSTRUCTIONS
1. Create the Supabase client files:
   - src/lib/supabase/client.ts (browser client)
   - src/lib/supabase/server.ts (server client)
   - src/lib/supabase/middleware.ts (middleware client)

2. Create src/lib/supabase/database.types.ts with TypeScript types matching the schema.

3. Create supabase/schema.sql with the complete database schema.

4. Update .env.local and .env.example to document Supabase variables.

5. IMPORTANT: The actual SQL must be run manually in Supabase SQL Editor.
   This block just creates the files.

6. Make sure all client files handle cookies correctly for Next.js 14+.


## CHECKPOINT TESTS (verify ALL after completion)
□ [T01] Supabase client files exist
□ [T02] Database types file exists
□ [T03] Schema SQL file exists
□ [T04] Client uses createBrowserClient
□ [T05] Server uses createServerClient
□ [T06] Schema has all required tables
□ [T07] TypeScript compiles without errors

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
