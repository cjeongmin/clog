'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Post } from '@/entity/post';
import { CommandPalette } from '@/feature/command-palette';
import { useScrollStatus } from '@/feature/scroll-observer';
import { ThemeToggleButton, useTheme } from '@/feature/theme';

interface HeaderProps {
  posts: Post[];
}

export default function Header({ posts }: Readonly<HeaderProps>) {
  const { theme } = useTheme();
  const { isScrolled, progress, showHeader } = useScrollStatus();

  const pathname = usePathname();

  return (
    <header
      className={`sticky top-0 z-40 h-fit w-full px-4 py-4 backdrop-blur ${pathname.startsWith('/posts') && !showHeader ? 'translate-y-header-hide' : 'translate-y-0'} transition-transform duration-fast ease-in-out`}
    >
      <div className='mx-auto h-full max-w-3xl'>
        <div className='flex h-full flex-row items-center justify-between'>
          <Link href='/' className='font-["Hack"] text-xl font-bold text-text-primary'>
            @cjeongmin
          </Link>
          <nav className='mt-1 flex flex-row items-center gap-4'>
            <Link href='/about' className='text-text-secondary hover:text-text-primary'>
              About
            </Link>
            <CommandPalette posts={posts} />
            <ThemeToggleButton />
          </nav>
        </div>
      </div>
      {pathname.startsWith('/posts') && isScrolled ? (
        <div className='absolute left-0 h-[0.5px] w-screen translate-y-4 bg-border-primary'>
          <div
            role='progressbar'
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            className={`h-full bg-gradient-to-r from-gray-500 ${theme === 'dark' ? 'to-white' : 'to-black'}`}
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      ) : (
        <hr className='absolute left-0 w-screen translate-y-4 border-t-[0.5px] border-border-primary' />
      )}
    </header>
  );
}
