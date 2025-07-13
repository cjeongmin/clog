'use client';

import { Post } from '@/entity/post';
import { usePostAnchorActionsContext, usePostAnchorStateContext } from '@/entity/post-anchor';
import { useScrollStatus } from '@/feature/scroll-observer';
import { SCROLL_CONFIG } from '@/shared/constants/animation';

import { getTableOfContents } from '../model/table-of-contents.util';

interface TableOfContentsProps {
  content: Post['content'];
}

const ADDITIONAL_HEADER_OFFSET = 16;

export default function TableOfContents({
  content,
  className,
}: Readonly<TableOfContentsProps & { className?: string }>) {
  const tableOfContents = getTableOfContents(content);

  const { activeAnchor } = usePostAnchorStateContext();
  const { setActiveAnchor, setTocScrolling } = usePostAnchorActionsContext();

  const { showHeader } = useScrollStatus();

  const handleTocClick = (anchor: string) => {
    const targetElement = document.getElementById(anchor);
    if (!targetElement) return;

    setTocScrolling(true);
    setActiveAnchor(anchor);

    const currentScrollY = window.scrollY;
    const targetOffsetTop = targetElement.offsetTop;
    const isScrollingDown = targetOffsetTop > currentScrollY;

    const headerOffset = isScrollingDown
      ? ADDITIONAL_HEADER_OFFSET
      : SCROLL_CONFIG.HEADER_OFFSET + ADDITIONAL_HEADER_OFFSET;
    const targetPosition = targetOffsetTop - headerOffset;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  };

  return (
    <nav
      className={`${className} ${showHeader ? 'translate-y-0' : 'translate-y-header-hide'} duration-fast transition-transform ease-in-out`}
    >
      <ul className='flex flex-col gap-1 text-sm text-text-muted'>
        {tableOfContents.map((item) => (
          <li
            key={`${item.level}-${item.text}`}
            style={{ paddingLeft: `${(item.level - 1) * 1.5}rem` }}
            className={`duration-fast transition-all hover:font-medium hover:text-text-primary ${
              item.anchor === activeAnchor ? 'font-medium text-text-primary' : ''
            }`}
          >
            <button className='text-left' onClick={() => handleTocClick(item.anchor)}>
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
