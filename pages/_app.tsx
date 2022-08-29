import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot, useRecoilState } from "recoil";
import Sidebar from "../components/Sidebar";

function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Sidebar />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default App;
