'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { useTranslations } from 'next-intl';
import {
    Bold,
    Italic,
    Heading1,
    Heading2,
    List,
    ListOrdered,
    Undo,
    Redo,
    CheckCircle,
    RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface OutputEditorProps {
    initialContent?: string;
    onSave?: (content: string) => void;
    onApprove?: (content: string) => void;
    isSaving?: boolean;
    isRTL?: boolean;
    title?: string;
}

const MenuBar = ({ editor, t }: { editor: any, t: any }) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="flex flex-wrap gap-1 p-2 bg-muted/50 border-b rounded-t-lg">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={cn(editor.isActive('bold') && 'bg-muted')}
                title={t('bold')}
            >
                <Bold className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={cn(editor.isActive('italic') && 'bg-muted')}
                title={t('italic')}
            >
                <Italic className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="mx-1 h-6" />
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={cn(editor.isActive('heading', { level: 1 }) && 'bg-muted')}
                title={t('heading1')}
            >
                <Heading1 className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={cn(editor.isActive('heading', { level: 2 }) && 'bg-muted')}
                title={t('heading2')}
            >
                <Heading2 className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="mx-1 h-6" />
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={cn(editor.isActive('bulletList') && 'bg-muted')}
                title={t('bullet_list')}
            >
                <List className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={cn(editor.isActive('orderedList') && 'bg-muted')}
                title={t('ordered_list')}
            >
                <ListOrdered className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="mx-1 h-6" />
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
                title={t('undo')}
            >
                <Undo className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
                title={t('redo')}
            >
                <Redo className="h-4 w-4" />
            </Button>
        </div>
    );
};

export const OutputEditor = ({
    initialContent = '',
    onSave,
    onApprove,
    isSaving = false,
    isRTL = false,
    title
}: OutputEditorProps) => {
    const t = useTranslations('editor');
    const commonT = useTranslations('common');

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: t('placeholder'),
            }),
        ],
        content: initialContent,
        editorProps: {
            attributes: {
                class: cn(
                    "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[400px] p-6 max-w-none transition-all",
                    isRTL ? "text-right" : "text-left"
                ),
                dir: isRTL ? 'rtl' : 'ltr',
            },
        },
        onUpdate: ({ editor }) => {
            onSave?.(editor.getHTML());
        },
    });

    React.useEffect(() => {
        if (editor && initialContent && editor.getHTML() === '<p></p>') {
            editor.commands.setContent(initialContent);
        }
    }, [editor, initialContent]);

    return (
        <Card className="w-full border-2 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-muted/30 border-b flex flex-row items-center justify-between py-4 px-6">
                <div>
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                        <RotateCcw className={cn("h-5 w-5 text-primary", isSaving && "animate-spin")} />
                        {title || t('title')}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                        {t('description')}
                    </p>
                </div>
            </CardHeader>

            <MenuBar editor={editor} t={t} />

            <CardContent className="p-0">
                <EditorContent
                    editor={editor}
                    className={cn(
                        "tiptap-container bg-background/50",
                        isRTL && "font-vazir"
                    )}
                />
            </CardContent>

            <CardFooter className="bg-muted/10 border-t py-4 px-6 flex justify-between items-center">
                <div className="text-xs text-muted-foreground">
                    {isSaving ? t('saving') : t('content_saved')}
                </div>
                <Button
                    onClick={() => onApprove?.(editor?.getHTML() || '')}
                    className="rounded-full px-6 shadow-lg hover:shadow-primary/20 transition-all font-bold"
                    size="lg"
                >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {t('approve')}
                </Button>
            </CardFooter>

            <style jsx global>{`
                .tiptap p.is-editor-empty:first-child::before {
                    color: #adb5bd;
                    content: attr(data-placeholder);
                    float: left;
                    height: 0;
                    pointer-events: none;
                }
                .tiptap[dir="rtl"] p.is-editor-empty:first-child::before {
                    float: right;
                }
                .tiptap-container .ProseMirror:focus {
                    outline: none;
                }
                .prose h1 { font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; }
                .prose h2 { font-size: 1.25rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.75rem; }
                .prose p { margin-bottom: 1rem; line-height: 1.6; }
                .prose ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
                .prose ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
                [dir="rtl"] .prose ul, [dir="rtl"] .prose ol { padding-left: 0; padding-right: 1.5rem; }
            `}</style>
        </Card>
    );
};
