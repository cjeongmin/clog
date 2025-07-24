export const dynamic = 'force-static';

import { Metadata, ResolvingMetadata } from 'next';
import '@/app/post.css';

import { getPost } from '@/feature/get-post';
import { PostPage } from '@/page/post';
import { getPosts } from '@/feature/get-posts';

export async function generateStaticParams() {
  const posts = getPosts();

  return posts.map((post) => ({
    postName: post.fileName,
  }));
}

interface Props {
  params: Promise<{ postName: string }>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const postName = (await params).postName;
  const { title } = getPost(postName);

  return {
    title,
    openGraph: {
      title,
    },
  };
}

export default async function Page({ params }: Props) {
  const postName = (await params).postName;

  const post = getPost(postName);

  return <PostPage post={post} />;
}
