export * from './types';
export * from './prompts';
export * from './blind-extractor';
export * from './auditor';
export * from './gap-generator';
export * from './merger';
export * from './renderer';

import { AIProviderName } from '@/lib/types';
import { BlindExtractor } from './blind-extractor';
import { Auditor } from './auditor';
import { GapGenerator } from './gap-generator';
import { Merger } from './merger';
import { Renderer } from './renderer';
import { CanonicalCV } from './types';

export class CVProcessorV2 {
    public extractor: BlindExtractor;
    public auditor: Auditor;
    public gapGenerator: GapGenerator;
    public merger: Merger;
    public renderer: Renderer;

    constructor(
        providerName: AIProviderName,
        model: string,
        apiKey: string
    ) {
        this.extractor = new BlindExtractor(providerName, model, apiKey);
        this.auditor = new Auditor(providerName, model, apiKey);
        this.gapGenerator = new GapGenerator(providerName, model, apiKey);
        this.merger = new Merger();
        this.renderer = new Renderer(providerName, model, apiKey);
    }

    /**
     * Complete pipeline from raw text to canonical CV with assessment.
     */
    async fullProcess(rawText: string, domainRules: string = '') {
        // 1. Extract
        const extraction = await this.extractor.extract(rawText);
        if (!extraction.success || !extraction.cv) {
            return { success: false, step: 'extraction', error: extraction.error };
        }

        // 2. Audit
        const audit = await this.auditor.audit(extraction.cv);
        if (!audit.success || !audit.audit) {
            return { success: true, cv: extraction.cv, auditError: audit.error };
        }

        // 3. Gaps
        const gaps = await this.gapGenerator.generate(audit.audit, domainRules);

        return {
            success: true,
            cv: extraction.cv,
            audit: audit.audit,
            gaps: gaps.success ? gaps.guidance : null,
        };
    }

    /**
     * Refines the CV by merging a patch.
     */
    async refine(currentCV: CanonicalCV, patch: Partial<CanonicalCV>) {
        const merged = this.merger.merge(currentCV, patch);

        // Re-audit after merge
        const audit = await this.auditor.audit(merged);
        const gaps = await this.gapGenerator.generate(audit.audit || {} as any, '');

        return {
            success: true,
            cv: merged,
            audit: audit.audit,
            gaps: gaps.success ? gaps.guidance : null,
        };
    }

    /**
     * Maps CanonicalCV (V2) to ComprehensiveCV (V1) for UI compatibility.
     */
    toComprehensiveCV(cv: CanonicalCV): any {
        return {
            ...cv,
            personal_info: {
                full_name: cv.identity.full_name,
                email: cv.identity.email,
                phone: cv.identity.phone,
                location: cv.identity.location,
                linkedin_url: cv.identity.linkedin_url,
                summary: cv.identity.summary,
            },
            work_experience: cv.experience,
            // education, skills, projects, certifications are the same
        };
    }

    /**
     * Maps V2 Audit and Gaps to V1 CVGapAnalysis for UI compatibility.
     */
    toV1GapAnalysis(audit: any, gaps: any, selectedDomains: string[] = ['general']): any {
        if (!audit) return null;

        const gapItems = (gaps?.items || []).map((item: any, idx: number) => ({
            id: `gap-v2-${idx}`,
            field_path: item.field,
            title_en: item.field.replace(/_/g, ' ').toUpperCase(),
            title_fa: item.field,
            description_en: item.guidance_text,
            description_fa: item.guidance_text,
            severity: 'important' as const,
            category: 'incomplete_content' as const,
            relevant_domains: selectedDomains,
            fix_guidance_en: item.guidance_text,
            fix_guidance_fa: item.guidance_text,
            fix_example_en: item.example,
            fix_example_fa: item.example,
            input_type: 'textarea' as const,
            is_skipped: false,
            is_resolved: false,
            can_skip: item.skip_allowed,
        }));

        const strengths = (audit.items || [])
            .filter((item: any) => item.quality_score >= 80)
            .map((item: any) => ({
                title_en: `${item.field_path.replace(/_/g, ' ')} Quality`,
                title_fa: item.field_path,
                description_en: `High quality content found in ${item.field_path}.`,
                description_fa: `محتوای با کیفیت در بخش ${item.field_path} شناسایی شد.`,
                relevant_domains: selectedDomains,
            }));

        return {
            selected_domains: selectedDomains,
            detected_domains: selectedDomains,
            overall_score: audit.overall_score || 0,
            domain_scores: Object.fromEntries(selectedDomains.map(d => [d, audit.overall_score || 0])),
            gaps: gapItems,
            strengths: strengths,
            analysis_summary: `Overall CV Score: ${audit.overall_score || 0}%. ${gapItems.length} gaps identified that need attention.`,
            general_recommendations: (audit.items || []).flatMap((i: any) => i.recommendations || []).slice(0, 5),
        };
    }
}
