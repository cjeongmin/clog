import { Post } from '@/entity/post';
import { useRouter } from 'next/navigation';

interface PostItemProps {
  post: Post;
  onClick: () => void;
}

export default function PostItem({ post, onClick }: PostItemProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/posts/${post.title}`);
    onClick();
  };

  return (
    <div className='flex flex-row items-end gap-2 rounded-md border p-3' onClick={handleClick}>
      <h3 className='text-base text-slate-600'>{post.title}</h3>
      <p className='text-sm text-slate-400'>{post.date}</p>
    </div>
  );
}
