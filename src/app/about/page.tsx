import type { Metadata } from 'next';

import { AboutPage } from '@/page/about';

export const metadata: Metadata = {
  title: 'About',
  alternates: {
    canonical: '/about/',
  },
  openGraph: {
    title: 'About',
    description: 'A blog by cjeongmin',
    url: '/about/',
  },
};

export default async function Page() {
  return <AboutPage />;
}
