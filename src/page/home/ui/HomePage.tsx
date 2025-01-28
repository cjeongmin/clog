'use client';

import { SearchPost } from '@/feature/search-post';
import { PostList } from '@/widget/post-list';

export default function HomePage() {
  return (
    <div className='flex w-full flex-col gap-4'>
      <SearchPost />
      <PostList />
    </div>
  );
}
