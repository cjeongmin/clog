import Image from 'next/image';

interface PhotoGridProps {
  photos: string[];
}

export function PhotoGrid({ photos }: PhotoGridProps) {
  return (
    <div className='m-1 grid h-full w-full grid-cols-1 gap-1 md:grid-cols-2'>
      {photos.map((photo, index) => {
        const isLastAndOdd = index === photos.length - 1 && photos.length % 2 === 1;
        return (
          <div
            key={photo + index}
            className={`relative m-0 h-64 w-full rounded-md border ${isLastAndOdd ? 'md:col-span-2' : ''}`}
          >
            <Image
              src={photo}
              fill
              className='m-0 rounded-md object-cover'
              alt={`Photo ${index + 1}`}
              sizes='(max-width: 768px) 100vw, 50vw'
            />
          </div>
        );
      })}
    </div>
  );
}
