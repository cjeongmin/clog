import { Post } from '@/entity/post';
import { getPosts } from '@/feature/get-posts';
import Link from 'next/link';

function PostCard({ title, thumbnail }: Pick<Post, 'title' | 'thumbnail'>) {
  return (
    <Link
      className='flex flex-col gap-2 transition-all hover:scale-105'
      key={title}
      href={`/posts/${encodeURIComponent(title)}`}
    >
      <div className='aspect-video h-48 border'>
        {thumbnail ? (
          <img src={thumbnail} alt={title} className='h-full w-full object-cover' />
        ) : (
          <div className='h-full w-full bg-gray-100' />
        )}
      </div>
      <h2 className='line-clamp-2 min-h-[3rem] text-slate-600'>{title}</h2>
    </Link>
  );
}

export default async function Home() {
  const posts = getPosts();

  return (
    <div className='grid w-full grid-cols-2 gap-6'>
      {posts.map((post) => (
        <PostCard key={post.title} title={post.title} thumbnail={post.thumbnail} />
      ))}
    </div>
  );
}
