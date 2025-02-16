import { useRouter } from 'next/navigation';

import { Post } from '@/entity/post';

interface PostItemProps {
  post: Post;
  onClick: () => void;
}

export default function PostItem({ post, onClick }: PostItemProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/posts/${post.fileName}`);
    onClick();
  };

  return (
    <button
      className='flex w-full flex-row items-end gap-2 rounded-md border p-3 sm:transition-all sm:hover:border-slate-400'
      onClick={handleClick}
    >
      <div className='flex w-full flex-row items-center gap-2'>
        <h3 className='truncate text-base text-slate-600'>{post.title}</h3>
        <p className='whitespace-nowrap text-sm text-slate-400'>{post.date}</p>
      </div>
    </button>
  );
}
