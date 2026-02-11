import { Suspense } from 'react';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { MainLayout } from '@/components/layout/MainLayout';
import { ApplicationService } from '@/lib/applications';
import { ApplicationDetail } from '@/components/application/ApplicationDetail';
import { Loader2 } from 'lucide-react';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ApplicationDetailPage({ params }: { params: { id: string } }) {
    const res = await ApplicationService.getApplication(params.id);

    if (!res.success || !res.data) {
        notFound();
    }

    return (
        <AuthGuard>
            <MainLayout>
                <Suspense fallback={
                    <div className="flex justify-center p-12">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                }>
                    <ApplicationDetail application={res.data} />
                </Suspense>
            </MainLayout>
        </AuthGuard>
    );
}
