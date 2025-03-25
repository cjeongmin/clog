export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/';

  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  return `${basePath}${src.startsWith('/') ? src : `/${src}`}?w=${width}&q=${quality || 75}`;
}
