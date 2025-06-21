'use client';

import { useState, useEffect, useCallback, TouchEvent } from 'react';
import Image from 'next/image';

interface CarouselProps {
  photos: string[];
  autoSlideInterval?: number;
}

export function Carousel({ photos, autoSlideInterval = 5000 }: Readonly<CarouselProps>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [resetTimer, setResetTimer] = useState(0);

  const minSwipeDistance = 50;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1));
    setResetTimer(Date.now());
  }, [photos.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1));
    setResetTimer(Date.now());
  }, [photos.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setResetTimer(Date.now());
  };

  const handleTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1));
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [resetTimer, photos.length, autoSlideInterval]);

  if (!photos || photos.length === 0) {
    return (
      <div className='bg-surface-placeholder flex h-48 w-full items-center justify-center md:h-64'>
        이미지가 없습니다
      </div>
    );
  }

  return (
    <div className='relative m-1 h-48 w-full overflow-hidden rounded-md border md:h-64'>
      <div
        className='flex h-full w-full transition-transform duration-500 ease-out'
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {photos.map((photo, index) => (
          <div key={`${index}-${photo}`} className='relative m-0 h-full w-full flex-shrink-0'>
            <Image
              src={photo}
              alt={`슬라이드 ${index}`}
              fill
              className='m-0 object-cover'
              draggable={false}
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      <div className='absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 space-x-2'>
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`border-border-secondary h-2.5 w-2.5 rounded-full border transition-all duration-300 ${
              currentIndex === index
                ? 'bg-surface-primary ring-ring scale-110 shadow-[0_0_8px_rgba(255,255,255,0.8)] ring-1'
                : 'bg-white/60 shadow-sm hover:bg-white/80'
            }`}
            aria-label={`슬라이드 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </div>
  );
}
