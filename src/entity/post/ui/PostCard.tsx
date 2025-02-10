import Link from 'next/link';
import Image from 'next/image';

import { Post } from '../model/post.type';

export default function PostCard({
  title,
  thumbnail,
  date,
  fileName,
}: Pick<Post, 'title' | 'thumbnail' | 'date' | 'fileName'>) {
  return (
    <Link className='flex flex-col gap-2' key={title} href={`/posts/${encodeURIComponent(fileName)}`}>
      <div className='aspect-video h-48 rounded-md border p-[1px] sm:transition-all sm:hover:border-slate-400'>
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            priority={true}
            width={0}
            height={0}
            sizes='100vw'
            className='h-full w-full object-cover'
          />
        ) : (
          <div className='h-full w-full bg-gray-100' />
        )}
      </div>
      <div className='flex min-h-[3rem] flex-col gap-1 text-slate-600'>
        <h2 className='line-clamp-2'>{title}</h2>
        <span className='text-sm text-slate-400'>{date}</span>
      </div>
    </Link>
  );
}
