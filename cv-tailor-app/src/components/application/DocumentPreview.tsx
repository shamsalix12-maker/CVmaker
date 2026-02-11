'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    FileText,
    Mail,
    Briefcase,
    Eye,
    Maximize2
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface DocumentPreviewProps {
    cvContent?: string;
    coverLetterContent?: string;
    emailContent?: string;
    isRTL?: boolean;
}

export function DocumentPreview({
    cvContent,
    coverLetterContent,
    emailContent,
    isRTL = false
}: DocumentPreviewProps) {
    const t = useTranslations('application');

    const documents = [
        { id: 'cv', label: t('tailored_cv'), icon: Briefcase, content: cvContent },
        { id: 'cover_letter', label: t('cover_letter'), icon: FileText, content: coverLetterContent },
        { id: 'email', label: t('application_email'), icon: Mail, content: emailContent },
    ].filter(d => !!d.content);

    if (documents.length === 0) return null;

    return (
        <div className="w-full space-y-6">
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Eye className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold tracking-tight">{t('documents_ready')}</h2>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground uppercase font-bold tracking-widest">
                    <Maximize2 className="h-3 w-3" />
                    Live Preview
                </div>
            </div>

            <Tabs defaultValue={documents[0].id} className="w-full">
                <TabsList className="grid grid-cols-3 h-14 bg-muted/50 p-1 rounded-xl border mb-6">
                    {documents.map((doc) => {
                        const Icon = doc.icon;
                        return (
                            <TabsTrigger
                                key={doc.id}
                                value={doc.id}
                                className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all flex items-center gap-2 font-semibold"
                            >
                                <Icon className="h-4 w-4 hidden sm:block" />
                                {doc.label}
                            </TabsTrigger>
                        );
                    })}
                </TabsList>

                {documents.map((doc) => (
                    <TabsContent key={doc.id} value={doc.id} className="focus-visible:ring-0">
                        <Card className="border-2 shadow-inner bg-background/50 backdrop-blur-sm overflow-hidden rounded-2xl">
                            <div className="absolute top-4 right-4 z-10 opacity-50 pointer-events-none">
                                <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest border-border bg-background">
                                    Preview Mode
                                </Badge>
                            </div>
                            <ScrollArea className="h-[600px] w-full">
                                <CardContent className="p-10 sm:p-16">
                                    <div
                                        className={cn(
                                            "prose prose-sm sm:prose-base dark:prose-invert max-w-none font-serif leading-relaxed",
                                            isRTL ? "text-right font-vazir" : "text-left"
                                        )}
                                        dir={isRTL ? 'rtl' : 'ltr'}
                                        dangerouslySetInnerHTML={{ __html: doc.content || '' }}
                                    />
                                </CardContent>
                            </ScrollArea>
                        </Card>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
