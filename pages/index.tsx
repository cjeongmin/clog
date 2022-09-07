import type { NextPage } from "next";
import { useRouter } from "next/router";
import { PostType, usePostListState } from "../atoms/postListState";

const PostItem = ({ id, title, body, date }: PostType) => {
  const router = useRouter();

  const onClick = () => {
    router.push({ pathname: `/posts/${id}` });
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const MAX_LENGTH = 100;
  const filtered = stripHtml(body);

  return (
    <>
      <style jsx>{`
        .post-item {
          max-height: 200px;
          min-height: 200px;
          max-width: 250px;
          width: 85%;
          height: 85%;

          display: flex;
          flex-direction: column;
          cursor: pointer;
          padding-top: 5%;
          padding-left: 3%;

          background-color: #fdfdfd;
          box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
          border-radius: 10%;

          transition: transform 0.2s;
        }

        .post-item:hover {
          transform: scale(1.05);
        }

        .post-item > span {
          margin-left: 5%;
        }

        .title {
          font-size: 1.175rem;
          align-self: start;
        }

        .date {
          font-size: 0.7rem;
          margin-bottom: 5%;
        }

        .body {
          font-size: 0.75rem;
          margin-right: 5%;
          overflow-y: hidden;
        }
      `}</style>

      <div className="post-item" onClick={onClick}>
        <span className="title">{title}</span>
        <span className="date">
          {new Date(date.seconds * 1000).toLocaleDateString()}
        </span>
        <span className="body">
          {filtered.length > MAX_LENGTH
            ? filtered.slice(0, MAX_LENGTH - 3) + "..."
            : filtered}
        </span>
      </div>
    </>
  );
};

const Home: NextPage = () => {
  const [postList] = usePostListState();
  return (
    <>
      <style jsx>{`
        .post-container {
          height: ${postList.length * 10}vh;

          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(auto, 1fr);
          justify-items: center;
          align-items: center;

          /* grid-row-gap: 1%;
          grid-column-gap: 1%; */
          grid-gap: 2% 1%;
        }

        @media (min-width: 1200px) {
          .post-container {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (min-width: 1400px) {
          .post-container {
            grid-template-columns: repeat(5, 1fr);
          }
        }
      `}</style>

      <div className="post-container">
        {postList.map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </div>
    </>
  );
};

export default Home;
