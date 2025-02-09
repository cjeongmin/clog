import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [
            { pattern: 'app/**', group: 'internal', position: 'before' },
            { pattern: 'page/**', group: 'internal', position: 'before' },
            { pattern: 'widget/**', group: 'internal', position: 'before' },
            { pattern: 'feature/**', group: 'internal', position: 'before' },
            { pattern: 'entity/**', group: 'internal', position: 'before' },
            { pattern: 'shared/**', group: 'internal', position: 'before' },
          ],
          pathGroupsExcludedImportTypes: ['builtin', 'external'],
          'newlines-between': 'always',
        },
      ],
    },
  },
];

export default eslintConfig;
