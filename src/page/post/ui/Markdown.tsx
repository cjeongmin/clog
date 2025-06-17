'use client';

import { PropsWithChildren, useEffect, useRef } from 'react';

import { usePostAnchorActionsContext } from '@/entity/post-anchor';

export default function Markdown({ children }: PropsWithChildren) {
  const articleRef = useRef<HTMLDivElement>(null);

  const { setActiveAnchor } = usePostAnchorActionsContext();

  useEffect(() => {
    if (!articleRef.current) return;

    const headings = articleRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            setActiveAnchor(target.id);
          }
        });
      },
      {
        rootMargin: '0px 0px -50% 0px',
      },
    );

    headings.forEach((h) => observer.observe(h));
    headings.forEach((h, index) => {
      if (h.textContent) h.id = `anchor-${index + 1}`;
    });

    return () => headings.forEach((h) => observer.unobserve(h));
  }, [setActiveAnchor, articleRef]);

  return (
    <article ref={articleRef} className='prose w-full !max-w-none break-words break-keep'>
      {children}
    </article>
  );
}
