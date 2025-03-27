import PostCard from '@/widget/post-list/ui/PostCard';
import { getPosts } from '@/feature/get-posts';

export default function PostList() {
  const posts = getPosts();

  return (
    <div className='grid w-full grid-cols-1 gap-6 sm:grid-cols-2'>
      {posts.map((post) => (
        <PostCard key={post.title} post={post} />
      ))}
    </div>
  );
}
