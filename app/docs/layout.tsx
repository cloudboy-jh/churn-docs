import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';
import Image from 'next/image';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: (
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Churn Logo"
              width={32}
              height={32}
              className="rounded"
            />
            <span className="font-bold text-fd-primary">Churn</span>
            <span className="text-fd-muted-foreground">Docs</span>
          </div>
        ),
      }}
    >
      {children}
    </DocsLayout>
  );
}
