import type { GetServerSideProps } from "next";
import { useActivatedEditorState } from "../../atoms/activatedState";
import { PostType } from "../../atoms/postListState";
import { getPost } from "../../utils/firebase";

const Main = ({ body }: { body: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: body }}></div>;
};

const Post = ({ title, body, date }: PostType) => {
  const [activatedEditor, _] = useActivatedEditorState();

  return (
    <>
      <style jsx>{`
        .post {
          display: flex;
          min-height: 100%;
          flex-direction: column;
        }
      `}</style>

      {!activatedEditor ? (
        <div className="post">
          <h1>{title}</h1>
          <h5>{date}</h5>
          <Main body={body} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const postId = context.params?.postId;
  if (postId === undefined || Array.isArray(postId)) {
    return {
      notFound: true,
    };
  }

  const post = await getPost(postId);
  if (!post) {
    return {
      notFound: true,
    };
  }

  const { title, body, date } = post;

  return {
    props: {
      title,
      body,
      date: new Date(date.seconds * 1000).toLocaleString(),
    },
  };
};

export default Post;
