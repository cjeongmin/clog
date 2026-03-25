export const dynamic = 'force-static';

import { Metadata } from 'next';
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const postName = (await params).postName;
  const { title } = getPost(postName);
  const canonicalPath = `/posts/${postName}/` as const;

  return {
    title,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      url: canonicalPath,
    },
  };
}

export default async function Page({ params }: Props) {
  const postName = (await params).postName;

  const post = getPost(postName);

  return <PostPage post={post} />;
}
