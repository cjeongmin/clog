import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import { useActivatedModalState } from "../atoms/activatedState";
import { useAdmin } from "../atoms/adminState";
import { usePostListState } from "../atoms/postListState";
import { deletePost, firestore } from "../utils/firebase";

const Buttons = (): ReactElement => {
  const router = useRouter();
  const [_, setActivatedModal] = useActivatedModalState();
  const {
    route,
    query: { postId },
  } = router;

  const onRemove = async (postId: string) => {
    await deletePost(parseInt(postId));
    await router.push("/");
  };

  return (
    <>
      <style jsx>{`
        .buttons {
          width: 100%;
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
          width: 100%;
        }

        button:hover {
          background-color: #222222;
        }

        .separator {
          min-width: 2px;
          max-width: 2px;
        }

        hr {
          margin: 0;
          border: 0.5px solid black;
          width: 100%;
        }
      `}</style>

      {route === "/posts/[postId]" ? (
        <>
          <div className="buttons">
            <button
              onClick={() => {
                (async () => {
                  await router.push({
                    pathname: "/edit",
                    query: { id: postId },
                  });
                })();
              }}
            >
              Update
            </button>
            <div className="separator" />
            <button onClick={() => onRemove(postId as string)}>Delete</button>
          </div>
          <hr />
        </>
      ) : (
        <></>
      )}
      {route === "/edit" ? (
        <div className="buttons">
          <button onClick={() => setActivatedModal(true)}>
            {router.query.id ? "Update" : "Post"}
          </button>
          <div className="separator" />
          <button onClick={() => router.back()}>Cancel</button>
        </div>
      ) : (
        <button
          onClick={() => {
            (async () => await router.push("/edit"))();
          }}
        >
          New Post
        </button>
      )}
    </>
  );
};

const Sidebar = (): ReactElement => {
  const [postList, setPostList] = usePostListState();
  const admin = useAdmin();

  useEffect(() => {
    const q = query(collection(firestore, "posts"), orderBy("date", "desc"));
    onSnapshot(
      q,
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const { body, title, date } = change.doc.data();
          const id = parseInt(change.doc.id);
          if (change.type === "added") {
            if (change.newIndex === 0) {
              setPostList((prev) => [{ id, body, title, date }, ...prev]);
              return;
            }
            setPostList((prev) => prev.concat({ id, body, title, date }));
          } else if (change.type === "modified") {
            setPostList((prev) =>
              prev.map((post) =>
                post.id !== id ? post : { ...post, title, body, date }
              )
            );
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
          display: flex;
          flex-direction: column;
          justift-content: flex-start;
          align-items: center;
          width: 100%;
          height: 100%;
          overflow-y: auto;
        }

        .post-list > a {
          max-height: 1rem;
          margin-top: 3%;
        }

        hr {
          border: 0.5px solid rgba(255, 255, 255, 0.5);
          width: 100%;
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
        <span
          className="text center"
          style={{
            textDecoration: "underline",
            textUnderlineOffset: "5px",
          }}
        >
          Recent posts
        </span>
        <div className="post-list">
          {postList.map(({ id, title }) => (
            <Link href={`/posts/${id}`} key={id}>
              <a>
                <span className="post">{title}</span>
              </a>
            </Link>
          ))}
        </div>
        {admin && <Buttons />}
      </nav>
    </>
  );
};

export default Sidebar;
