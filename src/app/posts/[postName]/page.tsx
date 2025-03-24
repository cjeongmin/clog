import { Metadata, ResolvingMetadata } from 'next';
import './post.css';

import { getPost } from '@/feature/get-post';
import { PostPage } from '@/page/post';

type Props = {
  params: Promise<{ postName: string }>;
};

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
