import Navbar from "@/components/navbar";
import RecoilRootProvider from "@/components/recoilRootProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import styles from "./styles/page.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "clog",
  description: "JM's blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko-kr">
      <head>
        {/* Noto Sans KR font & Nanum Gothic Coding */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding:wght@400;700&family=Noto+Sans+KR:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* hack font */}
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/hack-font@3.3.0/build/web/hack.css"
        ></link>
        {/* highlight.js */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css"
        />
        {/* MathJax */}
        <script
          type="text/javascript"
          id="MathJax-script"
          async
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
        ></script>
      </head>
      <body className={inter.className}>
        <div className={styles.container}>
          <header className={styles.header}>
            <Navbar />
          </header>
          <RecoilRootProvider>
            <main className={styles.main}>{children}</main>
          </RecoilRootProvider>
          <footer className={styles.footer}>
            <div className={styles.divider} />
            <p>© 2023 cjeongmin.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
