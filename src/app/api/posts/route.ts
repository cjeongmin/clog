import { NextResponse } from 'next/server';

import { getPosts } from '@/feature/get-posts';

export async function GET() {
  const posts = getPosts();
  return NextResponse.json({ posts });
}
