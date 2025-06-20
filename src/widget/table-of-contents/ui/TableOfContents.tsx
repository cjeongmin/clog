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

    setTimeout(() => {
      setTocScrolling(false);
    }, 800);
  };

  return (
    <nav className={`${className}`}>
      <ul className='flex flex-col gap-1 text-sm text-slate-500'>
        {tableOfContents.map((item) => (
          <li
            key={`${item.level}-${item.text}`}
            style={{ paddingLeft: `${(item.level - 1) * 1.5}rem` }}
            className={`transition-all hover:font-medium hover:text-slate-800 ${
              item.anchor === activeAnchor ? 'font-medium text-slate-800' : ''
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
