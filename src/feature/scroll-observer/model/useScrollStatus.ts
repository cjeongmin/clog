'use client';

import { useEffect, useRef, useState } from 'react';

import { SCROLL_CONFIG } from '@/shared/constants/animation';

export const useScrollStatus = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const lastScrollYRef = useRef(0);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      const scrollingDown = scrollTop > lastScrollYRef.current;
      const scrollingUp = scrollTop < lastScrollYRef.current;

      setIsScrolled(scrollTop > SCROLL_CONFIG.SCROLL_THRESHOLD);

      if (scrollTop <= SCROLL_CONFIG.SCROLL_THRESHOLD) {
        setShowHeader(true);
      } else if (scrollingUp) {
        setShowHeader(true);
      } else if (scrollingDown && scrollTop > SCROLL_CONFIG.HIDE_THRESHOLD) {
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

  return { isScrolled, progress, showHeader };
};
