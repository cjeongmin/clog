import Image from "next/image";
import Link from "next/link";
import { ReactElement, useEffect } from "react";
import { PostType, usePostListState } from "../atoms/postListState";
import { getPostsSnapshot } from "../utils/firebase";

const Sidebar = (): ReactElement => {
  const [postList, setPostList] = usePostListState();

  useEffect(() => {
    (async () => {
      const snapshot = await getPostsSnapshot();
      let next: PostType[] = [];
      snapshot.forEach((doc) => {
        const { title, body, date } = doc.data();
        next.push({ id: doc.id, title, body, date: new Date(date) });
      });
      setPostList(next);
    })();
  }, []);

  return (
    <>
      <style jsx>{`
        .side-bar {
          min-height: 100%;
          min-width: 250px;
          background-color: rgba(0, 0, 0, 0.8);

          display: flex;
          flex-direction: column;

          color: white;
          margin-right: 2.5%;
        }

        .side-bar * {
          margin-top: 2%;
        }

        .center {
          margin: 0 auto 0 auto;
        }

        .text {
          font-family: "Fira code";
        }

        .post-list {
          margin: 0 auto 0 auto;
          height: 100%;
          overflow-y: auto;
        }

        .post-list div {
          margin-top: 10%;
        }

        hr {
          border: 0.5px solid rgba(255, 255, 255, 0.5);
          width: 100%;
        }
      `}</style>

      <div className="side-bar">
        <span className="text center">clog</span>
        <div className="profile center">
          <Link href="/">
            <a>
              <Image
                src="/profile.jpeg"
                width="100px"
                height="100px"
                layout="fixed"
              />
            </a>
          </Link>
        </div>
        <span className="text center">cjeongmin</span>
        <hr />
        <span className="text center">Recent posts.</span>
        <div className="post-list">
          {postList.map(({ id, title }) => (
            <Link href={`/posts/${id}`} key={id}>
              <a>
                <div className="post">{title}</div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
