import '@/app/post.css';
import Image from 'next/image';

export default async function AboutPage() {
  const { default: About } = await import('./about.mdx');

  return (
    <div className='flex h-full flex-col gap-8'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>About</h1>
        <div className='prose -my-4 w-full !max-w-none break-words break-keep'>
          <About />
        </div>
        <div className='flex flex-row items-start gap-16'>
          <div className='flex flex-col gap-2 break-words break-keep'>
            <ul className='list-disc space-y-2 pl-4'>
              <li>
                저는 코드의 간결함과 명료함을 중요시합니다. 복잡한 문제를 간결함과 명료함으로 풀어내는 것을 즐깁니다.
              </li>
              <li>또한, 문제를 오래 논의하기보다는 빠르게 실행하고 직접 부딪히면서 배움을 얻는 편입니다.</li>
              <li>새로운 분야나 주제를 꾸준히 탐색하면서 스스로의 지속적으로 성장하기 위해 노력하고 있습니다.</li>
              <li>
                개인의 성장에서 멈추는 것이 아닌, 주도적으로 일하며 개인의 성장과 팀의 시너지를 함께 추구하고 있습니다.
              </li>
              <li>
                <div className='flex flex-col gap-2'>
                  <span>귀여운 고양이도 있답니다.</span>
                  <details className='group'>
                    <summary className='w-fit cursor-pointer select-none list-none transition-all duration-fast hover:font-medium'>
                      <span className='inline-flex items-center gap-1'>
                        <svg
                          className='h-4 w-4 transition-all duration-fast group-open:rotate-90 group-hover:stroke-2'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth={1.5}
                          viewBox='0 0 24 24'
                        >
                          <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
                        </svg>
                        모모
                      </span>
                    </summary>
                    <div className='mt-2'>
                      <Image
                        src='/momo.webp'
                        alt='모모'
                        priority={true}
                        width={200}
                        height={200}
                        className='h-auto w-auto max-w-60 rounded-lg object-cover shadow-md'
                      />
                    </div>
                  </details>
                </div>
              </li>
            </ul>
          </div>
          <div className='flex flex-grow flex-col gap-2'>
            <a
              href='https://github.com/cjeongmin'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 text-text-primary'
            >
              <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z' />
              </svg>
              GitHub
            </a>
            <a href='mailto:cjeongmin27@gmail.com' className='flex items-center gap-2 text-text-primary'>
              <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' />
              </svg>
              Email
            </a>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Career</h1>
        <ul className='list-disc pl-4'>
          <li>
            <div className='flex flex-col gap-1'>
              <a href='https://navercorp.com/' target='_blank' rel='noopener noreferrer' className='w-fit underline'>
                <strong>@Naver Corp</strong>
              </a>
              <div className='flex flex-col text-sm'>
                <p>Software Engineer</p>
                <p className='text-text-secondary'>2025.07 - Present</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
