import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

import { Alert } from '@/feature/alert';
import { CommandPalette } from '@/feature/command-palette';
import { GoogleAnalytics } from '@/feature/google-analytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | cjeongmin',
    default: 'cjeongmin',
  },
  description: 'A blog about cjeongmin',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko-kr' className='h-full w-full'>
      <head>
        <meta name='google-site-verification' content='ktuwDBkR2dZGl0nMI1lDu6kIdrkuAE-u8G8Gp5vwzS0' />
        <GoogleAnalytics />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github.min.css'
        />
        <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css' />
        <link
          rel='stylesheet'
          as='style'
          crossOrigin='anonymous'
          href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css'
        />
      </head>
      <body className={`${inter.className} h-full w-full overflow-auto font-sans`}>
        <div className='flex min-h-full flex-col gap-4'>
          <header className='mt-4 h-fit w-full px-4'>
            <div className='mx-auto h-full max-w-3xl'>
              <div className='flex h-full flex-row items-center justify-between'>
                <Link href='/' className='font-mono text-xl font-bold'>
                  @cjeongmin
                </Link>
                <nav className='mt-1 flex flex-row items-center gap-2'>
                  <Link href='/' className='mr-4 text-slate-600 hover:text-slate-900'>
                    Home
                  </Link>
                  <Link href='/about' className='mr-4 text-slate-600 hover:text-slate-900'>
                    About
                  </Link>
                  <CommandPalette />
                </nav>
              </div>
            </div>
          </header>

          <hr className='w-full' />

          <main className='flex-1 px-4'>
            <div className='mx-auto h-full max-w-3xl'>{children}</div>
          </main>

          <hr className='w-full' />

          <footer className='mb-4 h-8 w-full px-4'>
            <div className='mx-auto flex h-full max-w-3xl items-center justify-center'>
              <div className='text-sm text-gray-600'>© 2025 cjeongmin</div>
            </div>
          </footer>

          <Alert />
        </div>
      </body>
    </html>
  );
}
