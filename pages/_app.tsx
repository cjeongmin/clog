import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Sidebar from "../components/Sidebar";
import "../styles/globals.css";
import Header from "../components/Header";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx>{`
        main {
          width: 100%;
          min-height: 100%;
          overflow-y: auto;
        }
      `}</style>

      <Header />
      <RecoilRoot>
        <Sidebar />
        <main>
          <Component {...pageProps} />
        </main>
      </RecoilRoot>
    </>
  );
}

export default App;
