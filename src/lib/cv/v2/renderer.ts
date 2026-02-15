import { getAIProvider } from '@/lib/ai';
import { AIProviderConfig, AICompletionOptions } from '@/lib/ai/ai-provider';
import { AIProviderName } from '@/lib/types';
import { CanonicalCV } from './types';
import {
    buildRenderingSystemPrompt,
    buildRenderingUserPrompt
} from './prompts';

export interface RenderingResult {
    success: boolean;
    text: string | null;
    error?: string;
}

export class Renderer {
    constructor(
        private providerName: AIProviderName,
        private model: string,
        private apiKey: string
    ) { }

    async render(cv: CanonicalCV, domains: string[] = ['general']): Promise<RenderingResult> {
        console.log(`[Renderer] Starting rendering for CV ${cv.id} for domains: ${domains.join(', ')}`);

        try {
            const provider = getAIProvider(this.providerName);

            const config: AIProviderConfig = {
                apiKey: this.apiKey,
                temperature: 0, // Keep deterministic
                maxTokens: 32768, // Allow for long CVs
            };

            const options: AICompletionOptions = {
                model: this.model,
                messages: [
                    {
                        id: 'sys-render',
                        role: 'system',
                        content: buildRenderingSystemPrompt(),
                        timestamp: new Date().toISOString(),
                    },
                    {
                        id: 'usr-render',
                        role: 'user',
                        content: buildRenderingUserPrompt(JSON.stringify(cv, null, 2), domains),
                        timestamp: new Date().toISOString(),
                    },
                ],
                jsonMode: false, // Output is text
            };

            const response = await provider.complete(config, options);
            if (!response) {
                throw new Error('AI provider returned empty response');
            }

            return {
                success: true,
                text: response.trim(),
            };

        } catch (error: any) {
            console.error('[Renderer] Rendering error:', error);
            return {
                success: true, // We might fallback to basic rendering if AI fails
                text: null,
                error: error.message,
            };
        }
    }

    /**
     * Deterministic fallback rendering if AI fails.
     */
    renderTextFallback(cv: CanonicalCV): string {
        let text = `${cv.identity.full_name}\n`;
        text += `${cv.identity.email} | ${cv.identity.phone} | ${cv.identity.location}\n`;
        if (cv.identity.linkedin_url) text += `LinkedIn: ${cv.identity.linkedin_url}\n`;
        if (cv.identity.summary) text += `\nSUMMARY\n${cv.identity.summary}\n`;

        if (cv.experience.length > 0) {
            text += `\nEXPERIENCE\n`;
            for (const w of cv.experience) {
                text += `${w.job_title} at ${w.company} (${w.start_date} - ${w.end_date || 'Present'})\n`;
                text += `${w.description}\n`;
                if (w.achievements.length > 0) {
                    text += `Achievements:\n - ${w.achievements.join('\n - ')}\n`;
                }
                text += `\n`;
            }
        }

        if (cv.education.length > 0) {
            text += `\nEDUCATION\n`;
            for (const e of cv.education) {
                text += `${e.degree} in ${e.field_of_study}, ${e.institution} (${e.start_date} - ${e.end_date})\n\n`;
            }
        }

        if (cv.skills.length > 0) {
            text += `\nSKILLS\n${cv.skills.join(', ')}\n`;
        }

        return text;
    }
}
