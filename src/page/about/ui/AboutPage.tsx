'use client';

import { useAlertStore } from '@/feature/alert';
import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';

export default function AboutPage() {
  const router = useRouter();

  const show = useAlertStore((state) => state.show);

  useLayoutEffect(() => {
    show({
      type: 'info',
      message: '페이지 작성 중입니다!',
      confirm: () => router.push('/'),
    });
  }, [show, router]);

  return <div></div>;
}
