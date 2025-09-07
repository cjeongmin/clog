'use client';

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

import { useTheme } from '@/feature/theme';

export default function Mermaid({ diagram }: { diagram: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  const { theme } = useTheme();

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: theme === 'dark' ? 'dark' : 'neutral' });
    const id = 'mermaid-' + Math.random().toString(36).slice(2);

    const renderDiagram = async () => {
      try {
        const { svg } = await mermaid.render(id, diagram);
        if (ref.current) ref.current.innerHTML = svg;
      } catch (e) {
        if (ref.current) ref.current.innerText = 'Mermaid render error: ' + String(e);
      }
    };

    renderDiagram();
  }, [diagram, theme]);

  return <div ref={ref} />;
}
