import { z } from 'zod';

// ─────────────────────────────────────────────────────────────────
// 1. CANONICAL CV SCHEMA
// ─────────────────────────────────────────────────────────────────

export const IdentitySchema = z.object({
    full_name: z.string().nullable().default(null),
    email: z.string().email().nullable().default(null),
    phone: z.string().nullable().default(null),
    location: z.string().nullable().default(null),
    linkedin_url: z.string().url().nullable().default(null).or(z.string().length(0)),
    website_url: z.string().url().nullable().default(null).or(z.string().length(0)),
    summary: z.string().nullable().default(null),
});

export const ExperienceSchema = z.object({
    id: z.string(),
    job_title: z.string(),
    company: z.string(),
    location: z.string().nullable().default(null),
    start_date: z.string().nullable().default(null),
    end_date: z.string().nullable().default(null),
    is_current: z.boolean().default(false),
    description: z.string(),
    achievements: z.array(z.string()).default([]),
    metrics: z.array(z.string()).default([]),
});

export const EducationSchema = z.object({
    id: z.string(),
    degree: z.string(),
    field_of_study: z.string(),
    institution: z.string(),
    location: z.string().nullable().default(null),
    start_date: z.string().nullable().default(null),
    end_date: z.string().nullable().default(null),
    gpa: z.string().nullable().default(null),
    description: z.string().nullable().default(null),
});

export const ProjectSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    technologies: z.array(z.string()).default([]),
    url: z.string().url().nullable().default(null).or(z.string().length(0)),
    start_date: z.string().nullable().default(null),
    end_date: z.string().nullable().default(null),
});

export const CertificationSchema = z.object({
    id: z.string(),
    name: z.string(),
    issuer: z.string(),
    date_obtained: z.string().nullable().default(null),
    expiry_date: z.string().nullable().default(null),
    credential_id: z.string().nullable().default(null),
    credential_url: z.string().url().nullable().default(null).or(z.string().length(0)),
});

export const GenericSectionSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
});

export const CanonicalCVSchema = z.object({
    id: z.string().uuid(),
    user_id: z.string(),
    version: z.number().default(1),
    identity: IdentitySchema,
    experience: z.array(ExperienceSchema).default([]),
    education: z.array(EducationSchema).default([]),
    skills: z.array(z.string()).default([]),
    projects: z.array(ProjectSchema).default([]),
    certifications: z.array(CertificationSchema).default([]),
    publications: z.array(GenericSectionSchema).default([]),
    awards: z.array(GenericSectionSchema).default([]),
    teaching: z.array(GenericSectionSchema).default([]),
    clinical: z.array(GenericSectionSchema).default([]),
    volunteering: z.array(GenericSectionSchema).default([]),
    other: z.array(GenericSectionSchema).default([]),
    raw_text: z.string(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
    metadata: z.record(z.string(), z.any()).default({}),
});

export type CanonicalCV = z.infer<typeof CanonicalCVSchema>;

// ─────────────────────────────────────────────────────────────────
// 2. FIELD AUDIT SCHEMA (Phase 5)
// ─────────────────────────────────────────────────────────────────

export const FieldAuditItemSchema = z.object({
    field_path: z.string(),
    exists: z.boolean(),
    completeness_score: z.number().min(0).max(100),
    quality_score: z.number().min(0).max(100),
    issues: z.array(z.string()),
    recommendations: z.array(z.string()),
});

export const FieldAuditSchema = z.object({
    cv_id: z.string(),
    audit_date: z.string().datetime(),
    overall_score: z.number().min(0).max(100),
    items: z.array(FieldAuditItemSchema),
});

export type FieldAudit = z.infer<typeof FieldAuditSchema>;

// ─────────────────────────────────────────────────────────────────
// 3. GAP GUIDANCE SCHEMA (Phase 6)
// ─────────────────────────────────────────────────────────────────

export const GapGuidanceItemSchema = z.object({
    field: z.string(),
    guidance_text: z.string(),
    example: z.string(),
    skip_allowed: z.boolean().default(true),
});

export const GapGuidanceSchema = z.object({
    cv_id: z.string(),
    items: z.array(GapGuidanceItemSchema),
});

export type GapGuidance = z.infer<typeof GapGuidanceSchema>;
