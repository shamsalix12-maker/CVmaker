import {
    CanonicalCV,
    CanonicalCVSchema
} from './types';

export class Merger {
    /**
     * Merges a partial CV patch into the current Canonical CV state.
     * Ensures lossless operation by only updating fields present in the patch.
     */
    merge(currentCV: CanonicalCV, patch: Partial<CanonicalCV>): CanonicalCV {
        console.log(`[Merger] Merging patch into CV ${currentCV.id} (v${currentCV.version})`);

        const now = new Date().toISOString();

        // Deep clone the current CV to avoid mutations
        const newCV: any = JSON.parse(JSON.stringify(currentCV));

        // Update simple fields
        if (patch.identity) {
            newCV.identity = { ...newCV.identity, ...patch.identity };
        }

        // Merge array sections (Experience, Education, etc.)
        // Strategy: Match by ID, update existing or append new
        this.mergeArraySection(newCV, patch, 'experience');
        this.mergeArraySection(newCV, patch, 'education');
        this.mergeArraySection(newCV, patch, 'projects');
        this.mergeArraySection(newCV, patch, 'certifications');
        this.mergeArraySection(newCV, patch, 'publications');
        this.mergeArraySection(newCV, patch, 'awards');
        this.mergeArraySection(newCV, patch, 'teaching');
        this.mergeArraySection(newCV, patch, 'clinical');
        this.mergeArraySection(newCV, patch, 'volunteering');
        this.mergeArraySection(newCV, patch, 'other');

        // Merge simple string arrays (Skills)
        if (patch.skills) {
            const skillsSet = new Set([...newCV.skills, ...patch.skills]);
            newCV.skills = Array.from(skillsSet);
        }

        // Update metadata and version
        newCV.version = (currentCV.version || 1) + 1;
        newCV.updated_at = now;
        newCV.metadata = {
            ...(newCV.metadata || {}),
            ...(patch.metadata || {}),
            last_merge_at: now,
        };

        // Final validation
        const validation = CanonicalCVSchema.safeParse(newCV);
        if (!validation.success) {
            throw new Error(`Merge resulted in invalid schema: ${JSON.stringify(validation.error.format())}`);
        }

        return validation.data;
    }

    private mergeArraySection(target: any, patch: any, key: string) {
        if (!patch[key] || !Array.isArray(patch[key])) return;

        if (!target[key]) target[key] = [];

        for (const item of patch[key]) {
            if (!item.id) {
                // Append if no ID
                target[key].push(item);
                continue;
            }

            const existingIdx = target[key].findIndex((i: any) => i.id === item.id);
            if (existingIdx >= 0) {
                // Update existing
                target[key][existingIdx] = { ...target[key][existingIdx], ...item };
            } else {
                // Append new
                target[key].push(item);
            }
        }
    }
}
