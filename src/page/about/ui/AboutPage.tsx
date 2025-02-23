'use client';

import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';

import { useAlertStore } from '@/feature/alert';

export default function AboutPage() {
  const router = useRouter();

  const show = useAlertStore((state) => state.show);
  const hide = useAlertStore((state) => state.hide);

  useLayoutEffect(() => {
    show({
      type: 'info',
      message: '페이지 작성 중입니다!',
      confirm: () => router.push('/'),
    });

    return () => hide();
  }, [show, hide, router]);

  return <div></div>;
}
