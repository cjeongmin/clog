'use client';

import Link from 'next/link';

import { Post } from '@/entity/post';
import PostItem from '@/entity/post/ui/PostItem';

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link className='flex flex-col gap-2' key={post.title} href={`/posts/${encodeURIComponent(post.fileName)}`}>
      <PostItem post={post}>
        <div className='aspect-video h-48 rounded-md border p-[1px] sm:transition-all sm:hover:border-slate-400'>
          <PostItem.Thumbnail />
        </div>
        <div className='flex min-h-[3rem] flex-col gap-1 text-slate-600'>
          <PostItem.Title />
          <PostItem.Date />
        </div>
      </PostItem>
    </Link>
  );
}
