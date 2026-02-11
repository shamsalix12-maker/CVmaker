# BLOCK B11: API Key Encryption and Storage

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

## GOAL
Create secure storage for AI API keys with encryption.
Users can add, validate, and manage their API keys for different AI providers.
Keys are encrypted before storing in Supabase.


## FILES TO CREATE
[F077] src/lib/encryption.ts
[F105] src/app/api/ai/keys/route.ts
[F106] src/app/api/ai/validate/route.ts
[F081] src/hooks/useAIKeys.ts

## FILES TO MODIFY
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

## FILES YOU MUST NOT TOUCH
Everything not listed above.

## INSTRUCTIONS
1. Create encryption.ts:
   ```typescript
   // ============================================
   // [F077] src/lib/encryption.ts
   // ============================================
   
   import CryptoJS from 'crypto-js';
   
   const SECRET_KEY = process.env.ENCRYPTION_SECRET_KEY || 'default-dev-key-change-in-prod';
   
   export function encrypt(text: string): string {
     return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
   }
   
   export function decrypt(encryptedText: string): string {
     const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
     return bytes.toString(CryptoJS.enc.Utf8);
   }
   
   // For API keys, add extra validation
   export function encryptApiKey(apiKey: string): string {
     if (!apiKey || apiKey.trim().length === 0) {
       throw new Error('API key cannot be empty');
     }
     return encrypt(apiKey.trim());
   }
   
   export function decryptApiKey(encryptedKey: string): string {
     try {
       const decrypted = decrypt(encryptedKey);
       if (!decrypted) {
         throw new Error('Decryption failed');
       }
       return decrypted;
     } catch (error) {
       throw new Error('Failed to decrypt API key');
     }
   }
   ```

2. Create api/ai/keys/route.ts:
   ```typescript
   // ============================================
   // [F105] src/app/api/ai/keys/route.ts
   // ============================================
   
   import { NextRequest, NextResponse } from 'next/server';
   import { createServerSupabaseClient } from '@/lib/supabase/server';
   import { encryptApiKey, decryptApiKey } from '@/lib/encryption';
   import { getAIProvider } from '@/lib/ai';
   import { AIProviderName, AIApiKey } from '@/lib/types';
   
   // GET - List all API keys for current user (without decrypted keys)
   export async function GET(request: NextRequest) {
     const supabase = createServerSupabaseClient();
     
     // Get current user (from dev auth or session)
     const userId = request.headers.get('x-user-id'); // Simplified for dev
     if (!userId) {
       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
     }
     
     const { data, error } = await supabase
       .from('ai_api_keys')
       .select('id, provider_name, is_valid, available_models, token_balance, last_validated_at')
       .eq('user_id', userId);
     
     if (error) {
       return NextResponse.json({ error: error.message }, { status: 500 });
     }
     
     return NextResponse.json({ keys: data });
   }
   
   // POST - Add or update an API key
   export async function POST(request: NextRequest) {
     const supabase = createServerSupabaseClient();
     const userId = request.headers.get('x-user-id');
     
     if (!userId) {
       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
     }
     
     const { provider_name, api_key } = await request.json();
     
     if (!provider_name || !api_key) {
       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
     }
     
     // Validate the key
     const provider = getAIProvider(provider_name as AIProviderName);
     const validation = await provider.validateKey(api_key);
     
     // Encrypt the key
     const encryptedKey = encryptApiKey(api_key);
     
     // Upsert the key
     const { data, error } = await supabase
       .from('ai_api_keys')
       .upsert({
         user_id: userId,
         provider_name,
         api_key_encrypted: encryptedKey,
         is_valid: validation.valid,
         available_models: validation.models || [],
         token_balance: validation.balance,
         last_validated_at: new Date().toISOString()
       }, {
         onConflict: 'user_id,provider_name'
       })
       .select()
       .single();
     
     if (error) {
       return NextResponse.json({ error: error.message }, { status: 500 });
     }
     
     // Don't return the encrypted key
     const { api_key_encrypted, ...safeData } = data;
     
     return NextResponse.json({
       key: safeData,
       validation: {
         valid: validation.valid,
         error: validation.error,
         models: validation.models
       }
     });
   }
   
   // DELETE - Remove an API key
   export async function DELETE(request: NextRequest) {
     const supabase = createServerSupabaseClient();
     const userId = request.headers.get('x-user-id');
     const { searchParams } = new URL(request.url);
     const provider = searchParams.get('provider');
     
     if (!userId) {
       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
     }
     
     if (!provider) {
       return NextResponse.json({ error: 'Provider required' }, { status: 400 });
     }
     
     const { error } = await supabase
       .from('ai_api_keys')
       .delete()
       .eq('user_id', userId)
       .eq('provider_name', provider);
     
     if (error) {
       return NextResponse.json({ error: error.message }, { status: 500 });
     }
     
     return NextResponse.json({ success: true });
   }
   ```

3. Create api/ai/validate/route.ts:
   ```typescript
   // ============================================
   // [F106] src/app/api/ai/validate/route.ts
   // ============================================
   
   import { NextRequest, NextResponse } from 'next/server';
   import { getAIProvider } from '@/lib/ai';
   import { AIProviderName } from '@/lib/types';
   
   // POST - Validate an API key without storing it
   export async function POST(request: NextRequest) {
     const { provider_name, api_key } = await request.json();
     
     if (!provider_name || !api_key) {
       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
     }
     
     try {
       const provider = getAIProvider(provider_name as AIProviderName);
       const validation = await provider.validateKey(api_key);
       
       return NextResponse.json(validation);
     } catch (error: any) {
       return NextResponse.json({
         valid: false,
         error: error.message
       });
     }
   }
   ```

4. Create hooks/useAIKeys.ts:
   ```typescript
   // ============================================
   // [F081] src/hooks/useAIKeys.ts
   // ============================================
   
   import { useState, useEffect, useCallback } from 'react';
   import { useAuth } from '@/context/AuthContext';
   import { AIProviderName, AIApiKey, AIModel } from '@/lib/types';
   
   interface StoredKey {
     id: string;
     provider_name: AIProviderName;
     is_valid: boolean;
     available_models: AIModel[];
     token_balance: string | null;
     last_validated_at: string | null;
   }
   
   export function useAIKeys() {
     const { user } = useAuth();
     const [keys, setKeys] = useState<StoredKey[]>([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState<string | null>(null);
     
     // Fetch keys on mount
     useEffect(() => {
       if (user) {
         fetchKeys();
       }
     }, [user]);
     
     const fetchKeys = useCallback(async () => {
       setLoading(true);
       setError(null);
       
       try {
         const res = await fetch('/api/ai/keys', {
           headers: { 'x-user-id': user?.id || '' }
         });
         const data = await res.json();
         
         if (data.error) {
           throw new Error(data.error);
         }
         
         setKeys(data.keys || []);
       } catch (err: any) {
         setError(err.message);
       } finally {
         setLoading(false);
       }
     }, [user]);
     
     const addKey = useCallback(async (provider: AIProviderName, apiKey: string) => {
       setError(null);
       
       try {
         const res = await fetch('/api/ai/keys', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
             'x-user-id': user?.id || ''
           },
           body: JSON.stringify({
             provider_name: provider,
             api_key: apiKey
           })
         });
         
         const data = await res.json();
         
         if (data.error) {
           throw new Error(data.error);
         }
         
         await fetchKeys();
         return data.validation;
       } catch (err: any) {
         setError(err.message);
         throw err;
       }
     }, [user, fetchKeys]);
     
     const removeKey = useCallback(async (provider: AIProviderName) => {
       try {
         await fetch(`/api/ai/keys?provider=${provider}`, {
           method: 'DELETE',
           headers: { 'x-user-id': user?.id || '' }
         });
         await fetchKeys();
       } catch (err: any) {
         setError(err.message);
       }
     }, [user, fetchKeys]);
     
     const validateKey = useCallback(async (provider: AIProviderName, apiKey: string) => {
       const res = await fetch('/api/ai/validate', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           provider_name: provider,
           api_key: apiKey
         })
       });
       return res.json();
     }, []);
     
     const getModelsForProvider = useCallback((provider: AIProviderName): AIModel[] => {
       const key = keys.find(k => k.provider_name === provider);
       return key?.available_models || [];
     }, [keys]);
     
     const hasValidKey = useCallback((provider: AIProviderName): boolean => {
       const key = keys.find(k => k.provider_name === provider);
       return key?.is_valid || false;
     }, [keys]);
     
     const getValidProviders = useCallback((): AIProviderName[] => {
       return keys.filter(k => k.is_valid).map(k => k.provider_name);
     }, [keys]);
     
     return {
       keys,
       loading,
       error,
       fetchKeys,
       addKey,
       removeKey,
       validateKey,
       getModelsForProvider,
       hasValidKey,
       getValidProviders
     };
   }
   ```

5. Add translations to en.json under "ai_keys":
   - title, add_key, provider, api_key, validate, save, delete
   - status_valid, status_invalid, status_checking
   - key_saved, key_deleted, validation_failed
   - enter_api_key_placeholder

6. Add same translations to fa.json


## CHECKPOINT TESTS (verify ALL after completion)
□ [T01] All API key management files exist
□ [T02] TypeScript compiles without errors
□ [T03] encryption.ts exports encrypt/decrypt functions
□ [T04] Keys API route has all CRUD methods
□ [T05] useAIKeys hook exports all functions
□ [T06] English translations have ai_keys section

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
