import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Sidebar from "../components/Sidebar";
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Sidebar />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default App;
