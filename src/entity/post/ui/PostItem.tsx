'use client';

import Image from 'next/image';
import { createContext, PropsWithChildren, use } from 'react';

import { Post } from '../model/post.type';

interface PostItemProps {
  post: Post;
}

const PostItemContext = createContext<PostItemProps | undefined>(undefined);

const usePostItemContext = () => {
  const context = use(PostItemContext);
  if (!context) {
    throw new Error('PostItemContext must be used within a PostItem');
  }
  return context;
};

function PostItem({ post, children }: PropsWithChildren<Readonly<PostItemProps>>) {
  return <PostItemContext value={{ post }}>{children}</PostItemContext>;
}

PostItem.Thumbnail = function Thumbnail() {
  const { post } = usePostItemContext();
  if (post.thumbnail == null) {
    return <div className='h-full w-full bg-gray-100' />;
  }
  return (
    <Image
      src={post.thumbnail}
      alt={post.title}
      priority={true}
      width={0}
      height={0}
      sizes='100vw'
      className='h-full w-full object-cover'
    />
  );
};

PostItem.Title = function Title({ className }: { className?: string }) {
  const { post } = usePostItemContext();
  return <h1 className={className ?? 'line-clamp-2'}>{post.title}</h1>;
};

PostItem.Date = function Date({ className }: { className?: string }) {
  const { post } = usePostItemContext();
  return <span className={className ?? 'text-text-muted text-sm'}>{post.date}</span>;
};

PostItem.Tags = function Tags({ className }: { className?: string }) {
  const { post } = usePostItemContext();

  if (post.tags == null || post.tags.length === 0) {
    return null;
  }

  return (
    <div className={className ?? 'flex flex-wrap gap-1'}>
      {post.tags.map((tag) => (
        <span key={tag} className='bg-surface-muted text-text-secondary rounded px-2 py-1 text-xs font-medium'>
          {tag}
        </span>
      ))}
    </div>
  );
};

PostItem.Description = function Description({ className }: { className?: string }) {
  const { post } = usePostItemContext();

  if (!post.description) {
    return null;
  }

  return <p className={className ?? 'text-text-secondary'}>{post.description}</p>;
};

export default PostItem;
