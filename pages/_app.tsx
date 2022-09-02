import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Modal from "../components/Modal";
import PostEditor from "../components/PostEditor";
import Sidebar from "../components/Sidebar";
import "../styles/globals.css";

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

      <RecoilRoot>
        <Sidebar />
        <main>
          <Component {...pageProps} />
          <PostEditor />
          <Modal />
        </main>
      </RecoilRoot>
    </>
  );
}

export default App;
