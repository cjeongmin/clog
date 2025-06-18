import PostCard from '@/widget/post-list/ui/PostCard';
import { getPosts } from '@/feature/get-posts';

export default function PostList() {
  const posts = getPosts();

  return (
    <div className='mt-4 grid w-full grid-cols-1 gap-8'>
      {posts.map((post) => (
        <PostCard key={post.title} post={post} />
      ))}
    </div>
  );
}
