import { MetadataRoute } from 'next';

import { Post } from '@/entity/post';
import { getPosts } from '@/feature/get-posts';

export const dynamic = 'force-static';
export const revalidate = false;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cjeongmin.github.io';

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  const posts = getPosts();
  const postPages = posts.map((post: Post) => ({
    url: `${baseUrl}/posts/${post.fileName.replace('.mdx', '')}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...postPages];
}
