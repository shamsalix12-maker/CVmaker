# BLOCK B10: AI Provider Interface (Abstract Layer)

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

## GOAL
Create an abstract interface for AI providers (OpenAI, Anthropic, Google).
This allows the app to work with multiple AI services through a unified API.
This block is moved earlier because AI is needed for CV field extraction.


## FILES TO CREATE
[F066] src/lib/ai/ai-provider.ts
[F067] src/lib/ai/openai-provider.ts
[F068] src/lib/ai/anthropic-provider.ts
[F069] src/lib/ai/google-ai-provider.ts
[F070] src/lib/ai/ai-factory.ts
[F104] src/lib/ai/index.ts

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
[F072] src/lib/parsers/docx-parser.ts (from B09)
[F073] src/lib/parsers/markdown-parser.ts (from B09)
[F095] src/lib/parsers/index.ts (from B09)

## FILES YOU MUST NOT TOUCH
Everything not listed above.

## INSTRUCTIONS
1. Create ai-provider.ts - The abstract interface:
   ```typescript
   // ============================================
   // [F066] src/lib/ai/ai-provider.ts
   // Abstract AI Provider Interface
   // ============================================
   
   import { AIProviderName, AIModel, AIChatMessage } from '@/lib/types';
   
   export interface AIProviderConfig {
     apiKey: string;
     model?: string;
     temperature?: number;
     maxTokens?: number;
   }
   
   export interface AIValidationResult {
     valid: boolean;
     error?: string;
     models?: AIModel[];
     balance?: string | null;
   }
   
   export interface AICompletionOptions {
     model: string;
     messages: AIChatMessage[];
     temperature?: number;
     maxTokens?: number;
     jsonMode?: boolean;  // Request JSON output
   }
   
   export interface AIProvider {
     readonly providerName: AIProviderName;
     
     // Validate API key and get available models
     validateKey(apiKey: string): Promise<AIValidationResult>;
     
     // Get list of available models
     getModels(apiKey: string): Promise<AIModel[]>;
     
     // Simple completion (non-streaming)
     complete(config: AIProviderConfig, options: AICompletionOptions): Promise<string>;
     
     // Streaming completion
     streamComplete(
       config: AIProviderConfig,
       options: AICompletionOptions,
       onChunk: (chunk: string) => void
     ): Promise<string>;
     
     // Parse JSON response (with error handling)
     parseJsonResponse<T>(response: string): T | null;
   }
   
   // Base class with common functionality
   export abstract class BaseAIProvider implements AIProvider {
     abstract readonly providerName: AIProviderName;
     
     abstract validateKey(apiKey: string): Promise<AIValidationResult>;
     abstract getModels(apiKey: string): Promise<AIModel[]>;
     abstract complete(config: AIProviderConfig, options: AICompletionOptions): Promise<string>;
     abstract streamComplete(
       config: AIProviderConfig,
       options: AICompletionOptions,
       onChunk: (chunk: string) => void
     ): Promise<string>;
     
     parseJsonResponse<T>(response: string): T | null {
       try {
         // Try to extract JSON from response
         // Handle cases where AI wraps JSON in markdown code blocks
         let jsonStr = response;
         
         // Remove markdown code blocks if present
         const jsonMatch = response.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
         if (jsonMatch) {
           jsonStr = jsonMatch[1];
         }
         
         return JSON.parse(jsonStr) as T;
       } catch (e) {
         console.error('Failed to parse JSON response:', e);
         return null;
       }
     }
   }
   ```

2. Create openai-provider.ts:
   ```typescript
   // ============================================
   // [F067] src/lib/ai/openai-provider.ts
   // ============================================
   
   import OpenAI from 'openai';
   import { BaseAIProvider, AIProviderConfig, AICompletionOptions, AIValidationResult } from './ai-provider';
   import { AIProviderName, AIModel } from '@/lib/types';
   
   export class OpenAIProvider extends BaseAIProvider {
     readonly providerName: AIProviderName = 'openai';
     
     private createClient(apiKey: string): OpenAI {
       return new OpenAI({ apiKey });
     }
     
     async validateKey(apiKey: string): Promise<AIValidationResult> {
       try {
         const client = this.createClient(apiKey);
         const models = await client.models.list();
         
         const availableModels: AIModel[] = models.data
           .filter(m => m.id.includes('gpt'))
           .map(m => ({
             model_id: m.id,
             model_name: m.id,
             provider: 'openai' as AIProviderName
           }));
         
         return {
           valid: true,
           models: availableModels
         };
       } catch (error: any) {
         return {
           valid: false,
           error: error.message || 'Invalid API key'
         };
       }
     }
     
     async getModels(apiKey: string): Promise<AIModel[]> {
       const result = await this.validateKey(apiKey);
       return result.models || [];
     }
     
     async complete(config: AIProviderConfig, options: AICompletionOptions): Promise<string> {
       const client = this.createClient(config.apiKey);
       
       const response = await client.chat.completions.create({
         model: options.model,
         messages: options.messages.map(m => ({
           role: m.role as 'system' | 'user' | 'assistant',
           content: m.content
         })),
         temperature: options.temperature ?? config.temperature ?? 0.7,
         max_tokens: options.maxTokens ?? config.maxTokens ?? 4096,
         response_format: options.jsonMode ? { type: 'json_object' } : undefined
       });
       
       return response.choices[0]?.message?.content || '';
     }
     
     async streamComplete(
       config: AIProviderConfig,
       options: AICompletionOptions,
       onChunk: (chunk: string) => void
     ): Promise<string> {
       const client = this.createClient(config.apiKey);
       
       const stream = await client.chat.completions.create({
         model: options.model,
         messages: options.messages.map(m => ({
           role: m.role as 'system' | 'user' | 'assistant',
           content: m.content
         })),
         temperature: options.temperature ?? config.temperature ?? 0.7,
         max_tokens: options.maxTokens ?? config.maxTokens ?? 4096,
         stream: true
       });
       
       let fullResponse = '';
       for await (const chunk of stream) {
         const content = chunk.choices[0]?.delta?.content || '';
         fullResponse += content;
         onChunk(content);
       }
       
       return fullResponse;
     }
   }
   ```

3. Create anthropic-provider.ts:
   ```typescript
   // ============================================
   // [F068] src/lib/ai/anthropic-provider.ts
   // ============================================
   
   import Anthropic from '@anthropic-ai/sdk';
   import { BaseAIProvider, AIProviderConfig, AICompletionOptions, AIValidationResult } from './ai-provider';
   import { AIProviderName, AIModel } from '@/lib/types';
   
   export class AnthropicProvider extends BaseAIProvider {
     readonly providerName: AIProviderName = 'anthropic';
     
     // Known Claude models (Anthropic doesn't have a models list API)
     private readonly KNOWN_MODELS: AIModel[] = [
       { model_id: 'claude-3-5-sonnet-20241022', model_name: 'Claude 3.5 Sonnet', provider: 'anthropic' },
       { model_id: 'claude-3-5-haiku-20241022', model_name: 'Claude 3.5 Haiku', provider: 'anthropic' },
       { model_id: 'claude-3-opus-20240229', model_name: 'Claude 3 Opus', provider: 'anthropic' },
       { model_id: 'claude-3-sonnet-20240229', model_name: 'Claude 3 Sonnet', provider: 'anthropic' },
       { model_id: 'claude-3-haiku-20240307', model_name: 'Claude 3 Haiku', provider: 'anthropic' },
     ];
     
     private createClient(apiKey: string): Anthropic {
       return new Anthropic({ apiKey });
     }
     
     async validateKey(apiKey: string): Promise<AIValidationResult> {
       try {
         const client = this.createClient(apiKey);
         
         // Make a minimal API call to verify the key
         await client.messages.create({
           model: 'claude-3-haiku-20240307',
           max_tokens: 10,
           messages: [{ role: 'user', content: 'Hi' }]
         });
         
         return {
           valid: true,
           models: this.KNOWN_MODELS
         };
       } catch (error: any) {
         return {
           valid: false,
           error: error.message || 'Invalid API key'
         };
       }
     }
     
     async getModels(apiKey: string): Promise<AIModel[]> {
       const result = await this.validateKey(apiKey);
       return result.valid ? this.KNOWN_MODELS : [];
     }
     
     async complete(config: AIProviderConfig, options: AICompletionOptions): Promise<string> {
       const client = this.createClient(config.apiKey);
       
       // Extract system message if present
       const systemMsg = options.messages.find(m => m.role === 'system');
       const otherMsgs = options.messages.filter(m => m.role !== 'system');
       
       const response = await client.messages.create({
         model: options.model,
         max_tokens: options.maxTokens ?? config.maxTokens ?? 4096,
         system: systemMsg?.content,
         messages: otherMsgs.map(m => ({
           role: m.role as 'user' | 'assistant',
           content: m.content
         }))
       });
       
       // Extract text from response
       const textBlock = response.content.find(c => c.type === 'text');
       return textBlock?.text || '';
     }
     
     async streamComplete(
       config: AIProviderConfig,
       options: AICompletionOptions,
       onChunk: (chunk: string) => void
     ): Promise<string> {
       const client = this.createClient(config.apiKey);
       
       const systemMsg = options.messages.find(m => m.role === 'system');
       const otherMsgs = options.messages.filter(m => m.role !== 'system');
       
       const stream = await client.messages.stream({
         model: options.model,
         max_tokens: options.maxTokens ?? config.maxTokens ?? 4096,
         system: systemMsg?.content,
         messages: otherMsgs.map(m => ({
           role: m.role as 'user' | 'assistant',
           content: m.content
         }))
       });
       
       let fullResponse = '';
       for await (const event of stream) {
         if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
           const text = event.delta.text;
           fullResponse += text;
           onChunk(text);
         }
       }
       
       return fullResponse;
     }
   }
   ```

4. Create google-ai-provider.ts:
   ```typescript
   // ============================================
   // [F069] src/lib/ai/google-ai-provider.ts
   // ============================================
   
   import { GoogleGenerativeAI } from '@google/generative-ai';
   import { BaseAIProvider, AIProviderConfig, AICompletionOptions, AIValidationResult } from './ai-provider';
   import { AIProviderName, AIModel } from '@/lib/types';
   
   export class GoogleAIProvider extends BaseAIProvider {
     readonly providerName: AIProviderName = 'google';
     
     private readonly KNOWN_MODELS: AIModel[] = [
       { model_id: 'gemini-1.5-pro', model_name: 'Gemini 1.5 Pro', provider: 'google' },
       { model_id: 'gemini-1.5-flash', model_name: 'Gemini 1.5 Flash', provider: 'google' },
       { model_id: 'gemini-1.0-pro', model_name: 'Gemini 1.0 Pro', provider: 'google' },
     ];
     
     private createClient(apiKey: string): GoogleGenerativeAI {
       return new GoogleGenerativeAI(apiKey);
     }
     
     async validateKey(apiKey: string): Promise<AIValidationResult> {
       try {
         const client = this.createClient(apiKey);
         const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });
         
         // Make a minimal API call to verify
         await model.generateContent('Hi');
         
         return {
           valid: true,
           models: this.KNOWN_MODELS
         };
       } catch (error: any) {
         return {
           valid: false,
           error: error.message || 'Invalid API key'
         };
       }
     }
     
     async getModels(apiKey: string): Promise<AIModel[]> {
       const result = await this.validateKey(apiKey);
       return result.valid ? this.KNOWN_MODELS : [];
     }
     
     async complete(config: AIProviderConfig, options: AICompletionOptions): Promise<string> {
       const client = this.createClient(config.apiKey);
       const model = client.getGenerativeModel({ 
         model: options.model,
         generationConfig: {
           temperature: options.temperature ?? config.temperature ?? 0.7,
           maxOutputTokens: options.maxTokens ?? config.maxTokens ?? 4096,
         }
       });
       
       // Convert messages to Gemini format
       const history = options.messages
         .filter(m => m.role !== 'system')
         .slice(0, -1)
         .map(m => ({
           role: m.role === 'assistant' ? 'model' : 'user',
           parts: [{ text: m.content }]
         }));
       
       const systemInstruction = options.messages.find(m => m.role === 'system')?.content;
       const lastMessage = options.messages[options.messages.length - 1];
       
       const chat = model.startChat({
         history,
         systemInstruction
       });
       
       const result = await chat.sendMessage(lastMessage.content);
       return result.response.text();
     }
     
     async streamComplete(
       config: AIProviderConfig,
       options: AICompletionOptions,
       onChunk: (chunk: string) => void
     ): Promise<string> {
       const client = this.createClient(config.apiKey);
       const model = client.getGenerativeModel({ 
         model: options.model,
         generationConfig: {
           temperature: options.temperature ?? config.temperature ?? 0.7,
           maxOutputTokens: options.maxTokens ?? config.maxTokens ?? 4096,
         }
       });
       
       const history = options.messages
         .filter(m => m.role !== 'system')
         .slice(0, -1)
         .map(m => ({
           role: m.role === 'assistant' ? 'model' : 'user',
           parts: [{ text: m.content }]
         }));
       
       const systemInstruction = options.messages.find(m => m.role === 'system')?.content;
       const lastMessage = options.messages[options.messages.length - 1];
       
       const chat = model.startChat({
         history,
         systemInstruction
       });
       
       const result = await chat.sendMessageStream(lastMessage.content);
       
       let fullResponse = '';
       for await (const chunk of result.stream) {
         const text = chunk.text();
         fullResponse += text;
         onChunk(text);
       }
       
       return fullResponse;
     }
   }
   ```

5. Create ai-factory.ts:
   ```typescript
   // ============================================
   // [F070] src/lib/ai/ai-factory.ts
   // ============================================
   
   import { AIProviderName } from '@/lib/types';
   import { AIProvider } from './ai-provider';
   import { OpenAIProvider } from './openai-provider';
   import { AnthropicProvider } from './anthropic-provider';
   import { GoogleAIProvider } from './google-ai-provider';
   
   const providers: Record<AIProviderName, AIProvider> = {
     openai: new OpenAIProvider(),
     anthropic: new AnthropicProvider(),
     google: new GoogleAIProvider(),
   };
   
   export function getAIProvider(name: AIProviderName): AIProvider {
     const provider = providers[name];
     if (!provider) {
       throw new Error(`Unknown AI provider: ${name}`);
     }
     return provider;
   }
   
   export function getAllProviders(): AIProvider[] {
     return Object.values(providers);
   }
   
   export function getProviderNames(): AIProviderName[] {
     return Object.keys(providers) as AIProviderName[];
   }
   ```

6. Create index.ts:
   ```typescript
   // ============================================
   // [F104] src/lib/ai/index.ts
   // ============================================
   
   export * from './ai-provider';
   export * from './openai-provider';
   export * from './anthropic-provider';
   export * from './google-ai-provider';
   export * from './ai-factory';
   ```


## CHECKPOINT TESTS (verify ALL after completion)
□ [T01] All AI provider files exist
□ [T02] TypeScript compiles without errors
□ [T03] ai-provider.ts exports interface and base class
□ [T04] All providers extend BaseAIProvider
□ [T05] Factory exports getAIProvider
□ [T06] index.ts exports all modules

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
