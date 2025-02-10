import { MetadataRoute } from 'next';

import { getPosts } from '@/feature/get-posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();

  const routes = posts.map((post) => ({
    url: `https://cjeongmin.vercel.app/posts/${post.fileName}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  return [
    {
      url: 'https://cjeongmin.vercel.app/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://cjeongmin.vercel.app/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...routes,
  ];
}
