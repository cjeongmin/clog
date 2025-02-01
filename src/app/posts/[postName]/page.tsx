import { getPost } from '@/feature/get-post';
import rehypeHighlight from 'rehype-highlight';
import rehypeHighlightCodeLines from 'rehype-highlight-code-lines';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import './post.css';
import { ResolvingMetadata, Metadata } from 'next';

type Props = {
  params: Promise<{ postName: string }>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const postName = (await params).postName;

  return {
    title: decodeURIComponent(postName),
  };
}

export default async function Page({ params }: { params: Promise<{ postName: string }> }) {
  const postName = (await params).postName;

  const post = getPost(postName);

  const markdown = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .use(rehypeHighlight)
    .use(rehypeHighlightCodeLines, {
      showLineNumbers: true,
    })
    .process(post.content);

  return (
    <section>
      <header className='flex flex-col gap-2 text-slate-800'>
        <h1 className='text-3xl font-bold'>{post.title}</h1>
        <p className='text-sm text-slate-500'>{post.date}</p>
      </header>
      <hr className='my-4 w-full' />
      <article className='prose' dangerouslySetInnerHTML={{ __html: markdown.value }}></article>
    </section>
  );
}
