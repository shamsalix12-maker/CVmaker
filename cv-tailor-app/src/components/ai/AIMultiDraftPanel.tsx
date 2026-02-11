'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
    Plus,
    Check,
    ChevronRight,
    ChevronLeft,
    Zap,
    Bot,
    Sparkles,
    Brain,
    Eye,
    Trash2,
    CheckCircle2,
    Info
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAIKeys } from '@/hooks/useAIKeys';
import { AIProviderName, AIModel, DraftOutput } from '@/lib/types';
import { SUPPORTED_AI_PROVIDERS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface AIMultiDraftPanelProps {
    onDraftModelsChange?: (selections: { provider: AIProviderName, model_id: string }[]) => void;
    onFinalModelChange?: (selection: { provider: AIProviderName, model_id: string } | null) => void;
    onGenerateDrafts?: () => void;
    onGenerateFinal?: () => void;
    drafts?: DraftOutput[];
    isProcessingDrafts?: boolean;
    isProcessingFinal?: boolean;
    initialDraftSelections?: { provider: AIProviderName, model_id: string }[];
    initialFinalSelection?: { provider: AIProviderName, model_id: string } | null;
}

export function AIMultiDraftPanel({
    onDraftModelsChange,
    onFinalModelChange,
    onGenerateDrafts,
    onGenerateFinal,
    drafts = [],
    isProcessingDrafts = false,
    isProcessingFinal = false,
    initialDraftSelections = [],
    initialFinalSelection = null,
}: AIMultiDraftPanelProps) {
    const t = useTranslations('ai');
    const ct = useTranslations('common');
    const { keys, loading: keysLoading } = useAIKeys();

    const [selectedDraftModels, setSelectedDraftModels] = useState<{ provider: AIProviderName, model_id: string }[]>(initialDraftSelections);
    const [selectedFinalModel, setSelectedFinalModel] = useState<{ provider: AIProviderName, model_id: string } | null>(initialFinalSelection);
    const [activeTab, setActiveTab] = useState<'selection' | 'drafts'>('selection');

    useEffect(() => {
        if (drafts.length > 0 && activeTab === 'selection') {
            setActiveTab('drafts');
        }
    }, [drafts.length, activeTab]);

    const toggleDraftModel = (provider: AIProviderName, model_id: string) => {
        const index = selectedDraftModels.findIndex(m => m.provider === provider && m.model_id === model_id);
        let newSelection;
        if (index >= 0) {
            newSelection = selectedDraftModels.filter((_, i) => i !== index);
        } else {
            newSelection = [...selectedDraftModels, { provider, model_id }];
        }
        setSelectedDraftModels(newSelection);
        onDraftModelsChange?.(newSelection);
    };

    const selectFinalModel = (provider: AIProviderName, model_id: string) => {
        const newSelection = { provider, model_id };
        setSelectedFinalModel(newSelection);
        onFinalModelChange?.(newSelection);
    };

    const getProviderIcon = (provider: AIProviderName) => {
        switch (provider) {
            case 'openai': return <Brain className="h-4 w-4" />;
            case 'anthropic': return <Bot className="h-4 w-4" />;
            case 'google': return <Sparkles className="h-4 w-4" />;
            default: return <Zap className="h-4 w-4" />;
        }
    };

    const availableModels = keys.filter(k => k.is_valid).flatMap(k =>
        k.available_models.map(m => ({ ...m, provider: k.provider_name }))
    );

    const [viewingDraft, setViewingDraft] = useState<DraftOutput | null>(null);

    return (
        <Card className="w-full shadow-2xl border-none bg-background/60 backdrop-blur-xl">
            <CardHeader className="bg-gradient-to-r from-primary/10 via-background to-background pb-6 rounded-t-xl border-b">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-2xl font-bold tracking-tight flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Sparkles className="h-6 w-6 text-primary" />
                            </div>
                            {t('multi_draft_title')}
                        </CardTitle>
                        <CardDescription className="text-base">
                            {t('multi_draft_description')}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
                <div className="px-6 border-b bg-muted/5">
                    <TabsList className="bg-transparent h-14 gap-8">
                        <TabsTrigger
                            value="selection"
                            className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 h-14 font-semibold transition-all"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            {t('selecting_models')}
                        </TabsTrigger>
                        <TabsTrigger
                            value="drafts"
                            className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 h-14 font-semibold transition-all"
                            disabled={drafts.length === 0 && !isProcessingDrafts}
                        >
                            <Eye className="h-4 w-4 mr-2" />
                            {ct('view')}
                            {drafts.length > 0 && (
                                <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary border-none">
                                    {drafts.length}
                                </Badge>
                            )}
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="selection" className="p-8 m-0 focus-visible:ring-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Draft Models Selection */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <Bot className="h-4 w-4 text-primary" />
                                    {t('select_draft_models')}
                                </h3>
                                <Badge variant="outline" className="rounded-full px-3">
                                    {selectedDraftModels.length} {t('model_selected')}
                                </Badge>
                            </div>

                            <ScrollArea className="h-[350px] rounded-xl border bg-muted/5 p-2">
                                <div className="space-y-2 p-2">
                                    {availableModels.length === 0 ? (
                                        <div className="text-center py-16 text-muted-foreground bg-muted/10 rounded-lg">
                                            <Info className="h-10 w-10 mx-auto mb-3 opacity-20" />
                                            <p className="text-sm font-medium">{t('no_keys')}</p>
                                        </div>
                                    ) : (
                                        availableModels.map((model) => {
                                            const isSelected = selectedDraftModels.some(m => m.provider === model.provider && m.model_id === model.model_id);
                                            return (
                                                <div
                                                    key={`${model.provider}-${model.model_id}`}
                                                    className={cn(
                                                        "group flex items-center space-x-4 p-4 rounded-xl border transition-all cursor-pointer hover:shadow-md",
                                                        isSelected
                                                            ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                                                            : "border-border hover:border-primary/30 bg-card hover:bg-muted/30"
                                                    )}
                                                    onClick={() => toggleDraftModel(model.provider, model.model_id)}
                                                >
                                                    <Checkbox
                                                        checked={isSelected}
                                                        className="h-5 w-5 rounded-md"
                                                        onCheckedChange={() => toggleDraftModel(model.provider, model.model_id)}
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <div className={cn(
                                                                "p-1.5 rounded-md bg-muted group-hover:bg-primary/10 transition-colors",
                                                                isSelected && "bg-primary/20"
                                                            )}>
                                                                {getProviderIcon(model.provider)}
                                                            </div>
                                                            <span className="font-semibold text-sm truncate">{model.model_name}</span>
                                                        </div>
                                                        <span className="text-[11px] uppercase text-muted-foreground font-bold ml-9">
                                                            {model.provider}
                                                        </span>
                                                    </div>
                                                    {isSelected && <CheckCircle2 className="h-5 w-5 text-primary ml-auto" />}
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </ScrollArea>
                        </div>

                        {/* Final Model Selection */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary" />
                                    {t('select_final_model')}
                                </h3>
                                {selectedFinalModel && (
                                    <Badge className="bg-primary text-primary-foreground rounded-full hover:bg-primary">
                                        {availableModels.find(m => m.provider === selectedFinalModel.provider && m.model_id === selectedFinalModel.model_id)?.model_name || t('model_selected')}
                                    </Badge>
                                )}
                            </div>

                            <ScrollArea className="h-[350px] rounded-xl border bg-muted/5 p-2">
                                <div className="space-y-2 p-2">
                                    {availableModels.length === 0 ? (
                                        <div className="text-center py-16 text-muted-foreground bg-muted/10 rounded-lg">
                                            <Info className="h-10 w-10 mx-auto mb-3 opacity-20" />
                                            <p className="text-sm font-medium">{t('no_keys')}</p>
                                        </div>
                                    ) : (
                                        availableModels.map((model) => {
                                            const isSelected = selectedFinalModel?.provider === model.provider && selectedFinalModel?.model_id === model.model_id;
                                            return (
                                                <div
                                                    key={`final-${model.provider}-${model.model_id}`}
                                                    className={cn(
                                                        "group flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer hover:shadow-md",
                                                        isSelected
                                                            ? "border-primary bg-primary/5 ring-1 ring-primary/20 shadow-sm"
                                                            : "border-border hover:border-primary/30 bg-card hover:bg-muted/30"
                                                    )}
                                                    onClick={() => selectFinalModel(model.provider, model.model_id)}
                                                >
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <div className={cn(
                                                                "p-1.5 rounded-md bg-muted group-hover:bg-primary/10 transition-colors",
                                                                isSelected && "bg-primary/20"
                                                            )}>
                                                                {getProviderIcon(model.provider)}
                                                            </div>
                                                            <span className="font-semibold text-sm truncate">{model.model_name}</span>
                                                        </div>
                                                        <span className="text-[11px] uppercase text-muted-foreground font-bold ml-9">
                                                            {model.provider}
                                                        </span>
                                                    </div>
                                                    <div className={cn(
                                                        "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all",
                                                        isSelected ? "border-primary bg-primary text-primary-foreground" : "border-muted group-hover:border-primary/50"
                                                    )}>
                                                        {isSelected && <Check className="h-3.5 w-3.5" />}
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </ScrollArea>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col items-center gap-4">
                        <Button
                            size="lg"
                            className="px-12 py-7 rounded-full shadow-xl hover:shadow-2xl transition-all text-lg font-bold bg-primary hover:bg-primary/90"
                            disabled={selectedDraftModels.length === 0 || isProcessingDrafts}
                            onClick={onGenerateDrafts}
                        >
                            {isProcessingDrafts ? (
                                <Zap className="h-6 w-6 mr-3 animate-pulse" />
                            ) : (
                                <Plus className="h-6 w-6 mr-3" />
                            )}
                            {t('generate_drafts')}
                        </Button>
                        {selectedDraftModels.length > 0 && (
                            <p className="text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-2">
                                {t('models_selected', { count: selectedDraftModels.length })}
                            </p>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="drafts" className="p-8 m-0 focus-visible:ring-0">
                    {drafts.length === 0 ? (
                        <div className="text-center py-24 border-2 border-dashed rounded-2xl bg-muted/5 flex flex-col items-center">
                            <div className="p-4 bg-muted/10 rounded-full mb-6">
                                <Bot className="h-16 w-16 text-muted-foreground opacity-20" />
                            </div>
                            <p className="text-xl font-semibold text-muted-foreground mb-2">{t('no_drafts_yet')}</p>
                            <Button variant="ghost" className="text-primary" onClick={() => setActiveTab('selection')}>
                                {t('selecting_models')}
                                <Plus className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {drafts.map((draft, idx) => (
                                    <Card key={draft.id || idx} className="overflow-hidden border-2 hover:border-primary hover:shadow-lg transition-all group bg-card/50">
                                        <CardHeader className="py-4 px-5 bg-muted/20 flex flex-row items-center justify-between border-b">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-lg border border-primary/20 shadow-inner">
                                                    {idx + 1}
                                                </div>
                                                <div>
                                                    <CardTitle className="text-base font-bold">
                                                        {draft.ai_model}
                                                    </CardTitle>
                                                    <CardDescription className="text-[10px] uppercase font-black tracking-widest text-primary/70">
                                                        {draft.ai_provider}
                                                    </CardDescription>
                                                </div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-10 w-10 rounded-full border-primary/20 hover:bg-primary/10 hover:border-primary transition-all"
                                                onClick={() => setViewingDraft(draft)}
                                            >
                                                <Eye className="h-5 w-5 text-primary" />
                                            </Button>
                                        </CardHeader>
                                        <CardContent className="p-5">
                                            <ScrollArea className="h-[120px] rounded-lg bg-muted/20 p-4 border border-border/50">
                                                <div className="text-sm leading-relaxed text-muted-foreground line-clamp-4 group-hover:line-clamp-none transition-all">
                                                    {draft.content}
                                                </div>
                                            </ScrollArea>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            <div className="flex flex-col items-center gap-6 pt-10 border-t bg-gradient-to-b from-transparent to-primary/5 rounded-b-2xl pb-6">
                                <div className="flex items-center gap-3 bg-background/80 py-2 px-4 rounded-full border shadow-sm">
                                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                    <p className="text-sm font-semibold">
                                        {selectedFinalModel
                                            ? `${t('final_provider')}: ${selectedFinalModel.model_id}`
                                            : t('select_final_model')}
                                    </p>
                                </div>
                                <Button
                                    size="lg"
                                    className="px-14 py-8 rounded-full shadow-2xl transition-all text-xl font-bold bg-gradient-to-br from-primary via-primary to-primary/80 hover:scale-105 active:scale-95"
                                    disabled={!selectedFinalModel || isProcessingFinal}
                                    onClick={onGenerateFinal}
                                >
                                    {isProcessingFinal ? (
                                        <Sparkles className="h-7 w-7 mr-4 animate-spin text-white" />
                                    ) : (
                                        <CheckCircle2 className="h-7 w-7 mr-4 text-white" />
                                    )}
                                    {t('consolidate_drafts')}
                                </Button>
                                <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground opacity-50">
                                    AI-Powered Consolidation
                                </p>
                            </div>
                        </div>
                    )}
                </TabsContent>
            </Tabs>

            {/* View Draft Dialog */}
            <Dialog open={!!viewingDraft} onOpenChange={() => setViewingDraft(null)}>
                <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col p-0 overflow-hidden border-none shadow-3xl">
                    <DialogHeader className="p-8 bg-gradient-to-r from-primary/10 to-transparent border-b">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/20 rounded-2xl">
                                <Bot className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <DialogTitle className="text-2xl font-bold">{viewingDraft?.ai_model}</DialogTitle>
                                <CardDescription className="text-sm uppercase font-bold tracking-widest mt-1">
                                    {viewingDraft?.ai_provider}
                                </CardDescription>
                            </div>
                        </div>
                    </DialogHeader>
                    <ScrollArea className="flex-1 p-8 bg-card">
                        <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap font-serif text-lg leading-relaxed">
                            {viewingDraft?.content}
                        </div>
                    </ScrollArea>
                    <DialogFooter className="p-4 bg-muted/30 border-t flex justify-between items-center sm:justify-between">
                        <div className="text-xs text-muted-foreground flex items-center gap-2 font-medium">
                            <Info className="h-4 w-4" />
                            Created on {viewingDraft && new Date(viewingDraft.created_at).toLocaleString()}
                        </div>
                        <Button
                            className="rounded-full px-8 font-bold"
                            onClick={() => setViewingDraft(null)}
                        >
                            {ct('close')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
}
