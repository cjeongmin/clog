'use client';

import { Post } from '@/entity/post';
import { usePostAnchorActionsContext, usePostAnchorStateContext } from '@/entity/post-anchor';

import { getTableOfContents } from '../model/table-of-contents.util';

interface TableOfContentsProps {
  content: Post['content'];
}

export default function TableOfContents({
  content,
  className,
}: Readonly<TableOfContentsProps & { className?: string }>) {
  const tableOfContents = getTableOfContents(content);

  const { activeAnchor } = usePostAnchorStateContext();
  const { setActiveAnchor, setTocScrolling } = usePostAnchorActionsContext();

  const handleTocClick = (anchor: string) => {
    const targetElement = document.getElementById(anchor);
    if (!targetElement) return;

    setTocScrolling(true);
    setActiveAnchor(anchor);

    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <nav className={`${className}`}>
      <ul className='text-text-muted flex flex-col gap-1 text-sm'>
        {tableOfContents.map((item) => (
          <li
            key={`${item.level}-${item.text}`}
            style={{ paddingLeft: `${(item.level - 1) * 1.5}rem` }}
            className={`hover:text-text-primary transition-all hover:font-medium ${
              item.anchor === activeAnchor ? 'text-text-primary font-medium' : ''
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
