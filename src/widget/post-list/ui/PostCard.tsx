'use client';

import Link from 'next/link';

import { Post } from '@/entity/post';
import PostItem from '@/entity/post/ui/PostItem';

export default function PostCard({ post }: Readonly<{ post: Post }>) {
  return (
    <Link
      className='transition-all duration-200 hover:scale-[1.005]'
      key={post.title}
      href={`/posts/${encodeURIComponent(post.fileName)}`}
    >
      <PostItem post={post}>
        <div className='flex min-h-[3rem] flex-col gap-1'>
          <PostItem.Title className='break-words break-keep text-xl font-semibold text-slate-800' />
          <PostItem.Date />
          <PostItem.Description className='break-words break-keep text-slate-500' />
          <PostItem.Tags />
        </div>
      </PostItem>
    </Link>
  );
}
