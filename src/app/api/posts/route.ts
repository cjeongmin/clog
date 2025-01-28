import { getPosts } from '@/feature/get-posts';
import { NextResponse } from 'next/server';

export async function GET() {
  const posts = getPosts();
  return NextResponse.json({ posts });
}
