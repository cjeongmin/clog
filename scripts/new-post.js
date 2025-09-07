#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function sanitizeFilename(filename) {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
}

function createFrontmatter(title, description, tags) {
  const today = formatDate(new Date());

  let frontmatter = `---
title: '${title}'
date: '${today}'
draft: true`;

  if (description) {
    frontmatter += `\ndescription: '${description}'`;
  }

  if (tags && tags.length > 0) {
    frontmatter += `\ntags: [${tags.map((tag) => `'${tag.trim()}'`).join(', ')}]`;
  }

  frontmatter += '\n---\n\n';

  return frontmatter;
}

async function main() {
  try {
    console.log('Creating a new post...\n');

    const filename = await prompt('filename: ');
    if (!filename.trim()) {
      console.log('Filename is required.');
      rl.close();
      return;
    }

    const title = await prompt('title: ');
    if (!title.trim()) {
      console.log('Title is required.');
      rl.close();
      return;
    }

    const description = await prompt('description (optional): ');
    const tagsInput = await prompt('tags (comma-separated, optional): ');

    const tags = tagsInput
      ? tagsInput
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag)
      : [];

    const finalFilename = sanitizeFilename(filename);
    const postPath = path.join(__dirname, '..', 'post', `${finalFilename}.mdx`);

    if (fs.existsSync(postPath)) {
      console.log(`File already exists: ${finalFilename}.mdx`);
      rl.close();
      return;
    }

    const frontmatter = createFrontmatter(title, description, tags);
    const content = frontmatter + `# ${title}\n\nWrite your post content here.\n`;

    fs.writeFileSync(postPath, content, 'utf8');

    console.log(`\nNew post created successfully!`);
    console.log(`File path: post/${finalFilename}.mdx`);
    console.log(`Title: ${title}`);
    console.log(`Date: ${formatDate(new Date())}`);
    console.log(`Status: draft`);
  } catch (error) {
    console.error('Error creating post:', error.message);
  } finally {
    rl.close();
  }
}

main();
