import PostCard from '@/entity/post/ui/PostCard';
import { getPosts } from '@/feature/get-posts';

export default function PostList() {
  const posts = getPosts();

  return (
    <div className='grid w-full grid-cols-1 gap-6 sm:grid-cols-2'>
      {posts.map((post) => (
        <PostCard
          key={post.title}
          title={post.title}
          thumbnail={post.thumbnail}
          date={post.date}
          fileName={post.fileName}
        />
      ))}
    </div>
  );
}
