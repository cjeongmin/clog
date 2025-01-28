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

export default async function Page({ params }: { params: Promise<{ postName: string }> }) {
  const postName = (await params).postName;

  const file = getPost(postName);

  const post = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .use(rehypeHighlight)
    .use(rehypeHighlightCodeLines, {
      showLineNumbers: true,
    })
    .process(file.content);

  return <article className='prose' dangerouslySetInnerHTML={{ __html: post.value }}></article>;
}
