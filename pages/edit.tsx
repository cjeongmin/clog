import { convertFromHTML } from "draft-convert";
import { EditorState } from "draft-js";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useActivatedModalState } from "../atoms/activatedState";
import { useEditorState } from "../atoms/editorState";
import Modal from "../components/Modal";
import PostEditor from "../components/PostEditor";
import { getPost } from "../utils/firebase";

const Edit = ({
  body,
  title,
}: {
  body: string | null;
  title: string | null;
}) => {
  const [_, setEditor] = useEditorState();

  useEffect(() => {
    if (body) {
      setEditor(EditorState.createWithContent(convertFromHTML(body)));
    } else {
      setEditor(EditorState.createEmpty());
    }
  }, []);

  const [activatedModal] = useActivatedModalState();
  return (
    <>
      {activatedModal && <Modal postTitle={title} />}
      <PostEditor />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;
  if (id === undefined || Array.isArray(id)) {
    return {
      props: { title: null, body: null },
    };
  }

  const post = await getPost(id);
  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: { title: post.title, body: post.body },
  };
};

export default Edit;
