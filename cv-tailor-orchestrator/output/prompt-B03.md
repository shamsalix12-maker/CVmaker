# BLOCK B03: Central TypeScript Types

## COMPLETED BLOCKS
- B01 ✅: Create Empty Next.js Project — Files: [F001], [F002], [F003], [F004], [F005], [F006], [F007], [F008], [F009]
- B02 ✅: Install All Dependencies — Files: [F027], [F028], [F029], [F030], [F031], [F032], [F033], [F034], [F035], [F036], [F090], [F091]

## GOAL
Define ALL TypeScript types and interfaces for the entire project
in a single central file. This becomes the source of truth for 
all type definitions.


## FILES TO CREATE
[F079] src/lib/types.ts

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
[F090] src/lib/utils.ts (from B02)
[F091] components.json (from B02)

## FILES YOU MUST NOT TOUCH
Everything not listed above.

## EXACT FILE CONTENTS
### [F079] src/lib/types.ts
```typescript
// ═══════════════════════════════════════════════════════════════
// [F079] src/lib/types.ts
// Central TypeScript Type Definitions
// ALL types for the entire application are defined here
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────
// USER TYPES
// ─────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  google_id: string | null;
  email: string;
  name: string;
  avatar_url: string | null;
  preferred_language: AppLocale;
  created_at: string;
  updated_at: string;
}

// ─────────────────────────────────────────────────────────────────
// CV TYPES
// ─────────────────────────────────────────────────────────────────

export interface PersonalInfo {
  full_name: string;
  email: string;
  phone: string;
  location: string;
  linkedin_url: string;
  website_url: string;
  summary: string;
}

export interface WorkExperience {
  id: string;
  job_title: string;
  company: string;
  location: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  degree: string;
  field_of_study: string;
  institution: string;
  location: string;
  start_date: string;
  end_date: string;
  gpa: string | null;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date_obtained: string;
  expiry_date: string | null;
  credential_id: string | null;
  credential_url: string | null;
}

export interface Language {
  language: string;
  proficiency: 'native' | 'fluent' | 'advanced' | 'intermediate' | 'beginner';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url: string | null;
  start_date: string | null;
  end_date: string | null;
}

export interface AdditionalSection {
  id: string;
  title: string;
  content: string;
}

export interface ComprehensiveCV {
  id: string;
  user_id: string;
  personal_info: PersonalInfo;
  work_experience: WorkExperience[];
  education: Education[];
  skills: string[];
  certifications: Certification[];
  languages: Language[];
  projects: Project[];
  additional_sections: AdditionalSection[];
  raw_text: string;
  created_at: string;
  updated_at: string;
}

export interface CVFieldStatus {
  field_path: string;
  field_name: string;
  is_complete: boolean;
  is_required: boolean;
  current_value: unknown;
  message?: string;
}

export type CVSection = 
  | 'personal_info'
  | 'work_experience'
  | 'education'
  | 'skills'
  | 'certifications'
  | 'languages'
  | 'projects'
  | 'additional_sections';

// ─────────────────────────────────────────────────────────────────
// PROMPT TYPES
// ─────────────────────────────────────────────────────────────────

export interface Prompt {
  id: string;
  title_en: string;
  title_fa: string;
  description_en: string;
  description_fa: string;
  prompt_text: string;
  category: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface PromptCategory {
  id: string;
  name_en: string;
  name_fa: string;
  sort_order: number;
}

// ─────────────────────────────────────────────────────────────────
// AI TYPES
// ─────────────────────────────────────────────────────────────────

export type AIProviderName = 'openai' | 'anthropic' | 'google';

export interface AIModel {
  model_id: string;
  model_name: string;
  provider: AIProviderName;
  context_window?: number;
  supports_streaming: boolean;
}

export interface AIApiKey {
  id: string;
  user_id: string;
  provider_name: AIProviderName;
  api_key_encrypted: string;
  is_valid: boolean;
  available_models: AIModel[];
  token_balance: string | null;
  last_validated_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AISelection {
  provider: AIProviderName;
  model_id: string;
  role: 'draft' | 'final';
}

export interface AIChatMessage {
  id: string;
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface AIConnectionStatus {
  provider: AIProviderName;
  is_connected: boolean;
  error_message?: string;
  available_models: AIModel[];
  token_balance?: string;
  last_checked: string;
}

// ─────────────────────────────────────────────────────────────────
// APPLICATION TYPES
// ─────────────────────────────────────────────────────────────────

export type OutputLanguage = 'en' | 'fa' | 'fr' | 'de' | 'es' | 'ar' | 'zh' | 'tr';

export type ToneMode = 'preset' | 'custom';

export type TonePreset = 
  | 'formal'
  | 'semi-formal'
  | 'professional'
  | 'friendly'
  | 'creative'
  | 'confident';

export interface ToneSetting {
  mode: ToneMode;
  preset_value: TonePreset | null;
  custom_text: string | null;
}

export type ApplicationStatus =
  | 'input'
  | 'processing'
  | 'clarification'
  | 'draft_ready'
  | 'editing'
  | 'finalized';

export interface DraftOutput {
  id: string;
  ai_provider: AIProviderName;
  ai_model: string;
  content: string;
  created_at: string;
}

export interface FinalOutput {
  tailored_cv: string;
  cover_letter: string;
  application_email: string;
}

export interface JobApplication {
  id: string;
  user_id: string;
  job_title: string;
  company_name: string;
  job_description: string;
  selected_prompt_ids: string[];
  ai_selections: AISelection[];
  output_language: OutputLanguage;
  tone_setting: ToneSetting;
  selected_template_ids: {
    cv: string | null;
    cover_letter: string | null;
    email: string | null;
  };
  conversation_history: AIChatMessage[];
  draft_outputs: DraftOutput[];
  final_output: FinalOutput | null;
  edited_output: FinalOutput | null;
  status: ApplicationStatus;
  created_at: string;
  updated_at: string;
}

// ─────────────────────────────────────────────────────────────────
// TEMPLATE TYPES
// ─────────────────────────────────────────────────────────────────

export type TemplateType = 'cv' | 'cover_letter' | 'email';
export type FileFormat = 'docx' | 'md';

export interface Template {
  id: string;
  user_id: string;
  template_name: string;
  template_type: TemplateType;
  file_format: FileFormat;
  file_content: string;
  preview_url?: string;
  created_at: string;
  updated_at: string;
}

// ─────────────────────────────────────────────────────────────────
// UI / APP TYPES
// ─────────────────────────────────────────────────────────────────

export type AppLocale = 'en' | 'fa';

export interface NavigationItem {
  id: string;
  label_key: string;
  href: string;
  icon: string;
  badge?: number;
}

export interface BreadcrumbItem {
  label_key: string;
  href?: string;
}

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

// ─────────────────────────────────────────────────────────────────
// API RESPONSE TYPES
// ─────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  has_more: boolean;
}

// ─────────────────────────────────────────────────────────────────
// FORM TYPES
// ─────────────────────────────────────────────────────────────────

export interface FormFieldError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: FormFieldError[];
  isSubmitting: boolean;
  isValid: boolean;
}

```

## INSTRUCTIONS
1. Create the file src/lib/types.ts with ALL the types defined above.

2. This file is the SINGLE SOURCE OF TRUTH for all TypeScript types.

3. All future files will import types from this file.

4. Do NOT create any other files in this block.

5. Make sure all interfaces and types are exported.

6. Verify TypeScript compiles without errors.


## CHECKPOINT TESTS (verify ALL after completion)
□ [T01] types.ts file exists
□ [T02] All core interfaces are exported
□ [T03] All core types are exported
□ [T04] TypeScript compiles without errors

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
