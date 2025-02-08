import { TableOfContents } from '@/widget/table-of-contents';

import Markdown from './Markdown';

interface PostPageProps {
  post: {
    title: string;
    content: string;
    date?: string;
  };
  markdown: {
    value: unknown;
  };
}

export default function PostPage({ post, markdown }: PostPageProps) {
  return (
    <section className='flex w-full flex-row'>
      <div className='w-full max-w-3xl'>
        <header className='flex flex-col gap-2 text-slate-800'>
          <h1 className='text-3xl font-bold'>{post.title}</h1>
          <p className='text-sm text-slate-500'>{post.date}</p>
        </header>
        <hr className='my-4 w-full' />
        <Markdown content={markdown.value as string} />
      </div>
      <aside className='hidden xl:block'>
        <TableOfContents className='sticky top-4 ml-8 max-h-[calc(100vh-2rem)] overflow-auto' content={post.content} />
      </aside>
    </section>
  );
}
