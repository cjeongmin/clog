import type { GetServerSideProps } from "next";
import { getPost } from "../../utils/firebase";

const Body = ({ body }: { body: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: body }} />;
};

const Post = ({
  title,
  body,
  date,
}: {
  title: string;
  body: string;
  date: string;
}) => {
  return (
    <>
      <style jsx>{`
        .post {
          display: flex;
          min-height: 90%;
          flex-direction: column;
          margin: 5%;
          padding: 5%;
          box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        }

        .head {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .head > h1 {
          margin: 0 auto 0 auto;
        }

        hr {
          width: 100%;
        }
      `}</style>

      <article className="post">
        <div className="head">
          <h1>{title}</h1>
          <h5>{date}</h5>
        </div>
        <hr />
        <Body body={body} />
      </article>
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

  const getKST = (seconds: number) => {
    const curr = new Date(seconds * 1000);
    const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const kr_curr = new Date(utc + KR_TIME_DIFF);
    return kr_curr;
  };

  const { title, body, date } = post;
  return {
    props: {
      title,
      body,
      date: getKST(date.seconds).toLocaleString(),
    },
  };
};

export default Post;
