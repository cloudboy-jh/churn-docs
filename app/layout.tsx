import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Churn Documentation',
    template: '%s | Churn Docs',
  },
  description: 'Refactor smarter from your terminal. Local-first AI code analysis tool powered by Claude, GPT, Gemini, and Ollama.',
  keywords: ['churn', 'code analysis', 'refactoring', 'AI', 'CLI', 'developer tools', 'code review'],
  authors: [{ name: 'Churn Team' }],
  openGraph: {
    title: 'Churn Documentation',
    description: 'Refactor smarter from your terminal. Local-first AI code analysis tool.',
    type: 'website',
    siteName: 'Churn Docs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Churn Documentation',
    description: 'Refactor smarter from your terminal. Local-first AI code analysis tool.',
  },
  icons: {
    icon: '/logo.png',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
