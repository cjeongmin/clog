import Script from 'next/script';

export default function GoogleAnalytics() {
  return (
    <>
      <Script src='https://www.googletagmanager.com/gtag/js?id=G-ETL2T0X211' strategy='afterInteractive' />
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ETL2T0X211');
        `}
      </Script>
    </>
  );
}
