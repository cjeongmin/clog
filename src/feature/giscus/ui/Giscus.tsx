'use client';

import { useTheme } from '@/feature/theme';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function Giscus() {
  const ref = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement>(null);
  const { theme } = useTheme();
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  const sendThemeMessage = useCallback((targetTheme: string) => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');

    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        {
          giscus: {
            setConfig: {
              theme: targetTheme,
            },
          },
        },
        'https://giscus.app',
      );
      return true;
    }
    return false;
  }, []);

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
    scriptElem.setAttribute('data-theme', theme === 'light' ? 'light' : 'noborder_gray');
    scriptElem.setAttribute('data-lang', 'ko');

    ref.current.appendChild(scriptElem);
    scriptRef.current = scriptElem;

    const checkIframeLoaded = () => {
      const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
      if (iframe) {
        setIsIframeLoaded(true);
      } else {
        setTimeout(checkIframeLoaded, 100);
      }
    };

    setTimeout(checkIframeLoaded, 500);
  }, [theme]);

  useEffect(() => {
    const targetTheme = theme === 'light' ? 'light' : 'noborder_gray';

    if (isIframeLoaded) {
      const success = sendThemeMessage(targetTheme);

      if (!success) {
        setTimeout(() => sendThemeMessage(targetTheme), 100);
      }
    } else if (scriptRef.current) {
      scriptRef.current.setAttribute('data-theme', targetTheme);
    }
  }, [theme, isIframeLoaded, sendThemeMessage]);

  return <section ref={ref} />;
}
