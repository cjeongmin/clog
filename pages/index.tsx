import type { NextPage } from "next";
import { useActivatedEditorState } from "../atoms/activatedState";

const Home: NextPage = () => {
  const [activatedEditor, _] = useActivatedEditorState();
  return (
    <>
      {!activatedEditor ? (
        <div>
          <p>Index</p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Home;
