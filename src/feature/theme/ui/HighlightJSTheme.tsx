'use client';

import { useEffect } from 'react';
import { useTheme } from './ThemeProvider';

const HIGHLIGHT_THEME_ID = 'highlight-js-theme';

export default function HighlightJSTheme() {
  const { theme } = useTheme();

  useEffect(() => {
    const themeUrl =
      theme === 'dark'
        ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github-dark.min.css'
        : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github.min.css';

    let link = document.getElementById(HIGHLIGHT_THEME_ID) as HTMLLinkElement | null;

    if (link) {
      link.href = themeUrl;
    } else {
      link = document.createElement('link');
      link.id = HIGHLIGHT_THEME_ID;
      link.rel = 'stylesheet';
      link.href = themeUrl;
      document.head.appendChild(link);
    }
  }, [theme]);

  return null;
}
