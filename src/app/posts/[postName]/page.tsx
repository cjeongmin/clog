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
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import { getPost } from '@/feature/get-post';
import { PostPage } from '@/page/post';

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

export default async function Page({ params }: Props) {
  const postName = (await params).postName;

  const post = getPost(postName);

  const markdown = await unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .use(rehypeHighlight)
    .use(rehypeKatex)
    .use(rehypeHighlightCodeLines, {
      showLineNumbers: true,
    })
    .process(post.content);

  return <PostPage post={post} markdown={markdown} />;
}
