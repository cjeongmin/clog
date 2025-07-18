import type { Metadata } from 'next';
import './globals.css';

import { Alert, AlertProvider } from '@/feature/alert';
import { getPosts } from '@/feature/get-posts';
import { GoogleAnalytics } from '@/feature/google-analytics';
import { HighlightJSTheme, ThemeProvider, ThemeScript } from '@/feature/theme';
import { Header } from '@/widget/header';

export const metadata: Metadata = {
  title: {
    template: '%s | cjeongmin',
    default: 'cjeongmin',
  },
  description: 'A blog by cjeongmin',
  openGraph: {
    title: 'cjeongmin',
    description: 'A blog by cjeongmin',
    url: 'https://cjeongmin.github.io',
    siteName: 'cjeongmin',
    images: [
      {
        url: 'https://cjeongmin.github.io/favicon.ico',
        width: 1200,
        height: 630,
        alt: 'cjeongmin blog',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const posts = getPosts();

  return (
    <html lang='ko-kr' className='h-full w-full' suppressHydrationWarning>
      <head>
        <meta name='google-site-verification' content='ktuwDBkR2dZGl0nMI1lDu6kIdrkuAE-u8G8Gp5vwzS0' />
        <GoogleAnalytics />
        <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css' />
        <link
          rel='stylesheet'
          as='style'
          crossOrigin='anonymous'
          href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css'
        />
        <ThemeScript />
      </head>
      <AlertProvider>
        <body className='h-full w-full overflow-auto font-sans'>
          <ThemeProvider>
            <HighlightJSTheme />
            <div className='flex min-h-full flex-col gap-4'>
              <Header posts={posts} />

              <main className='flex-1 px-4'>
                <div className='mx-auto h-full max-w-3xl'>{children}</div>
              </main>

              <hr className='w-full border-t-[0.5px] border-border-primary' />

              <footer className='mb-4 h-8 w-full px-4'>
                <div className='mx-auto flex h-full max-w-3xl items-center justify-center'>
                  <div className='text-sm text-text-muted'>© 2025 cjeongmin</div>
                </div>
              </footer>

              <Alert />
            </div>
          </ThemeProvider>
        </body>
      </AlertProvider>
    </html>
  );
}
