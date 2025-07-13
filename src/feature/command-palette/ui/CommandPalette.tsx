'use client';

import { useEffect, useRef, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { useRouter } from 'next/navigation';

import { Post } from '@/entity/post';
import PostItem from '@/entity/post/ui/PostItem';

interface CommandPaletteProps {
  posts: Post[];
}

export default function CommandPalette({ posts }: Readonly<CommandPaletteProps>) {
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState('');

  const lowercasedQuery = query.toLowerCase();

  const filteredPosts = posts.filter((post) => {
    if (lowercasedQuery.startsWith('#')) {
      const tagNameQuery = lowercasedQuery.substring(1).trim();
      if (tagNameQuery.length === 0) return true;
      return post.tags != null && post.tags.some((tag) => tag.toLowerCase().includes(tagNameQuery));
    } else {
      return post.title.toLowerCase().includes(lowercasedQuery);
    }
  });

  const toggleVisible = () => {
    setQuery('');
    setVisible((prev) => !prev);
  };

  useEffect(() => {
    if (visible) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const isCommandPaletteShortcut = (event.metaKey || event.ctrlKey) && event.key === 'k';
      const isEscapeWhenVisible = event.key === 'Escape' && visible;

      if (isCommandPaletteShortcut || isEscapeWhenVisible) {
        event.preventDefault();
        toggleVisible();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [visible]);

  return (
    <>
      <button onClick={toggleVisible}>
        <IoIosSearch size={20} />
      </button>
      {visible && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-overlay' onClick={toggleVisible}>
          <div
            className='flex h-[50dvh] w-[80dvw] min-w-[340px] max-w-[540px] flex-col gap-4 overflow-auto rounded-md bg-surface-primary p-4 sm:w-[30dvw]'
            onClick={(event) => event.stopPropagation()}
          >
            <div className='flex flex-row items-center border-b border-border-primary'>
              <IoIosSearch size={20} />
              <input
                ref={inputRef}
                type='text'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className='w-full bg-inherit p-2 text-text-secondary focus:outline-none'
              />
            </div>
            <div className='flex flex-row items-center gap-1 text-sm'>
              <p>게시글</p>
              <p className='text-text-muted'>{filteredPosts.length}</p>
            </div>
            <ul className='flex w-full flex-1 flex-col gap-2 overflow-y-auto'>
              {filteredPosts.map((post) => (
                <button
                  onClick={() => {
                    router.push(`/posts/${post.fileName}`);
                    toggleVisible();
                  }}
                  key={post.title}
                  className='flex w-full shrink-0 flex-row items-end gap-2 overflow-x-auto rounded-md border border-border-primary p-3 sm:transition-all sm:hover:border-border-interactive-hover'
                >
                  <PostItem post={post}>
                    <div className='flex flex-col gap-2'>
                      <div className='flex w-full flex-row items-center gap-2'>
                        <PostItem.Title className='truncate text-base text-text-secondary' />
                        <PostItem.Date className='whitespace-nowrap text-sm text-text-muted' />
                      </div>
                      <PostItem.Tags />
                    </div>
                  </PostItem>
                </button>
              ))}
            </ul>
            <footer className='flex self-end'>
              <p className='hidden text-sm text-text-muted sm:block'>
                {navigator.userAgent.toLowerCase().includes('mac')
                  ? '⌘ K to toggle palette'
                  : 'Ctrl K to toggle palette'}
              </p>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}
