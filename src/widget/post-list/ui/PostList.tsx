'use client';

import { usePostStore } from '@/entity/post/model/post.store'; // index를 통해서 불러오면, fs를 사용하는 모듈까지 불러와서 문제가 생김
import PostCard from '@/entity/post/ui/PostCard';
import { useEffect } from 'react';

export default function PostList() {
  const posts = usePostStore((state) => state.posts);
  const setPosts = usePostStore((state) => state.setPosts);

  const query = usePostStore((state) => state.query);
  const filteredPosts = posts.filter((post) => post.title.includes(query));

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data.posts));
  }, []);

  return (
    <div className='grid w-full grid-cols-1 gap-6 sm:grid-cols-2'>
      {filteredPosts.map((post) => (
        <PostCard key={post.title} title={post.title} thumbnail={post.thumbnail} date={post.date} />
      ))}
    </div>
  );
}
