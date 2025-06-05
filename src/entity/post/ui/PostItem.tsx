'use client';

import Image from 'next/image';
import { createContext, PropsWithChildren, useContext } from 'react';

import { Post } from '../model/post.type';

interface PostItemProps {
  post: Post;
}

const PostItemContext = createContext<PostItemProps | undefined>(undefined);

const usePostItemContext = () => {
  const context = useContext(PostItemContext);
  if (!context) {
    throw new Error('PostItemContext must be used within a PostItem');
  }
  return context;
};

function PostItem({ post, children }: PropsWithChildren<Readonly<PostItemProps>>) {
  return <PostItemContext value={{ post }}>{children}</PostItemContext>;
}

function Thumbnail() {
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
}

function Title({ className }: { className?: string }) {
  const { post } = usePostItemContext();
  return <h1 className={className ?? 'line-clamp-2'}>{post.title}</h1>;
}

function Date({ className }: { className?: string }) {
  const { post } = usePostItemContext();
  return <span className={className ?? 'text-sm text-slate-400'}>{post.date}</span>;
}

PostItem.Thumbnail = Thumbnail;
PostItem.Title = Title;
PostItem.Date = Date;

export default PostItem;
