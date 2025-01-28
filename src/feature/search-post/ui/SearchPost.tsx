'use client';

import { usePostStore } from '@/entity/post/model/post.store';

export default function SearchPost() {
  const query = usePostStore((state) => state.query);
  const setQuery = usePostStore((state) => state.setQuery);

  return (
    <input
      value={query}
      placeholder='검색어를 입력하세요'
      onChange={(e) => setQuery(e.target.value)}
      className='w-full rounded-md border p-2 text-slate-500 focus:outline-1 focus:outline-slate-400'
    />
  );
}
