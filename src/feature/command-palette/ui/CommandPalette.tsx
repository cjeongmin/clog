'use client';

import { usePostStore } from '@/entity/post/model/post.store';
import { useEffect, useRef, useState } from 'react';
import PostItem from './PostItem';
import { IoIosSearch } from 'react-icons/io';

export default function CommandPalette() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState('');

  const posts = usePostStore((state) => state.posts);
  const filteredPosts = posts.filter((post) => post.title.includes(query));

  const toggleVisible = () => {
    setQuery('');
    setVisible((prev) => !prev);
  };

  useEffect(() => {
    if (visible) {
      inputRef.current?.focus();
    }
  }, [visible]);

  useEffect(() => {
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
            className='flex h-[50dvh] w-[80dvw] flex-col gap-4 overflow-auto rounded-md bg-white p-4 sm:w-[50dvw]'
            onClick={(event) => event.stopPropagation()}
          >
            <div className='flex flex-row items-center border-b border-gray-300'>
              <IoIosSearch size={20} />
              <input
                ref={inputRef}
                type='text'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className='w-full p-2 text-sm text-slate-600 focus:outline-none'
              />
            </div>
            <div className='flex flex-row items-center gap-1 text-sm'>
              <p>게시글</p>
              <p className='text-slate-400'>{filteredPosts.length}</p>
            </div>
            <ul>
              {filteredPosts.map((post) => (
                <PostItem key={post.title} post={post} onClick={toggleVisible} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
