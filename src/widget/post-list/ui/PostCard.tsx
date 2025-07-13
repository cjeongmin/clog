'use client';

import Link from 'next/link';

import { Post } from '@/entity/post';
import PostItem from '@/entity/post/ui/PostItem';

export default function PostCard({ post }: Readonly<{ post: Post }>) {
  return (
    <Link
      className='transition-all duration-fast hover:scale-[1.005]'
      key={post.title}
      href={`/posts/${encodeURIComponent(post.fileName)}`}
    >
      <PostItem post={post}>
        <div className='flex min-h-[3rem] flex-col gap-1'>
          <PostItem.Title className='text-text-primary break-words break-keep text-xl font-semibold' />
          <PostItem.Date />
          <PostItem.Description className='text-text-secondary break-words break-keep' />
          <PostItem.Tags />
        </div>
      </PostItem>
    </Link>
  );
}
