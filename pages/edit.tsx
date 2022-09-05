import { EditorState } from "draft-js";
import { useEffect } from "react";
import { useActivatedModalState } from "../atoms/activatedState";
import { useEditorState } from "../atoms/editorState";
import Modal from "../components/Modal";
import PostEditor from "../components/PostEditor";

const Edit = () => {
  const [_, setEditor] = useEditorState();
  useEffect(() => {
    setEditor(EditorState.createEmpty());
  }, []);

  const [activatedModal] = useActivatedModalState();
  return (
    <>
      {activatedModal && <Modal />}
      <PostEditor />
    </>
  );
};

export default Edit;
