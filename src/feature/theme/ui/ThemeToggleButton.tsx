'use client';

import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';

import { useTheme } from './ThemeProvider';

export default function ThemeToggleButton() {
  const { theme, mounted, toggleTheme } = useTheme();

  if (!mounted) {
    return (
      <button disabled aria-label='Loading theme toggle' className='cursor-not-allowed opacity-60'>
        <div className='h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600' />
      </button>
    );
  }

  return (
    <button onClick={toggleTheme} aria-label='Toggle theme'>
      {theme === 'light' ? <IoMoonOutline size={20} /> : <IoSunnyOutline size={20} />}
    </button>
  );
}
