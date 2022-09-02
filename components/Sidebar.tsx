import Image from "next/image";
import Link from "next/link";
import { Dispatch, ReactElement, SetStateAction, useEffect } from "react";
import { PostType, usePostListState } from "../atoms/postListState";
import { getPostsSnapshot } from "../utils/firebase";

const Sidebar = ({
  activatedEditor,
  editorHandler,
  modalHandler,
}: {
  activatedEditor: boolean;
  editorHandler: Dispatch<SetStateAction<boolean>>;
  modalHandler: Dispatch<SetStateAction<boolean>>;
}): ReactElement => {
  const [postList, setPostList] = usePostListState();

  useEffect(() => {
    (async () => {
      const snapshot = await getPostsSnapshot();
      let next: PostType[] = [];
      snapshot.forEach((doc) => {
        const { title, body, date } = doc.data();
        next.push({
          id: parseInt(doc.id),
          title,
          body,
          date: new Date(date).toLocaleString(),
        });
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
        }

        .side-bar * {
          margin-top: 2%;
          flex: 1 1 auto;
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

        .buttons {
          display: flex;
        }

        button {
          background-color: #626262;
          color: white;
          border: none;
          cursor: pointer;
          transition: 0.2s;
          min-height: 40px;
          max-height: 40px;
        }

        button:hover {
          background-color: #222222;
        }

        .separator {
          max-width: 2px;
        }
      `}</style>

      <nav className="side-bar">
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
        {activatedEditor ? (
          <>
            <div className="buttons">
              <button onClick={() => modalHandler(true)}>Post</button>
              <div className="separator" />
              <button onClick={() => editorHandler(false)}>Cancel</button>
            </div>
          </>
        ) : (
          <button onClick={() => editorHandler(true)}>New Post</button>
        )}
      </nav>
    </>
  );
};

export default Sidebar;
