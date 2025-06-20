'use client';

import { PropsWithChildren, useEffect, useRef } from 'react';

import { usePostAnchorActionsContext, usePostAnchorStateContext } from '@/entity/post-anchor';

export default function Markdown({ children }: PropsWithChildren) {
  const articleRef = useRef<HTMLDivElement>(null);

  const { setActiveAnchor } = usePostAnchorActionsContext();
  const { isTocScrolling } = usePostAnchorStateContext();

  useEffect(() => {
    if (!articleRef.current) return;

    const headings = articleRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const observer = new IntersectionObserver(
      (entries) => {
        if (isTocScrolling) return;

        let topHeading: Element | null = null;
        let topPosition = Infinity;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const rect = target.getBoundingClientRect();

            if (rect.top >= 0 && rect.top < topPosition) {
              topPosition = rect.top;
              topHeading = target;
            }
          }
        });

        if (topHeading && (topHeading as HTMLElement).id) {
          setActiveAnchor((topHeading as HTMLElement).id);
        }
      },
      {
        rootMargin: '0px 0px -70% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    headings.forEach((h) => observer.observe(h));
    headings.forEach((h, index) => {
      if (h.textContent) h.id = `anchor-${index + 1}`;
    });

    return () => {
      headings.forEach((h) => observer.unobserve(h));
    };
  }, [setActiveAnchor, isTocScrolling]);

  return (
    <article ref={articleRef} className='prose w-full !max-w-none break-words break-keep'>
      {children}
    </article>
  );
}
