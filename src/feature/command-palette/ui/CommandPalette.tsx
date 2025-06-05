'use client';

import { useEffect, useRef, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { useRouter } from 'next/navigation';

import { Post } from '@/entity/post';
import PostItem from '@/entity/post/ui/PostItem';

interface CommandPaletteProps {
  posts: Post[];
}

export default function CommandPalette({ posts }: CommandPaletteProps) {
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState('');

  const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(query.toLowerCase()));

  const toggleVisible = () => {
    setQuery('');
    setVisible((prev) => !prev);
  };

  useEffect(() => {
    if (visible) {
      inputRef.current?.focus();
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
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [visible]);

  return (
    <>
      <button onClick={toggleVisible}>
        <IoIosSearch size={20} />
      </button>
      {visible && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50' onClick={toggleVisible}>
          <div
            className='flex h-[50dvh] w-[80dvw] min-w-[340px] max-w-[540px] flex-col gap-4 overflow-auto rounded-md bg-white p-4 sm:w-[30dvw]'
            onClick={(event) => event.stopPropagation()}
          >
            <div className='flex flex-row items-center border-b border-gray-300'>
              <IoIosSearch size={20} />
              <input
                ref={inputRef}
                type='text'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className='w-full p-2 text-slate-600 focus:outline-none'
              />
            </div>
            <div className='flex flex-row items-center gap-1 text-sm'>
              <p>게시글</p>
              <p className='text-slate-400'>{filteredPosts.length}</p>
            </div>
            <ul className='flex w-full flex-1 flex-col gap-2'>
              {filteredPosts.map((post) => (
                <button
                  onClick={() => {
                    router.push(`/posts/${post.fileName}`);
                    toggleVisible();
                  }}
                  key={post.title}
                  className='flex w-full flex-row items-end gap-2 rounded-md border p-3 sm:transition-all sm:hover:border-slate-400'
                >
                  <PostItem post={post}>
                    <div className='flex w-full flex-row items-center gap-2'>
                      <PostItem.Title className='truncate text-base text-slate-600' />
                      <PostItem.Date className='whitespace-nowrap text-sm text-slate-400' />
                    </div>
                  </PostItem>
                </button>
              ))}
            </ul>
            <footer className='flex self-end'>
              <p className='hidden text-sm text-slate-400 sm:block'>
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
