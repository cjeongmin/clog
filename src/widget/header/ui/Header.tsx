'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

import { Post } from '@/entity/post';
import { CommandPalette } from '@/feature/command-palette';
import { ThemeToggleButton, useTheme } from '@/feature/theme';

interface HeaderProps {
  posts: Post[];
}

export default function Header({ posts }: Readonly<HeaderProps>) {
  const { theme } = useTheme();

  const [isScrolled, setIsScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const lastScrollYRef = useRef(0);
  const [showHeader, setShowHeader] = useState(true);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      const scrollingDown = scrollTop > lastScrollYRef.current;
      const scrollingUp = scrollTop < lastScrollYRef.current;

      setIsScrolled(scrollTop > 16);

      if (scrollTop <= 16) {
        setShowHeader(true);
      } else if (scrollingUp) {
        setShowHeader(true);
      } else if (scrollingDown && scrollTop > 100) {
        setShowHeader(false);
      }

      lastScrollYRef.current = scrollTop;

      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const calculatedProgress = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, calculatedProgress)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 h-fit w-full px-4 py-4 backdrop-blur ${!showHeader ? '-translate-y-[60px]' : 'translate-y-0'} transition-transform duration-200 ease-in-out`}
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
