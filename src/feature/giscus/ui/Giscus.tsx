'use client';

import { useEffect, useRef } from 'react';

export default function Giscus() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const scriptElem = document.createElement('script');
    scriptElem.src = 'https://giscus.app/client.js';
    scriptElem.async = true;
    scriptElem.crossOrigin = 'anonymous';

    scriptElem.setAttribute('data-repo', 'cjeongmin/clog');
    scriptElem.setAttribute('data-repo-id', 'R_kgDONg5zXA');
    scriptElem.setAttribute('data-category', 'Comments');
    scriptElem.setAttribute('data-category-id', 'DIC_kwDONg5zXM4Cm80K');
    scriptElem.setAttribute('data-mapping', 'og:title');
    scriptElem.setAttribute('data-strict', '0');
    scriptElem.setAttribute('data-reactions-enabled', '1');
    scriptElem.setAttribute('data-emit-metadata', '0');
    scriptElem.setAttribute('data-input-position', 'bottom');
    scriptElem.setAttribute('data-theme', 'light');
    scriptElem.setAttribute('data-lang', 'ko');

    ref.current.appendChild(scriptElem);
  });

  return <section ref={ref} />;
}
