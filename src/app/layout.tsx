import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import styles from "./styles/page.module.css";
import Navbar from "@/components/navbar";

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <header className={styles.header}>
          <Navbar />
        </header>
        <div className={styles.container}>
          <main className={styles.main}>{children}</main>

          <footer className={styles.footer}>
            <div className={styles.divider} />
            <p>© 2023 cjeongmin. All Rights Reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
