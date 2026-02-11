'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { AIMultiDraftPanel } from '@/components/ai/AIMultiDraftPanel';
import { AISelection } from '@/lib/types';

interface AIConfigurationStepProps {
    selections: AISelection[];
    onChange: (selections: AISelection[]) => void;
}

export function AIConfigurationStep({ selections, onChange }: AIConfigurationStepProps) {
    const t = useTranslations('application');

    const draftSelections = selections.filter(s => s.role === 'draft');
    const finalSelection = selections.find(s => s.role === 'final') || null;

    const handleDraftsChange = (items: { provider: any, model_id: string }[]) => {
        const otherSelections = selections.filter(s => s.role !== 'draft');
        const newDrafts: AISelection[] = items.map(item => ({
            provider: item.provider,
            model_id: item.model_id,
            role: 'draft'
        }));
        onChange([...otherSelections, ...newDrafts]);
    };

    const handleFinalChange = (item: { provider: any, model_id: string } | null) => {
        const otherSelections = selections.filter(s => s.role !== 'final');
        const newSelections = [...otherSelections];
        if (item) {
            newSelections.push({
                provider: item.provider,
                model_id: item.model_id,
                role: 'final'
            });
        }
        onChange(newSelections);
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">{t('select_ai')}</h2>
                <p className="text-muted-foreground">{t('select_ai_help')}</p>
            </div>

            <AIMultiDraftPanel
                onDraftModelsChange={handleDraftsChange}
                onFinalModelChange={handleFinalChange}
                initialDraftSelections={draftSelections}
                initialFinalSelection={finalSelection}
                // We'll handle generation in the next step
                onGenerateDrafts={() => { }}
                onGenerateFinal={() => { }}
            />
        </div>
    );
}
