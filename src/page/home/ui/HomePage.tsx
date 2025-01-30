'use client';

import { PostList } from '@/widget/post-list';

export default function HomePage() {
  return (
    <div className='flex w-full flex-col gap-4'>
      <PostList />
    </div>
  );
}
