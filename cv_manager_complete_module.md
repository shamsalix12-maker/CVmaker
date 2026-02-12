# CV Manager Module - Comprehensive Documentation & Code

## 1. Module Overview & Philosophy

The **CV Manager** is the foundational module of the CV Tailor application. Its purpose is to create and maintain a "Master CV" (Comprehensive CV) for the user. This Master CV serves as the single source of truth from which tailored resumes, cover letters, and application emails are generated.

### Core Logic & Workflow:

1.  **Ingestion Phase**: The system accepts inputs in two ways:
    *   **File Upload**: Supports `.pdf`, `.docx`, `.md`, and `.txt`.
    *   **Manual Paste**: Users can paste raw text from any source.
2.  **Server-Side Parsing**:
    *   Files are processed on the server to prevent client-side bundling issues (especially for PDF parsing which requires Node.js internals).
    *   **PDF**: Processed via `pdf-parse`.
    *   **DOCX**: Processed via `mammoth`.
    *   **Text/MD**: Read directly as strings.
3.  **AI Orchestration**:
    *   The raw text is sent to the AI (primarily Google Gemini 1.5/2.0) with a sophisticated **System Prompt**.
    *   The prompt enforces a strict JSON schema, ensuring that loose professional experience is mapped to structured fields like `job_title`, `company`, `achievements`, etc.
    *   **I18n Awareness**: The AI is instructed to retain the original language of the CV unless specified otherwise, but to structure the data correctly regardless of whether it's Persian, English, or German.
4.  **Data Transformation & Validation**:
    *   The AI's JSON is passed through a transformer (`cv-extractor.ts`) which ensures every entry has a unique ID (needed for React rendering and DB updates).
    *   A validator runs to calculate a "Completion Percentage" and identify which fields the user still needs to fill (e.g., missing phone number or summary).
5.  **Persistence Layer**:
    *   The data is stored in the `comprehensive_cvs` table in Supabase.
    *   An **Upsert** logic is used: if a CV exists for the user, it is updated; if not, it is created.
6.  **User Interaction (UI)**:
    *   **Progressive Disclosure**: Users start with an upload/entry screen. Once data is extracted, they are moved to a multi-tab interface:
        *   **Edit Fields**: A structured view of the extracted data for manual corrections.
        *   **Refine**: An AI-powered chat/instruction box to "polishing" the CV (e.g., "Make my work descriptions more result-oriented").
        *   **Preview**: A read-only preview of the current state.

---

## 2. Core Code - Logic & Backend

### 2.1 API Route: Extraction (`src/app/api/cv/extract/route.ts`)
Handles the incoming file/text, dispatches to parsers, and calls the AI extractor.

```typescript
// [F110] src/app/api/cv/extract/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { extractCVWithAI } from '@/lib/cv';
import { decryptApiKey } from '@/lib/encryption';
import { parseFile } from '@/lib/parsers';
import { AIProviderName } from '@/lib/types';
import { getUserId } from '@/lib/auth/server-auth';

export async function POST(request: NextRequest) {
    const userId = await getUserId(request);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const supabase = await createServerSupabaseClient();
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const rawText = formData.get('rawText') as string | null;
    const provider = formData.get('provider') as AIProviderName;
    const model = formData.get('model') as string;

    if (!provider || !model) return NextResponse.json({ error: 'AI provider and model required' }, { status: 400 });

    // API Key Retrieval
    const { data: keyData } = await supabase
        .from('ai_api_keys')
        .select('api_key_encrypted')
        .eq('user_id', userId)
        .eq('provider_name', provider)
        .single();

    if (!keyData) return NextResponse.json({ error: `No API key for ${provider}` }, { status: 400 });
    const apiKey = decryptApiKey(keyData.api_key_encrypted);

    let textToProcess: string;
    if (file) {
        console.log(`[API Extract] Received file: ${file.name}`);
        const parsed = await parseFile(file);
        textToProcess = parsed.text;
    } else {
        textToProcess = rawText || '';
    }

    if (!textToProcess.trim()) return NextResponse.json({ error: 'Empty text' }, { status: 400 });

    const result = await extractCVWithAI({ rawText: textToProcess, aiProvider: provider, aiModel: model }, apiKey);
    return NextResponse.json(result);
}
```

### 2.2 AI Extractor Engine (`src/lib/cv/cv-extractor.ts`)
Converts raw AI text into valid TypeScript objects.

```typescript
// [F074] src/lib/cv/cv-extractor.ts
import { getAIProvider } from '@/lib/ai';
import { CV_EXTRACTION_SYSTEM_PROMPT, CV_EXTRACTION_USER_PROMPT } from './cv-extraction-prompt';
import { generateId } from '@/lib/helpers';

export async function extractCVWithAI(request: any, apiKey: string) {
    const provider = getAIProvider(request.aiProvider);
    const response = await provider.complete({ apiKey }, {
        model: request.aiModel,
        messages: [
            { role: 'system', content: CV_EXTRACTION_SYSTEM_PROMPT },
            { role: 'user', content: CV_EXTRACTION_USER_PROMPT(request.rawText) }
        ],
        jsonMode: request.aiProvider !== 'google'
    });

    const parsed = provider.parseJsonResponse(response);
    if (!parsed) return { success: false, extractionNotes: 'JSON Parse Error' };

    const cv = transformAICVData(parsed, request.rawText);
    return { success: true, cv, confidence: parsed.confidence || 0.8 };
}

function transformAICVData(parsed: any, rawText: string) {
    // Normalizes AI output, adds IDs to arrays
    return {
        personal_info: parsed.personal_info || {},
        work_experience: (parsed.work_experience || []).map(w => ({ ...w, id: w.id || generateId() })),
        education: (parsed.education || []).map(e => ({ ...e, id: e.id || generateId() })),
        skills: parsed.skills || [],
        raw_text: rawText
    };
}
```

### 2.3 Database Service (`src/lib/cv/cv-service.ts`)
Handles Supabase operations.

```typescript
// src/lib/cv/cv-service.ts
export class CVService {
    async upsertCV(userId: string, cv: Partial<ComprehensiveCV>) {
        const existing = await this.getCV(userId);
        if (existing) {
            return this.updateCV(userId, cv);
        } else {
            return this.createCV(userId, cv);
        }
    }
    // ... createCV and updateCV use this.supabase.from('comprehensive_cvs')
}
```

### 2.4 File Parsers (`src/lib/parsers/`)
Extracts text from various file formats.

```typescript
// src/lib/parsers/index.ts
import { parseDocx } from './docx-parser';
import { parsePdf } from './pdf-parser';

export async function parseFile(file: File) {
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return parsePdf(file);
    if (ext === 'docx') return parseDocx(file);
    if (ext === 'txt' || ext === 'md') return { text: await file.text() };
    throw new Error('Unsupported format');
}

// src/lib/parsers/pdf-parser.ts
export async function parsePdf(file: File) {
    if (typeof window !== 'undefined') throw new Error('Server only');
    const pdf = require('pdf-parse');
    const data = await pdf(Buffer.from(await file.arrayBuffer()));
    return { text: data.text };
}
```

---

## 3. Core Code - Frontend & UI

### 3.1 Main Hook (`src/hooks/useCV.ts`)
The bridge between UI and API.

```typescript
// src/hooks/useCV.ts
export function useCV() {
    const [cv, setCV] = useState<ComprehensiveCV | null>(null);
    
    const saveCV = async (data: Partial<ComprehensiveCV>) => {
        // Calls PUT /api/cv
    };

    const extractFromText = async (text: string, provider: string, model: string) => {
        const res = await fetch('/api/cv/extract', {
            method: 'POST',
            body: JSON.stringify({ rawText: text, provider, model })
        });
        return res.json();
    };

    return { cv, saveCV, extractFromText, ... };
}
```

### 3.2 UI Page (`src/app/[locale]/cv-manager/page.tsx`)
The view controller manages state and transitions.

```typescript
// src/app/[locale]/cv-manager/page.tsx
export default function CVManagerPage() {
    const { cv, extractFromText, applyExtraction } = useCV();
    const [activeTab, setActiveTab] = useState('upload');

    const handleManualConfirm = async (text: string) => {
        const result = await extractFromText(text, 'google', 'gemini-1.5-flash');
        if (result.success) {
            await applyExtraction(result);
            setActiveTab('fields');
        }
    };

    return (
        <MainLayout>
            {activeTab === 'upload' && <CVUploader onExtractionComplete={...} />}
            {activeTab === 'fields' && <CVFieldDisplay cv={cv} />}
            {/* ... */}
        </MainLayout>
    );
}
```

---

## 4. Why it might "Return Nothing" (Debugging for the next AI)

If you are seeing "nothing returns", check these common fail points:

1.  **AI Response Format**: If Gemini returns plain text with "Sure, here is your JSON..." outside the backticks, the `BaseAIProvider.parseJsonResponse` must try to find the `{` manually. (I recently added a heuristic for this).
2.  **API Key Encryption**: Ensure `decryptApiKey` is working. If the key is invalid, the `extractCVWithAI` will catch an error but might return `success: false` which the UI should handle.
3.  **PDF/Docx Parsing**: If `parseFile` fails, the API returns 400. Check the Network tab in Chrome.
4.  **Supabase RLS**: If the database Row Level Security is misconfigured, `saveCV` might silently fail or return a 403, and the UI won't update the `cv` state.
5.  **Upsert Logic**: In `cv-service.ts`, we now use a "check then insert/update" logic. If the unique constraint in Postgres is missing, the original `onConflict` was failing.
