import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/page/**/*.{js,ts,jsx,tsx,mdx}',
    './src/widget/**/*.{js,ts,jsx,tsx,mdx}',
    './src/feature/**/*.{js,ts,jsx,tsx,mdx}',
    './src/entity/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        overlay: 'var(--color-overlay)',
        ring: 'var(--color-ring)',

        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          'on-accent': 'var(--color-text-on-accent)',
        },

        border: {
          primary: 'var(--color-border-primary)',
          secondary: 'var(--color-border-secondary)',
          accent: 'var(--color-border-accent)',
          'interactive-hover': 'var(--color-border-interactive-hover)',
        },

        surface: {
          primary: 'var(--color-surface-primary)',
          secondary: 'var(--color-surface-secondary)',
          muted: 'var(--color-surface-muted)',
          placeholder: 'var(--color-surface-placeholder)',
        },

        interactive: {
          'primary-bg': 'var(--color-interactive-primary-bg)',
          'primary-bg-hover': 'var(--color-interactive-primary-bg-hover)',
          'secondary-bg': 'var(--color-interactive-secondary-bg)',
          'secondary-bg-hover': 'var(--color-interactive-secondary-bg-hover)',
        },
      },
      fontFamily: {
        sans: ['Pretendard Variable', 'sans-serif'],
      },
      transitionDuration: {
        'fast': '200ms',
        'medium': '300ms',
        'slow': '500ms',
      },
      translate: {
        'header-hide': '-60px',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--color-text-secondary)',
            '--tw-prose-headings': 'var(--color-text-primary)',
            '--tw-prose-lead': 'var(--color-text-secondary)',
            '--tw-prose-links': 'var(--color-text-primary)',
            '--tw-prose-bold': 'var(--color-text-primary)',
            '--tw-prose-counters': 'var(--color-text-muted)',
            '--tw-prose-bullets': 'var(--color-text-muted)',
            '--tw-prose-hr': 'var(--color-border-primary)',
            '--tw-prose-quotes': 'var(--color-text-secondary)',
            '--tw-prose-quote-borders': 'var(--color-border-accent)',
            '--tw-prose-captions': 'var(--color-text-muted)',
            '--tw-prose-code': 'var(--color-text-primary)',
            '--tw-prose-pre-code': 'var(--color-text-secondary)',
            '--tw-prose-pre-bg': 'var(--color-surface-muted)',
            '--tw-prose-th-borders': 'var(--color-border-primary)',
            '--tw-prose-td-borders': 'var(--color-border-primary)',
          },
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config;
