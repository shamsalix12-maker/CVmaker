# BLOCK B20: Template Management System

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
- B12 ✅: AI-Powered CV Field Extraction — Files: [F074], [F107], [F108], [F109], [F110]
- B17 ✅: Prompt Management System — Files: [F024], [F118], [F119], [F120], [F121], [F083], [F045], [F046], [F047], [F048], [F122], [F123], [F015], [F124]
- B19 ✅: Export System (Word & Markdown) — Files: [F075], [F076], [F142], [F143], [F025], [F026], [F144]

## GOAL
Create a system for managing document templates. Users can upload Word or Markdown
templates that will be used when generating final documents. Templates can have
placeholders that get replaced with actual content.


## FILES TO CREATE
[F145] src/lib/templates/template-service.ts
[F146] src/lib/templates/template-parser.ts
[F147] src/lib/templates/index.ts
[F148] src/app/api/templates/route.ts
[F149] src/app/api/templates/[id]/route.ts
[F150] src/hooks/useTemplates.ts
[F060] src/components/templates/TemplateUploader.tsx
[F061] src/components/templates/TemplateSelector.tsx
[F062] src/components/templates/TemplatePreview.tsx
[F151] src/components/templates/TemplateList.tsx
[F152] src/components/templates/TemplateCard.tsx

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
[F077] src/lib/encryption.ts (from B11)
[F105] src/app/api/ai/keys/route.ts (from B11)
[F106] src/app/api/ai/validate/route.ts (from B11)
[F081] src/hooks/useAIKeys.ts (from B11)
[F074] src/lib/cv/cv-extractor.ts (from B12)
[F107] src/lib/cv/cv-extraction-prompt.ts (from B12)
[F108] src/lib/cv/cv-validator.ts (from B12)
[F109] src/lib/cv/index.ts (from B12)
[F110] src/app/api/cv/extract/route.ts (from B12)
[F024] src/app/api/prompts/route.ts (from B17)
[F118] src/app/api/prompts/[id]/route.ts (from B17)
[F119] src/lib/prompts/prompt-service.ts (from B17)
[F120] src/lib/prompts/index.ts (from B17)
[F121] src/lib/prompts/default-prompts.ts (from B17)
[F083] src/hooks/usePrompts.ts (from B17)
[F045] src/components/prompts/PromptList.tsx (from B17)
[F046] src/components/prompts/PromptEditor.tsx (from B17)
[F047] src/components/prompts/PromptSelector.tsx (from B17)
[F048] src/components/prompts/PromptCategoryFilter.tsx (from B17)
[F122] src/components/prompts/PromptCard.tsx (from B17)
[F123] src/components/prompts/PromptPreview.tsx (from B17)
[F015] src/app/[locale]/prompts/page.tsx (from B17)
[F124] src/app/[locale]/prompts/loading.tsx (from B17)
[F075] src/lib/generators/docx-generator.ts (from B19)
[F076] src/lib/generators/markdown-generator.ts (from B19)
[F142] src/lib/generators/document-formatter.ts (from B19)
[F143] src/lib/generators/index.ts (from B19)
[F025] src/app/api/export/docx/route.ts (from B19)
[F026] src/app/api/export/markdown/route.ts (from B19)
[F144] src/app/api/export/all/route.ts (from B19)

## FILES YOU MUST NOT TOUCH
Everything not listed above.

## INSTRUCTIONS
1. Create template-service.ts:
   ```typescript
   // ============================================
   // [F145] src/lib/templates/template-service.ts
   // ============================================
   
   import { SupabaseClient } from '@supabase/supabase-js';
   import { Template, TemplateType, FileFormat } from '@/lib/types';
   
   export class TemplateService {
     constructor(private supabase: SupabaseClient) {}
     
     async getTemplates(userId: string): Promise<Template[]> {
       const { data, error } = await this.supabase
         .from('templates')
         .select('*')
         .eq('user_id', userId)
         .order('created_at', { ascending: false });
       
       if (error) throw error;
       return data || [];
     }
     
     async getTemplatesByType(userId: string, type: TemplateType): Promise<Template[]> {
       const { data, error } = await this.supabase
         .from('templates')
         .select('*')
         .eq('user_id', userId)
         .eq('template_type', type)
         .order('created_at', { ascending: false });
       
       if (error) throw error;
       return data || [];
     }
     
     async getTemplate(id: string, userId: string): Promise<Template | null> {
       const { data, error } = await this.supabase
         .from('templates')
         .select('*')
         .eq('id', id)
         .eq('user_id', userId)
         .single();
       
       if (error) {
         if (error.code === 'PGRST116') return null;
         throw error;
       }
       
       return data;
     }
     
     async createTemplate(
       userId: string,
       template: {
         template_name: string;
         template_type: TemplateType;
         file_format: FileFormat;
         file_content: string;
       }
     ): Promise<Template> {
       const { data, error } = await this.supabase
         .from('templates')
         .insert({
           user_id: userId,
           ...template
         })
         .select()
         .single();
       
       if (error) throw error;
       return data;
     }
     
     async updateTemplate(
       id: string,
       userId: string,
       updates: Partial<Template>
     ): Promise<Template> {
       const { id: _, user_id, created_at, ...validUpdates } = updates as any;
       
       const { data, error } = await this.supabase
         .from('templates')
         .update(validUpdates)
         .eq('id', id)
         .eq('user_id', userId)
         .select()
         .single();
       
       if (error) throw error;
       return data;
     }
     
     async deleteTemplate(id: string, userId: string): Promise<void> {
       const { error } = await this.supabase
         .from('templates')
         .delete()
         .eq('id', id)
         .eq('user_id', userId);
       
       if (error) throw error;
     }
   }
   
   export function createTemplateService(supabase: SupabaseClient): TemplateService {
     return new TemplateService(supabase);
   }
   ```

2. Create template-parser.ts:
   ```typescript
   // ============================================
   // [F146] src/lib/templates/template-parser.ts
   // ============================================
   
   export interface TemplatePlaceholders {
     // Personal Info
     '{{NAME}}': string;
     '{{EMAIL}}': string;
     '{{PHONE}}': string;
     '{{LOCATION}}': string;
     '{{LINKEDIN}}': string;
     '{{WEBSITE}}': string;
     
     // Content
     '{{CONTENT}}': string;
     '{{CV_CONTENT}}': string;
     '{{COVER_LETTER_CONTENT}}': string;
     '{{EMAIL_CONTENT}}': string;
     
     // Job Info
     '{{JOB_TITLE}}': string;
     '{{COMPANY}}': string;
     
     // Date
     '{{DATE}}': string;
     '{{YEAR}}': string;
     
     [key: string]: string;
   }
   
   export function applyTemplate(
     templateContent: string,
     placeholders: Partial<TemplatePlaceholders>
   ): string {
     let result = templateContent;
     
     for (const [placeholder, value] of Object.entries(placeholders)) {
       if (value) {
         const regex = new RegExp(escapeRegex(placeholder), 'g');
         result = result.replace(regex, value);
       }
     }
     
     // Remove any remaining placeholders
     result = result.replace(/\{\{[A-Z_]+\}\}/g, '');
     
     return result;
   }
   
   function escapeRegex(string: string): string {
     return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
   }
   
   export function extractPlaceholders(templateContent: string): string[] {
     const matches = templateContent.match(/\{\{[A-Z_]+\}\}/g);
     return matches ? [...new Set(matches)] : [];
   }
   
   export function validateTemplate(templateContent: string): {
     isValid: boolean;
     errors: string[];
     placeholders: string[];
   } {
     const errors: string[] = [];
     const placeholders = extractPlaceholders(templateContent);
     
     // Check for required placeholders
     if (!placeholders.includes('{{CONTENT}}') && 
         !placeholders.includes('{{CV_CONTENT}}') &&
         !placeholders.includes('{{COVER_LETTER_CONTENT}}') &&
         !placeholders.includes('{{EMAIL_CONTENT}}')) {
       errors.push('Template must include at least one content placeholder ({{CONTENT}}, {{CV_CONTENT}}, etc.)');
     }
     
     // Check for unclosed placeholders
     const unclosed = templateContent.match(/\{\{[^}]*$/gm);
     if (unclosed) {
       errors.push('Template has unclosed placeholders');
     }
     
     return {
       isValid: errors.length === 0,
       errors,
       placeholders
     };
   }
   
   export const DEFAULT_CV_TEMPLATE = `# {{NAME}}

   {{EMAIL}} | {{PHONE}} | {{LOCATION}}
   {{LINKEDIN}} | {{WEBSITE}}

   ---

   {{CV_CONTENT}}
   `;
   
   export const DEFAULT_COVER_LETTER_TEMPLATE = `{{DATE}}

   Dear Hiring Manager,

   {{COVER_LETTER_CONTENT}}

   Sincerely,
   {{NAME}}
   {{EMAIL}}
   {{PHONE}}
   `;
   
   export const DEFAULT_EMAIL_TEMPLATE = `Subject: Application for {{JOB_TITLE}} Position

   {{EMAIL_CONTENT}}

   Best regards,
   {{NAME}}
   `;
   ```

3. Create index.ts:
   ```typescript
   // ============================================
   // [F147] src/lib/templates/index.ts
   // ============================================
   
   export * from './template-service';
   export * from './template-parser';
   ```

4. Create API routes:
   ```typescript
   // ============================================
   // [F148] src/app/api/templates/route.ts
   // ============================================
   
   import { NextRequest, NextResponse } from 'next/server';
   import { createServerSupabaseClient } from '@/lib/supabase/server';
   import { createTemplateService } from '@/lib/templates';
   
   export async function GET(request: NextRequest) {
     try {
       const userId = request.headers.get('x-user-id');
       if (!userId) {
         return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
       }
       
       const { searchParams } = new URL(request.url);
       const type = searchParams.get('type');
       
       const supabase = createServerSupabaseClient();
       const service = createTemplateService(supabase);
       
       const templates = type
         ? await service.getTemplatesByType(userId, type as any)
         : await service.getTemplates(userId);
       
       return NextResponse.json({ templates });
       
     } catch (error: any) {
       return NextResponse.json({ error: error.message }, { status: 500 });
     }
   }
   
   export async function POST(request: NextRequest) {
     try {
       const userId = request.headers.get('x-user-id');
       if (!userId) {
         return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
       }
       
       const body = await request.json();
       const { template_name, template_type, file_format, file_content } = body;
       
       if (!template_name || !template_type || !file_format || !file_content) {
         return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
       }
       
       const supabase = createServerSupabaseClient();
       const service = createTemplateService(supabase);
       
       const template = await service.createTemplate(userId, {
         template_name,
         template_type,
         file_format,
         file_content
       });
       
       return NextResponse.json({ template, success: true });
       
     } catch (error: any) {
       return NextResponse.json({ error: error.message }, { status: 500 });
     }
   }
   ```

   ```typescript
   // ============================================
   // [F149] src/app/api/templates/[id]/route.ts
   // ============================================
   
   import { NextRequest, NextResponse } from 'next/server';
   import { createServerSupabaseClient } from '@/lib/supabase/server';
   import { createTemplateService } from '@/lib/templates';
   
   interface RouteParams {
     params: { id: string };
   }
   
   export async function GET(request: NextRequest, { params }: RouteParams) {
     try {
       const userId = request.headers.get('x-user-id');
       if (!userId) {
         return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
       }
       
       const supabase = createServerSupabaseClient();
       const service = createTemplateService(supabase);
       
       const template = await service.getTemplate(params.id, userId);
       
       if (!template) {
         return NextResponse.json({ error: 'Not found' }, { status: 404 });
       }
       
       return NextResponse.json({ template });
       
     } catch (error: any) {
       return NextResponse.json({ error: error.message }, { status: 500 });
     }
   }
   
   export async function PUT(request: NextRequest, { params }: RouteParams) {
     try {
       const userId = request.headers.get('x-user-id');
       if (!userId) {
         return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
       }
       
       const body = await request.json();
       
       const supabase = createServerSupabaseClient();
       const service = createTemplateService(supabase);
       
       const template = await service.updateTemplate(params.id, userId, body);
       
       return NextResponse.json({ template, success: true });
       
     } catch (error: any) {
       return NextResponse.json({ error: error.message }, { status: 500 });
     }
   }
   
   export async function DELETE(request: NextRequest, { params }: RouteParams) {
     try {
       const userId = request.headers.get('x-user-id');
       if (!userId) {
         return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
       }
       
       const supabase = createServerSupabaseClient();
       const service = createTemplateService(supabase);
       
       await service.deleteTemplate(params.id, userId);
       
       return NextResponse.json({ success: true });
       
     } catch (error: any) {
       return NextResponse.json({ error: error.message }, { status: 500 });
     }
   }
   ```

5. Create useTemplates hook:
   ```typescript
   // ============================================
   // [F150] src/hooks/useTemplates.ts
   // ============================================
   
   'use client';
   
   import { useState, useEffect, useCallback } from 'react';
   import { useAuth } from '@/context/AuthContext';
   import { Template, TemplateType, FileFormat } from '@/lib/types';
   
   export function useTemplates(type?: TemplateType) {
     const { user } = useAuth();
     const [templates, setTemplates] = useState<Template[]>([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState<string | null>(null);
     
     const fetchTemplates = useCallback(async () => {
       if (!user) return;
       
       setLoading(true);
       setError(null);
       
       try {
         const params = type ? `?type=${type}` : '';
         const res = await fetch(`/api/templates${params}`, {
           headers: { 'x-user-id': user.id }
         });
         
         const data = await res.json();
         if (data.error) throw new Error(data.error);
         
         setTemplates(data.templates || []);
         
       } catch (err: any) {
         setError(err.message);
       } finally {
         setLoading(false);
       }
     }, [user, type]);
     
     useEffect(() => {
       fetchTemplates();
     }, [fetchTemplates]);
     
     const createTemplate = useCallback(async (
       template: {
         template_name: string;
         template_type: TemplateType;
         file_format: FileFormat;
         file_content: string;
       }
     ): Promise<Template> => {
       if (!user) throw new Error('Not authenticated');
       
       const res = await fetch('/api/templates', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'x-user-id': user.id
         },
         body: JSON.stringify(template)
       });
       
       const data = await res.json();
       if (data.error) throw new Error(data.error);
       
       setTemplates(prev => [data.template, ...prev]);
       return data.template;
     }, [user]);
     
     const deleteTemplate = useCallback(async (id: string) => {
       if (!user) throw new Error('Not authenticated');
       
       const res = await fetch(`/api/templates/${id}`, {
         method: 'DELETE',
         headers: { 'x-user-id': user.id }
       });
       
       const data = await res.json();
       if (data.error) throw new Error(data.error);
       
       setTemplates(prev => prev.filter(t => t.id !== id));
     }, [user]);
     
     return {
       templates,
       loading,
       error,
       fetchTemplates,
       createTemplate,
       deleteTemplate
     };
   }
   ```

6. Create TemplateCard.tsx:
   ```typescript
   // ============================================
   // [F152] src/components/templates/TemplateCard.tsx
   // ============================================
   
   'use client';
   
   import { useTranslations } from 'next-intl';
   import { Template } from '@/lib/types';
   import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
   import { Badge } from '@/components/ui/badge';
   import { Button } from '@/components/ui/button';
   import { FileText, File, Trash2, Eye } from 'lucide-react';
   import { cn } from '@/lib/utils';
   
   interface TemplateCardProps {
     template: Template;
     onPreview?: () => void;
     onDelete?: () => void;
     onSelect?: () => void;
     selected?: boolean;
     selectable?: boolean;
     className?: string;
   }
   
   export function TemplateCard({
     template,
     onPreview,
     onDelete,
     onSelect,
     selected = false,
     selectable = false,
     className
   }: TemplateCardProps) {
     const t = useTranslations('templates');
     
     const typeLabels: Record<string, string> = {
       cv: t('type_cv'),
       cover_letter: t('type_cover_letter'),
       email: t('type_email')
     };
     
     const formatIcon = template.file_format === 'docx' ? File : FileText;
     const FormatIcon = formatIcon;
     
     return (
       <Card 
         className={cn(
           'cursor-pointer transition-all hover:border-primary',
           selected && 'border-primary ring-2 ring-primary/20',
           className
         )}
         onClick={() => selectable && onSelect?.()}
       >
         <CardHeader className="pb-2">
           <div className="flex items-center justify-between">
             <CardTitle className="text-base flex items-center gap-2">
               <FormatIcon className="h-4 w-4" />
               {template.template_name}
             </CardTitle>
             <Badge variant="outline" className="text-xs">
               {typeLabels[template.template_type]}
             </Badge>
           </div>
         </CardHeader>
         <CardContent>
           <div className="flex items-center justify-between">
             <Badge variant="secondary" className="text-xs">
               .{template.file_format}
             </Badge>
             <div className="flex gap-1">
               {onPreview && (
                 <Button 
                   variant="ghost" 
                   size="sm"
                   onClick={(e) => { e.stopPropagation(); onPreview(); }}
                 >
                   <Eye className="h-4 w-4" />
                 </Button>
               )}
               {onDelete && (
                 <Button 
                   variant="ghost" 
                   size="sm"
                   onClick={(e) => { e.stopPropagation(); onDelete(); }}
                 >
                   <Trash2 className="h-4 w-4 text-destructive" />
                 </Button>
               )}
             </div>
           </div>
         </CardContent>
       </Card>
     );
   }
   ```

7. Create TemplateUploader.tsx:
   ```typescript
   // ============================================
   // [F060] src/components/templates/TemplateUploader.tsx
   // ============================================
   
   'use client';
   
   import { useState, useCallback } from 'react';
   import { useTranslations } from 'next-intl';
   import { useTemplates } from '@/hooks/useTemplates';
   import { TemplateType, FileFormat } from '@/lib/types';
   import { parseFile } from '@/lib/parsers';
   import { validateTemplate } from '@/lib/templates';
   import {
     Dialog,
     DialogContent,
     DialogHeader,
     DialogTitle,
     DialogFooter,
   } from '@/components/ui/dialog';
   import { Button } from '@/components/ui/button';
   import { Input } from '@/components/ui/input';
   import { Label } from '@/components/ui/label';
   import {
     Select,
     SelectContent,
     SelectItem,
     SelectTrigger,
     SelectValue,
   } from '@/components/ui/select';
   import { FileDropZone } from '@/components/cv/FileDropZone';
   import { Alert, AlertDescription } from '@/components/ui/alert';
   import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';
   
   interface TemplateUploaderProps {
     open: boolean;
     onClose: () => void;
     onSuccess?: () => void;
   }
   
   export function TemplateUploader({ open, onClose, onSuccess }: TemplateUploaderProps) {
     const t = useTranslations('templates');
     const { createTemplate } = useTemplates();
     
     const [name, setName] = useState('');
     const [type, setType] = useState<TemplateType>('cv');
     const [content, setContent] = useState('');
     const [format, setFormat] = useState<FileFormat>('md');
     const [errors, setErrors] = useState<string[]>([]);
     const [saving, setSaving] = useState(false);
     
     const handleFileSelect = useCallback(async (file: File) => {
       try {
         const parsed = await parseFile(file);
         setContent(parsed.text);
         
         // Detect format
         const ext = file.name.split('.').pop()?.toLowerCase();
         setFormat(ext === 'docx' ? 'docx' : 'md');
         
         // Use filename as template name if not set
         if (!name) {
           setName(file.name.replace(/\.[^/.]+$/, ''));
         }
         
         // Validate
         const validation = validateTemplate(parsed.text);
         setErrors(validation.errors);
         
       } catch (err: any) {
         setErrors([err.message]);
       }
     }, [name]);
     
     const handleSave = async () => {
       if (!name || !content) return;
       
       setSaving(true);
       try {
         await createTemplate({
           template_name: name,
           template_type: type,
           file_format: format,
           file_content: content
         });
         
         onSuccess?.();
         onClose();
         
         // Reset form
         setName('');
         setContent('');
         setErrors([]);
         
       } catch (err: any) {
         setErrors([err.message]);
       } finally {
         setSaving(false);
       }
     };
     
     return (
       <Dialog open={open} onOpenChange={onClose}>
         <DialogContent className="max-w-lg">
           <DialogHeader>
             <DialogTitle>{t('upload_template')}</DialogTitle>
           </DialogHeader>
           
           <div className="space-y-4 py-4">
             <div className="grid gap-2">
               <Label>{t('template_name')}</Label>
               <Input
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 placeholder={t('template_name_placeholder')}
               />
             </div>
             
             <div className="grid gap-2">
               <Label>{t('template_type')}</Label>
               <Select value={type} onValueChange={(v) => setType(v as TemplateType)}>
                 <SelectTrigger>
                   <SelectValue />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="cv">{t('type_cv')}</SelectItem>
                   <SelectItem value="cover_letter">{t('type_cover_letter')}</SelectItem>
                   <SelectItem value="email">{t('type_email')}</SelectItem>
                 </SelectContent>
               </Select>
             </div>
             
             <div className="grid gap-2">
               <Label>{t('upload_file')}</Label>
               <FileDropZone
                 onFileSelect={handleFileSelect}
                 acceptedTypes={['.docx', '.md', '.txt']}
               />
             </div>
             
             {content && errors.length === 0 && (
               <Alert className="bg-green-50 border-green-200">
                 <CheckCircle className="h-4 w-4 text-green-600" />
                 <AlertDescription className="text-green-700">
                   {t('template_valid')}
                 </AlertDescription>
               </Alert>
             )}
             
             {errors.length > 0 && (
               <Alert variant="destructive">
                 <AlertCircle className="h-4 w-4" />
                 <AlertDescription>
                   {errors.map((e, i) => <div key={i}>{e}</div>)}
                 </AlertDescription>
               </Alert>
             )}
           </div>
           
           <DialogFooter>
             <Button variant="outline" onClick={onClose} disabled={saving}>
               {t('cancel')}
             </Button>
             <Button 
               onClick={handleSave} 
               disabled={!name || !content || errors.length > 0 || saving}
             >
               {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
               {t('save')}
             </Button>
           </DialogFooter>
         </DialogContent>
       </Dialog>
     );
   }
   ```

8. Create TemplateList.tsx:
   ```typescript
   // ============================================
   // [F151] src/components/templates/TemplateList.tsx
   // ============================================
   
   'use client';
   
   import { useState } from 'react';
   import { useTranslations } from 'next-intl';
   import { Template } from '@/lib/types';
   import { TemplateCard } from './TemplateCard';
   import { TemplatePreview } from './TemplatePreview';
   import { Loader2 } from 'lucide-react';
   
   interface TemplateListProps {
     templates: Template[];
     loading?: boolean;
     onDelete?: (template: Template) => void;
     className?: string;
   }
   
   export function TemplateList({
     templates,
     loading = false,
     onDelete,
     className
   }: TemplateListProps) {
     const t = useTranslations('templates');
     const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
     
     if (loading) {
       return (
         <div className="flex items-center justify-center py-12">
           <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
         </div>
       );
     }
     
     if (templates.length === 0) {
       return (
         <div className="text-center py-12 text-muted-foreground">
           {t('no_templates')}
         </div>
       );
     }
     
     return (
       <>
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
           {templates.map((template) => (
             <TemplateCard
               key={template.id}
               template={template}
               onPreview={() => setPreviewTemplate(template)}
               onDelete={() => onDelete?.(template)}
             />
           ))}
         </div>
         
         <TemplatePreview
           template={previewTemplate}
           open={previewTemplate !== null}
           onClose={() => setPreviewTemplate(null)}
         />
       </>
     );
   }
   ```

9. Create TemplatePreview.tsx:
   ```typescript
   // ============================================
   // [F062] src/components/templates/TemplatePreview.tsx
   // ============================================
   
   'use client';
   
   import { useTranslations } from 'next-intl';
   import { Template } from '@/lib/types';
   import { extractPlaceholders } from '@/lib/templates';
   import {
     Dialog,
     DialogContent,
     DialogHeader,
     DialogTitle,
   } from '@/components/ui/dialog';
   import { Badge } from '@/components/ui/badge';
   import { ScrollArea } from '@/components/ui/scroll-area';
   
   interface TemplatePreviewProps {
     template: Template | null;
     open: boolean;
     onClose: () => void;
   }
   
   export function TemplatePreview({ template, open, onClose }: TemplatePreviewProps) {
     const t = useTranslations('templates');
     
     if (!template) return null;
     
     const placeholders = extractPlaceholders(template.file_content);
     
     return (
       <Dialog open={open} onOpenChange={onClose}>
         <DialogContent className="max-w-2xl max-h-[80vh]">
           <DialogHeader>
             <DialogTitle>{template.template_name}</DialogTitle>
           </DialogHeader>
           
           <div className="space-y-4">
             <div className="flex flex-wrap gap-2">
               <Badge>{template.template_type}</Badge>
               <Badge variant="outline">.{template.file_format}</Badge>
             </div>
             
             {placeholders.length > 0 && (
               <div>
                 <p className="text-sm font-medium mb-2">{t('placeholders')}:</p>
                 <div className="flex flex-wrap gap-1">
                   {placeholders.map((p) => (
                     <Badge key={p} variant="secondary" className="text-xs">
                       {p}
                     </Badge>
                   ))}
                 </div>
               </div>
             )}
             
             <ScrollArea className="h-[400px] border rounded-md p-4 bg-muted/30">
               <pre className="text-sm whitespace-pre-wrap font-mono">
                 {template.file_content}
               </pre>
             </ScrollArea>
           </div>
         </DialogContent>
       </Dialog>
     );
   }
   ```

10. Create TemplateSelector.tsx:
    ```typescript
    // ============================================
    // [F061] src/components/templates/TemplateSelector.tsx
    // ============================================
    
    'use client';
    
    import { useTranslations } from 'next-intl';
    import { useTemplates } from '@/hooks/useTemplates';
    import { Template, TemplateType } from '@/lib/types';
    import { TemplateCard } from './TemplateCard';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { Loader2, FileText } from 'lucide-react';
    
    interface TemplateSelectorProps {
      type: TemplateType;
      selectedId: string | null;
      onSelect: (template: Template | null) => void;
      className?: string;
    }
    
    export function TemplateSelector({
      type,
      selectedId,
      onSelect,
      className
    }: TemplateSelectorProps) {
      const t = useTranslations('templates');
      const { templates, loading } = useTemplates(type);
      
      return (
        <Card className={className}>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {t('select_template')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : templates.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                {t('no_templates_for_type')}
              </p>
            ) : (
              <div className="grid gap-3">
                {/* Default option */}
                <div 
                  className={`p-3 border rounded-lg cursor-pointer transition-all hover:border-primary ${!selectedId ? 'border-primary bg-primary/5' : ''}`}
                  onClick={() => onSelect(null)}
                >
                  <p className="font-medium">{t('use_default')}</p>
                  <p className="text-sm text-muted-foreground">{t('use_default_hint')}</p>
                </div>
                
                {templates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    selected={selectedId === template.id}
                    selectable
                    onSelect={() => onSelect(template)}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      );
    }
    ```

11. Add translations to en.json under "templates":
    ```json
    {
      "templates": {
        "title": "Template Management",
        "upload_template": "Upload Template",
        "template_name": "Template Name",
        "template_name_placeholder": "My CV Template",
        "template_type": "Template Type",
        "type_cv": "CV",
        "type_cover_letter": "Cover Letter",
        "type_email": "Application Email",
        "upload_file": "Upload File",
        "template_valid": "Template is valid and ready to use",
        "save": "Save Template",
        "cancel": "Cancel",
        "no_templates": "No templates yet. Upload your first template!",
        "no_templates_for_type": "No templates available for this type",
        "placeholders": "Placeholders",
        "select_template": "Select Template (Optional)",
        "use_default": "Use Default Template",
        "use_default_hint": "No custom formatting, just the content"
      }
    }
    ```

12. Add same translations to fa.json


## CHECKPOINT TESTS (verify ALL after completion)
□ [T01] All template files exist
□ [T02] All template components exist
□ [T03] TypeScript compiles without errors
□ [T04] Template parser has placeholder functions

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
