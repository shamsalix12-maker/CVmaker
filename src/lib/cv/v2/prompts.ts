/**
 * PROMPT TEMPLATES FOR CV PROCESSOR V2.0
 */

// ─────────────────────────────────────────────────────────────────
// PHASE 2: BLIND STRUCTURED EXTRACTION
// ─────────────────────────────────────────────────────────────────

export function buildBlindExtractionSystemPrompt(): string {
    return `You are a high-precision data extraction engine.
Your task is to extract ALL factual information from the provided CV text into the canonical JSON structure.

RULES:
1. PRESERVE every piece of data. Do NOT summarize or condense.
2. NO HALLUCINATION. Do not invent details not present in the text.
3. NO DELETION. If a field exists, extract it.
4. Structure the output according to the provided JSON schema.
5. Use null for missing fields.
6. Return ONLY valid JSON. No explanations or markdown.`;
}

export function buildBlindExtractionUserPrompt(rawText: string): string {
    return `Extract all factual information from the following CV text into the canonical JSON structure. 
Preserve every piece of data, do not hallucinate or delete any field.

Universal CV JSON sections: 
- Identity
- Experience[]
- Education[]
- Skills[]
- Projects[]
- Certifications[]
- Publications[]
- Awards[]
- Teaching[]
- Clinical[]
- Volunteering[]
- Other[]

---CV TEXT---
${rawText}
---`;
}

// ─────────────────────────────────────────────────────────────────
// PHASE 5: QUANTITATIVE & QUALITATIVE ASSESSMENT
// ─────────────────────────────────────────────────────────────────

export function buildAssessmentSystemPrompt(): string {
    return `You are a professional CV auditor. 
Your task is to evaluate each field of the provided canonical CV for completeness and quality.

RULES:
1. ONLY assessment, NO rewriting.
2. Do NOT invent data.
3. Provide objective scores (0-100).
4. Identify specific issues and provide actionable recommendations.
5. Return ONLY valid JSON matching the FieldAudit schema.`;
}

export function buildAssessmentUserPrompt(cvJson: string): string {
    return `Evaluate each field of the provided canonical CV for completeness and quality.
Return JSON: { field_path, exists, completeness_score, quality_score, issues, recommendations }.
Do not rewrite or invent any data.

---CANONICAL CV JSON---
${cvJson}
---`;
}

// ─────────────────────────────────────────────────────────────────
// PHASE 6: GAP INTELLIGENCE GENERATION
// ─────────────────────────────────────────────────────────────────

export function buildGapIntelligenceSystemPrompt(): string {
    return `You are a career guidance expert.
Based on domain rules and field audits, create actionable guidance for the user to fill incomplete or weak CV fields.

RULES:
1. Provide clear, direct guidance.
2. Include realistic examples.
3. Respect the "skip_allowed" rule (default true).
4. Return ONLY valid JSON matching the GapGuidance schema.`;
}

export function buildGapIntelligenceUserPrompt(fieldAuditJson: string, domainRules: string): string {
    return `Based on the following domain rules and field audits, create actionable guidance for the user to fill incomplete fields.
Include examples and skip instructions. Output structured JSON { field, guidance_text, example, skip_allowed }.

---DOMAIN RULES---
${domainRules}

---FIELD AUDIT JSON---
${fieldAuditJson}
---`;
}

// ─────────────────────────────────────────────────────────────────
// PHASE 8: FINAL CV RENDERING
// ─────────────────────────────────────────────────────────────────

export function buildRenderingSystemPrompt(): string {
    return `You are a professional CV formatter and typesetter.
Your task is to render high-quality formatted CV text from the provided canonical CV JSON.

RULES:
1. NO data deletion or hallucination.
2. Respect multi-domain context.
3. Focus on readability, clarity, and professional formatting.
4. Professional tone: active verbs, clear structure.
5. Output the final CV text only.`;
}

export function buildRenderingUserPrompt(cvJson: string, domains: string[]): string {
    const domainText = domains.join(', ');
    return `Render a professional CV text from the canonical CV JSON. 
Do not invent or remove any data. Focus on readability, clarity, formatting, and multi-domain applicability for: ${domainText}.

---CANONICAL CV JSON---
${cvJson}
---`;
}
