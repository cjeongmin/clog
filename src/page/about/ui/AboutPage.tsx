'use client';

import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';

import { useAlertActionsContext } from '@/feature/alert';

export default function AboutPage() {
  const router = useRouter();

  const { showAlert: show, hideAlert: hide } = useAlertActionsContext();

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
