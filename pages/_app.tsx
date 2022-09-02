import type { AppProps } from "next/app";
import { useState } from "react";
import { RecoilRoot } from "recoil";
import PostEditor from "../components/PostEditor";
import Sidebar from "../components/Sidebar";
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  const [activatedEditor, setActivatedEditor] = useState(false);

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
        <Sidebar
          activatedEditor={activatedEditor}
          editorHandler={setActivatedEditor}
        />
        <main>
          {activatedEditor ? <PostEditor /> : <Component {...pageProps} />}
        </main>
      </RecoilRoot>
    </>
  );
}

export default App;
