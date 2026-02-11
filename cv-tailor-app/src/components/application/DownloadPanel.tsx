'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
    FileText,
    Download,
    File as FileIcon,
    Archive,
    Check,
    Loader2,
    ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { DocumentType } from '@/lib/types';

interface DownloadPanelProps {
    content: string;
    type: DocumentType;
    filename?: string;
    metadata?: any;
}

export function DownloadPanel({ content, type, filename, metadata }: DownloadPanelProps) {
    const t = useTranslations('application');
    const [downloading, setDownloading] = useState<'docx' | 'md' | 'all' | null>(null);

    const handleDownload = async (format: 'docx' | 'md') => {
        setDownloading(format);
        try {
            const endpoint = `/api/export/${format === 'docx' ? 'docx' : 'markdown'}`;
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content,
                    type,
                    filename: filename || `${type}-${Date.now()}`,
                    metadata,
                    includeMetadata: true // for markdown
                })
            });

            if (!res.ok) throw new Error('Download failed');

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${filename || type}.${format}`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            toast.success(`${format.toUpperCase()} downloaded successfully`);
        } catch (error) {
            console.error(error);
            toast.error(`Failed to download ${format.toUpperCase()}`);
        } finally {
            setDownloading(null);
        }
    };

    const typeLabels: Record<DocumentType, string> = {
        cv: t('tailored_cv'),
        cover_letter: t('cover_letter'),
        email: t('application_email')
    };

    return (
        <Card className="w-full bg-card/50 backdrop-blur-sm border-2 shadow-lg hover:shadow-xl transition-all h-full">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 uppercase tracking-wider text-[10px] font-bold px-3 py-1">
                        {type}
                    </Badge>
                    {downloading && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            {t('processing')}
                        </div>
                    )}
                </div>
                <CardTitle className="text-xl mt-2 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    {typeLabels[type]}
                </CardTitle>
                <CardDescription>
                    {filename || `${typeLabels[type]} ready for download`}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                    <Button
                        variant="default"
                        size="lg"
                        className="w-full rounded-xl font-bold shadow-md hover:shadow-lg transition-all group"
                        disabled={!!downloading}
                        onClick={() => handleDownload('docx')}
                    >
                        {downloading === 'docx' ? (
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        ) : (
                            <FileIcon className="h-5 w-5 mr-2 transition-transform group-hover:scale-110" />
                        )}
                        {t('download_word')}
                        <Download className="ml-auto h-4 w-4 opacity-50" />
                    </Button>

                    <Button
                        variant="outline"
                        size="lg"
                        className="w-full rounded-xl font-bold border-2 hover:bg-muted/50 transition-all group"
                        disabled={!!downloading}
                        onClick={() => handleDownload('md')}
                    >
                        {downloading === 'md' ? (
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        ) : (
                            <FileText className="h-5 w-5 mr-2 transition-transform group-hover:scale-110" />
                        )}
                        {t('download_markdown')}
                        <Download className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </div>

                <div className="pt-4 border-t border-dashed">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-xs text-muted-foreground hover:text-primary gap-2"
                        onClick={() => {
                            navigator.clipboard.writeText(content);
                            toast.success(t('copy_to_clipboard'));
                        }}
                    >
                        <Archive className="h-3 w-3" />
                        {t('copy_to_clipboard')}
                        <Check className="ml-auto h-3 w-3 opacity-0 group-hover:opacity-100" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
