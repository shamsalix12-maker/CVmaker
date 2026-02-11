# BLOCK B12: AI-Powered CV Field Extraction

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

## GOAL
Create a system that uses AI to extract structured fields from raw CV text.
This replaces the regex-based approach with intelligent extraction.
Includes prompts for CV parsing and handles the AI response.


## FILES TO CREATE
[F074] src/lib/cv/cv-extractor.ts
[F107] src/lib/cv/cv-extraction-prompt.ts
[F108] src/lib/cv/cv-validator.ts
[F109] src/lib/cv/index.ts
[F110] src/app/api/cv/extract/route.ts

## FILES TO MODIFY
[F079] src/lib/types.ts

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

## FILES YOU MUST NOT TOUCH
Everything not listed above.

## INSTRUCTIONS
1. Add to types.ts:
   ```typescript
   // Add these types to the existing types.ts file
   
   export interface CVExtractionResult {
     success: boolean;
     cv: Partial<ComprehensiveCV>;
     fieldStatuses: CVFieldStatus[];
     confidence: number;  // 0-100
     rawText: string;
     aiProvider: AIProviderName;
     aiModel: string;
     extractionNotes?: string;  // Any notes from AI about the extraction
   }
   
   export interface CVExtractionRequest {
     rawText: string;
     aiProvider: AIProviderName;
     aiModel: string;
     language?: 'en' | 'fa' | 'auto';
   }
   ```

2. Create cv-extraction-prompt.ts:
   ```typescript
   // ============================================
   // [F107] src/lib/cv/cv-extraction-prompt.ts
   // ============================================
   
   export const CV_EXTRACTION_SYSTEM_PROMPT = `You are an expert CV/Resume parser. Your job is to extract structured information from CV text.

   You MUST respond with valid JSON only, no other text or markdown.

   The JSON structure must be:
   {
     "personal_info": {
       "full_name": "string or null",
       "email": "string or null",
       "phone": "string or null",
       "location": "string or null",
       "linkedin_url": "string or null",
       "website_url": "string or null",
       "summary": "string or null"
     },
     "work_experience": [
       {
         "id": "unique string",
         "job_title": "string",
         "company": "string",
         "location": "string or null",
         "start_date": "YYYY-MM or null",
         "end_date": "YYYY-MM or null (null if current)",
         "is_current": boolean,
         "description": "string",
         "achievements": ["string"]
       }
     ],
     "education": [
       {
         "id": "unique string",
         "degree": "string",
         "institution": "string",
         "location": "string or null",
         "start_date": "YYYY-MM or null",
         "end_date": "YYYY-MM or null",
         "gpa": "string or null",
         "description": "string or null"
       }
     ],
     "skills": ["string"],
     "certifications": [
       {
         "id": "unique string",
         "name": "string",
         "issuer": "string",
         "date_obtained": "YYYY-MM or null",
         "expiry_date": "YYYY-MM or null",
         "credential_url": "string or null"
       }
     ],
     "languages": [
       {
         "language": "string",
         "proficiency": "Native | Fluent | Advanced | Intermediate | Basic"
       }
     ],
     "projects": [
       {
         "id": "unique string",
         "name": "string",
         "description": "string",
         "url": "string or null"
       }
     ],
     "confidence": 0-100,
     "notes": "Any observations about the CV quality or missing information"
   }

   Rules:
   1. Extract ALL information you can find
   2. Use null for fields that are not present
   3. Generate unique IDs for list items (use simple strings like "work-1", "edu-1", etc.)
   4. Normalize dates to YYYY-MM format when possible
   5. If a date says "Present" or "Current", set is_current to true and end_date to null
   6. Extract achievements as separate items in the achievements array
   7. Be thorough - don't miss any information
   8. The confidence score should reflect how complete and clear the CV is
   9. Add any observations to the notes field`;
   
   export const CV_EXTRACTION_USER_PROMPT = (cvText: string) => 
     `Please parse the following CV/Resume and extract all structured information:

   ---CV TEXT START---
   ${cvText}
   ---CV TEXT END---

   Respond with JSON only.`;
   
   // Alternative prompt for unclear/short CVs
   export const CV_EXTRACTION_CLARIFICATION_PROMPT = (cvText: string, missingFields: string[]) =>
     `The CV appears to be missing some important information. Please try to extract what's available and note the missing fields.
   
   Missing fields: ${missingFields.join(', ')}
   
   CV Text:
   ${cvText}
   
   Respond with JSON only, using null for missing fields.`;
   ```

3. Create cv-validator.ts:
   ```typescript
   // ============================================
   // [F108] src/lib/cv/cv-validator.ts
   // ============================================
   
   import { ComprehensiveCV, CVFieldStatus } from '@/lib/types';
   import { CV_REQUIRED_FIELDS } from '@/lib/constants';
   
   export function validateExtractedCV(cv: Partial<ComprehensiveCV>): CVFieldStatus[] {
     const statuses: CVFieldStatus[] = [];
     
     // Check personal info fields
     const personalFields = ['full_name', 'email', 'phone', 'summary'];
     for (const field of personalFields) {
       const value = cv.personal_info?.[field as keyof typeof cv.personal_info];
       statuses.push({
         field_name: `personal_info.${field}`,
         is_complete: Boolean(value && String(value).trim().length > 0),
         current_value: value || null
       });
     }
     
     // Check work experience
     statuses.push({
       field_name: 'work_experience',
       is_complete: (cv.work_experience?.length || 0) > 0,
       current_value: cv.work_experience || []
     });
     
     // Check education
     statuses.push({
       field_name: 'education',
       is_complete: (cv.education?.length || 0) > 0,
       current_value: cv.education || []
     });
     
     // Check skills
     statuses.push({
       field_name: 'skills',
       is_complete: (cv.skills?.length || 0) > 0,
       current_value: cv.skills || []
     });
     
     return statuses;
   }
   
   export function getMissingFields(statuses: CVFieldStatus[]): string[] {
     return statuses
       .filter(s => !s.is_complete)
       .map(s => s.field_name);
   }
   
   export function getCompletionPercentage(statuses: CVFieldStatus[]): number {
     if (statuses.length === 0) return 0;
     const complete = statuses.filter(s => s.is_complete).length;
     return Math.round((complete / statuses.length) * 100);
   }
   
   export function isMinimumViable(cv: Partial<ComprehensiveCV>): boolean {
     // A CV is minimally viable if it has at least:
     // - Name
     // - Email OR Phone
     // - At least one work experience OR education
     const hasName = Boolean(cv.personal_info?.full_name);
     const hasContact = Boolean(cv.personal_info?.email || cv.personal_info?.phone);
     const hasExperience = (cv.work_experience?.length || 0) > 0;
     const hasEducation = (cv.education?.length || 0) > 0;
     
     return hasName && hasContact && (hasExperience || hasEducation);
   }
   ```

4. Create cv-extractor.ts:
   ```typescript
   // ============================================
   // [F074] src/lib/cv/cv-extractor.ts
   // ============================================
   
   import { getAIProvider } from '@/lib/ai';
   import { AIProviderConfig, AICompletionOptions } from '@/lib/ai/ai-provider';
   import { 
     CVExtractionResult, 
     CVExtractionRequest,
     ComprehensiveCV,
     AIProviderName 
   } from '@/lib/types';
   import { 
     CV_EXTRACTION_SYSTEM_PROMPT, 
     CV_EXTRACTION_USER_PROMPT 
   } from './cv-extraction-prompt';
   import { validateExtractedCV, getCompletionPercentage } from './cv-validator';
   import { generateId } from '@/lib/utils';
   
   export async function extractCVWithAI(
     request: CVExtractionRequest,
     apiKey: string
   ): Promise<CVExtractionResult> {
     const { rawText, aiProvider, aiModel } = request;
     
     const provider = getAIProvider(aiProvider);
     
     const config: AIProviderConfig = {
       apiKey,
       temperature: 0.1,  // Low temperature for consistent extraction
       maxTokens: 4096
     };
     
     const options: AICompletionOptions = {
       model: aiModel,
       messages: [
         { role: 'system', content: CV_EXTRACTION_SYSTEM_PROMPT },
         { role: 'user', content: CV_EXTRACTION_USER_PROMPT(rawText) }
       ],
       jsonMode: true  // Request JSON output where supported
     };
     
     try {
       const response = await provider.complete(config, options);
       const parsed = provider.parseJsonResponse<any>(response);
       
       if (!parsed) {
         return {
           success: false,
           cv: {},
           fieldStatuses: [],
           confidence: 0,
           rawText,
           aiProvider,
           aiModel,
           extractionNotes: 'Failed to parse AI response as JSON'
         };
       }
       
       // Transform parsed data to our CV structure
       const cv: Partial<ComprehensiveCV> = {
         personal_info: parsed.personal_info || {},
         work_experience: (parsed.work_experience || []).map((w: any) => ({
           ...w,
           id: w.id || generateId()
         })),
         education: (parsed.education || []).map((e: any) => ({
           ...e,
           id: e.id || generateId()
         })),
         skills: parsed.skills || [],
         certifications: (parsed.certifications || []).map((c: any) => ({
           ...c,
           id: c.id || generateId()
         })),
         languages: parsed.languages || [],
         projects: (parsed.projects || []).map((p: any) => ({
           ...p,
           id: p.id || generateId()
         })),
         additional_sections: [],
         raw_text: rawText
       };
       
       const fieldStatuses = validateExtractedCV(cv);
       const completionPercentage = getCompletionPercentage(fieldStatuses);
       
       return {
         success: true,
         cv,
         fieldStatuses,
         confidence: parsed.confidence || completionPercentage,
         rawText,
         aiProvider,
         aiModel,
         extractionNotes: parsed.notes
       };
       
     } catch (error: any) {
       return {
         success: false,
         cv: {},
         fieldStatuses: [],
         confidence: 0,
         rawText,
         aiProvider,
         aiModel,
         extractionNotes: `Extraction failed: ${error.message}`
       };
     }
   }
   ```

5. Create index.ts:
   ```typescript
   // ============================================
   // [F109] src/lib/cv/index.ts
   // ============================================
   
   export * from './cv-extractor';
   export * from './cv-extraction-prompt';
   export * from './cv-validator';
   ```

6. Create api/cv/extract/route.ts:
   ```typescript
   // ============================================
   // [F110] src/app/api/cv/extract/route.ts
   // ============================================
   
   import { NextRequest, NextResponse } from 'next/server';
   import { createServerSupabaseClient } from '@/lib/supabase/server';
   import { extractCVWithAI } from '@/lib/cv';
   import { decryptApiKey } from '@/lib/encryption';
   import { parseFile } from '@/lib/parsers';
   import { AIProviderName } from '@/lib/types';
   
   export async function POST(request: NextRequest) {
     const supabase = createServerSupabaseClient();
     const userId = request.headers.get('x-user-id');
     
     if (!userId) {
       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
     }
     
     const formData = await request.formData();
     const file = formData.get('file') as File | null;
     const rawText = formData.get('rawText') as string | null;
     const provider = formData.get('provider') as AIProviderName;
     const model = formData.get('model') as string;
     
     if (!provider || !model) {
       return NextResponse.json({ 
         error: 'AI provider and model are required' 
       }, { status: 400 });
     }
     
     // Get the user's API key for this provider
     const { data: keyData, error: keyError } = await supabase
       .from('ai_api_keys')
       .select('api_key_encrypted')
       .eq('user_id', userId)
       .eq('provider_name', provider)
       .single();
     
     if (keyError || !keyData) {
       return NextResponse.json({ 
         error: `No API key found for ${provider}. Please add one in Settings.` 
       }, { status: 400 });
     }
     
     // Decrypt the API key
     let apiKey: string;
     try {
       apiKey = decryptApiKey(keyData.api_key_encrypted);
     } catch {
       return NextResponse.json({ 
         error: 'Failed to decrypt API key' 
       }, { status: 500 });
     }
     
     // Get the raw text (either from file or direct input)
     let textToProcess: string;
     
     if (file) {
       try {
         const parsed = await parseFile(file);
         textToProcess = parsed.text;
       } catch (error: any) {
         return NextResponse.json({ 
           error: `Failed to parse file: ${error.message}` 
         }, { status: 400 });
       }
     } else if (rawText) {
       textToProcess = rawText;
     } else {
       return NextResponse.json({ 
         error: 'Either file or rawText is required' 
       }, { status: 400 });
     }
     
     // Extract CV fields using AI
     const result = await extractCVWithAI(
       {
         rawText: textToProcess,
         aiProvider: provider,
         aiModel: model
       },
       apiKey
     );
     
     return NextResponse.json(result);
   }
   ```


## CHECKPOINT TESTS (verify ALL after completion)
□ [T01] All CV extraction files exist
□ [T02] TypeScript compiles without errors
□ [T03] cv-extractor.ts uses AI provider
□ [T04] cv-extraction-prompt.ts has extraction prompts
□ [T05] cv-validator.ts has validation functions
□ [T06] API route uses AI extraction
□ [T07] types.ts has CVExtractionResult

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
