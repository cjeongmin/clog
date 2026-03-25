import { MetadataRoute } from 'next';

import { Post } from '@/entity/post';
import { getPosts } from '@/feature/get-posts';
import { SITE_URL, toSiteUrl } from '@/shared/constants/site';

export const dynamic = 'force-static';
export const revalidate = false;

const toLastModified = (date: Date) => date.toISOString().replace(/\.\d{3}Z$/, 'Z');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    {
      url: `${SITE_URL}/`,
      lastModified: toLastModified(new Date()),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: toSiteUrl('/about/'),
      lastModified: toLastModified(new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  const posts = getPosts();
  const postPages = posts.map((post: Post) => ({
    url: toSiteUrl(`/posts/${post.fileName}/`),
    lastModified: toLastModified(post.date ? new Date(post.date) : new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...postPages];
}
