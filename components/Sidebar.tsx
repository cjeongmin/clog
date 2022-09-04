import { collection, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import {
  useActivatedEditorState,
  useActivatedModalState,
} from "../atoms/activatedState";
import { usePostListState } from "../atoms/postListState";
import { deletePost, firestore } from "../utils/firebase";

const Sidebar = (): ReactElement => {
  const router = useRouter();
  const [postList, setPostList] = usePostListState();
  const [_, setActivatedModal] = useActivatedModalState();
  const [activatedEditor, setActivatedEditor] = useActivatedEditorState();
  const {
    route,
    query: { postId },
  } = router;

  const onRemove = async (postId: string) => {
    await deletePost(parseInt(postId));
    await router.push("/");
  };

  useEffect(() => {
    onSnapshot(
      collection(firestore, "posts"),
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const { body, title, date } = change.doc.data();
          const id = parseInt(change.doc.id);
          if (change.type === "added") {
            setPostList((prev) => prev.concat({ id, body, title, date }));
          } else if (change.type === "modified") {
          } else if (change.type === "removed") {
            setPostList((prev) => prev.filter((post) => post.id !== id));
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
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
        {route === "/posts/[postId]" ? (
          <>
            <button
              onClick={() => {
                onRemove(postId as string);
              }}
            >
              Delete
            </button>
          </>
        ) : (
          <></>
        )}
        {activatedEditor ? (
          <>
            <div className="buttons">
              <button onClick={() => setActivatedModal(true)}>Post</button>
              <div className="separator" />
              <button onClick={() => setActivatedEditor(false)}>Cancel</button>
            </div>
          </>
        ) : (
          <button onClick={() => setActivatedEditor(true)}>New Post</button>
        )}
      </nav>
    </>
  );
};

export default Sidebar;
