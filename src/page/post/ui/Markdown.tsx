'use client';

import { usePostAnchorStore } from '@/entity/post-anchor';
import { useEffect } from 'react';

interface MarkdownProps {
  content: string;
}

export default function Markdown({ content }: MarkdownProps) {
  const setActiveAnchor = usePostAnchorStore((state) => state.setActiveAnchor);

  useEffect(() => {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            setActiveAnchor(target.id);
          }
        });
      },
      { rootMargin: '0px 0px -50% 0px', threshold: 1 },
    );

    headings.forEach((h) => observer.observe(h));
    headings.forEach((h) => {
      if (h.textContent) h.id = `anchor-${h.textContent}`;
    });

    return () => headings.forEach((h) => observer.unobserve(h));
  }, [setActiveAnchor]);

  return <article className='prose w-full !max-w-none' dangerouslySetInnerHTML={{ __html: content }}></article>;
}
