// ============================================
// [F074] src/lib/cv/cv-extractor.ts
// AI-Powered CV Field Extraction
// ============================================

import { getAIProvider } from '@/lib/ai';
import { AIProviderConfig, AICompletionOptions } from '@/lib/ai/ai-provider';
import {
    CVExtractionResult,
    CVExtractionRequest,
    ComprehensiveCV,
} from '@/lib/types';
import {
    CV_EXTRACTION_SYSTEM_PROMPT,
    CV_EXTRACTION_USER_PROMPT,
    CV_REFINE_SYSTEM_PROMPT,
    CV_REFINE_USER_PROMPT,
} from './cv-extraction-prompt';
import { validateExtractedCV, getCompletionPercentage } from './cv-validator';
import { generateId } from '@/lib/helpers';

/**
 * Transforms raw AI output into a standardized ComprehensiveCV structure
 */
function transformAICVData(parsed: any, rawText?: string): Partial<ComprehensiveCV> {
    const addIds = (arr: any[]) =>
        (arr || []).map(item => ({
            ...item,
            id: item.id || generateId()
        }));

    return {
        personal_info: parsed.personal_info || {},
        work_experience: addIds(parsed.work_experience),
        education: addIds(parsed.education),
        skills: parsed.skills || [],
        certifications: addIds(parsed.certifications),
        languages: (parsed.languages || []).map((l: any) => ({
            language: l.language || '',
            proficiency: (l.proficiency?.toLowerCase() || 'intermediate') as any,
        })),
        projects: addIds(parsed.projects),
        additional_sections: addIds(parsed.additional_sections),
        raw_text: rawText || parsed.raw_text,
    };
}

export async function extractCVWithAI(
    request: CVExtractionRequest,
    apiKey: string
): Promise<CVExtractionResult> {
    const { rawText, aiProvider, aiModel } = request;

    try {
        const provider = getAIProvider(aiProvider);

        console.log(`[CV Extractor] Starting extraction with ${aiProvider}: ${aiModel}`, {
            textLength: rawText?.length || 0
        });

        const config: AIProviderConfig = {
            apiKey,
            temperature: 0.1,
            maxTokens: 4096,
        };

        const options: AICompletionOptions = {
            model: aiModel,
            messages: [
                { id: 'sys-1', role: 'system', content: CV_EXTRACTION_SYSTEM_PROMPT, timestamp: new Date().toISOString() },
                { id: 'usr-1', role: 'user', content: CV_EXTRACTION_USER_PROMPT(rawText), timestamp: new Date().toISOString() },
            ],
            jsonMode: aiProvider !== 'google',
        };

        const response = await provider.complete(config, options);
        console.log(`[CV Extractor] Raw response received. Length: ${response?.length || 0}`);

        if (!response) {
            throw new Error('AI provider returned an empty response');
        }

        const parsed = provider.parseJsonResponse<any>(response);

        if (!parsed) {
            console.error(`[CV Extractor] Failed to parse JSON. Raw response head: ${response.substring(0, 500)}...`);
            return {
                success: false,
                cv: {},
                fieldStatuses: [],
                confidence: 0,
                rawText,
                aiProvider,
                aiModel,
                extractionNotes: 'AI failed to return a valid JSON structure. Please try again or use a different model.',
            };
        }

        // Transform parsed data to our CV structure
        const cv = transformAICVData(parsed, rawText);

        console.log(`[CV Extractor] Transformation complete. Sections found:`, {
            exps: cv.work_experience?.length,
            edu: cv.education?.length,
            skills: cv.skills?.length,
            langs: cv.languages?.length,
            certs: cv.certifications?.length
        });

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
            extractionNotes: parsed.notes,
        };
    } catch (error: any) {
        console.error(`[CV Extractor] Critical error encountered:`, error);
        return {
            success: false,
            cv: {},
            fieldStatuses: [],
            confidence: 0,
            rawText,
            aiProvider,
            aiModel,
            extractionNotes: `Extraction failed: ${error.message || 'Unknown AI error'}`,
        };
    }
}

/**
 * Refines an existing CV based on user edits or instructions
 */
export async function refineCVWithAI(
    currentCV: Partial<ComprehensiveCV>,
    apiKey: string,
    aiProvider: string,
    aiModel: string,
    instructions?: string,
    additionalText?: string
): Promise<CVExtractionResult> {
    const provider = getAIProvider(aiProvider as any);

    const config: AIProviderConfig = {
        apiKey,
        temperature: 0.2, // Slightly higher for refinement creativity
        maxTokens: 4096,
    };

    const options: AICompletionOptions = {
        model: aiModel,
        messages: [
            { id: 'sys-refine', role: 'system', content: CV_REFINE_SYSTEM_PROMPT, timestamp: new Date().toISOString() },
            { id: 'usr-refine', role: 'user', content: CV_REFINE_USER_PROMPT(currentCV, additionalText, instructions), timestamp: new Date().toISOString() },
        ],
        jsonMode: aiProvider !== 'google',
    };

    try {
        console.log(`[CV Refiner] Starting refinement with ${aiProvider}: ${aiModel}`);
        const response = await provider.complete(config, options);
        const parsed = provider.parseJsonResponse<any>(response);

        if (!parsed) {
            throw new Error('Failed to parse AI response as JSON');
        }

        const cv = transformAICVData(parsed, additionalText || currentCV.raw_text);
        const fieldStatuses = validateExtractedCV(cv);
        const completionPercentage = getCompletionPercentage(fieldStatuses);

        return {
            success: true,
            cv,
            fieldStatuses,
            confidence: parsed.confidence || completionPercentage,
            rawText: additionalText || currentCV.raw_text || '',
            aiProvider: aiProvider as any,
            aiModel,
            extractionNotes: parsed.notes,
        };
    } catch (error: any) {
        console.error(`[CV Refiner] Error:`, error);
        return {
            success: false,
            cv: currentCV,
            fieldStatuses: validateExtractedCV(currentCV),
            confidence: 0,
            rawText: additionalText || currentCV.raw_text || '',
            aiProvider: aiProvider as any,
            aiModel,
            extractionNotes: `Refinement failed: ${error.message}`,
        };
    }
}

