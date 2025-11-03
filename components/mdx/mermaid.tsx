'use client';

import mermaid from 'mermaid';
import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';

let id = 0;

export function Mermaid({ children }: { children: string }): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!ref.current) return;

    mermaid.initialize({
      startOnLoad: false,
      theme: resolvedTheme === 'dark' ? 'dark' : 'default',
      themeVariables: {
        // Customize colors to match Churn theme
        primaryColor: '#ff5656',
        primaryTextColor: '#fff',
        primaryBorderColor: '#ff5656',
        lineColor: resolvedTheme === 'dark' ? '#666' : '#ccc',
        secondaryColor: resolvedTheme === 'dark' ? '#2a2a2a' : '#f5f5f5',
        tertiaryColor: resolvedTheme === 'dark' ? '#1a1a1a' : '#ffffff',
      },
    });

    const renderChart = async () => {
      if (!ref.current) return;

      const uniqueId = `mermaid-${++id}`;
      const { svg } = await mermaid.render(uniqueId, children);
      ref.current.innerHTML = svg;
    };

    void renderChart();
  }, [children, resolvedTheme]);

  return <div ref={ref} className="flex justify-center my-6" />;
}
