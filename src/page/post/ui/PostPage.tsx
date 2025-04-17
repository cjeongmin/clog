import { getPostMDX } from '@/feature/get-post';
import { Giscus } from '@/feature/giscus';
import { TableOfContents } from '@/widget/table-of-contents';
import { PostAnchorProvider } from '@/entity/post-anchor';

import Markdown from './Markdown';

import './post-page.css';

interface PostPageProps {
  post: {
    fileName: string;
    title: string;
    content: string;
    date?: string;
  };
}

export default async function PostPage({ post }: PostPageProps) {
  const MDXPost = await getPostMDX(post.fileName);

  return (
    <PostAnchorProvider>
      <section className='relative flex w-full flex-row'>
        <div className='w-full max-w-3xl'>
          <header className='flex flex-col gap-2 text-slate-800'>
            <h1 className='text-3xl font-bold'>{post.title}</h1>
            <p className='text-sm text-slate-500'>{post.date}</p>
          </header>
          <hr className='my-8 w-full' />
          <Markdown>
            <MDXPost />
          </Markdown>
          <hr className='my-8 w-full' />
          <Giscus />
        </div>
        <aside className='absolute left-full hidden w-64 xl:block'>
          <TableOfContents
            className='sticky top-4 ml-8 max-h-[calc(100vh-2rem)] overflow-auto'
            content={post.content}
          />
        </aside>
      </section>
    </PostAnchorProvider>
  );
}
