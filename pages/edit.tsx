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
      <style jsx>{`
        .editor {
          margin: 2%;
          padding: 2%;
          box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
            rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
          height: 96%;
        }
      `}</style>

      {activatedModal && <Modal postTitle={title} />}
      <div className="editor">
        <PostEditor />
      </div>
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
