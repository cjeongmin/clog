import { useRouter } from "next/router";
import { ReactElement, useRef, useState } from "react";
import { useActivatedModalState } from "../atoms/activatedState";
import { useAdmin } from "../atoms/adminState";
import { getContent } from "../atoms/editorState";
import { getNextId } from "../atoms/postListState";
import { addPost, updatePost } from "../utils/firebase";

const Modal = ({ postTitle }: { postTitle: string | null }): ReactElement => {
  const router = useRouter();
  const [activatedModal, setActivatedModal] = useActivatedModalState();
  const [title, setTitle] = useState("");
  const mainRef = useRef<HTMLDivElement>(null);

  const id = getNextId();
  const body = getContent();

  const uploadPost = async () => {
    if (title === "") {
      return false;
    }

    await addPost({ id, title, body });
    setTitle("");
    setActivatedModal(false);
    await router.push(`/posts/${id}`);
    return true;
  };

  const update = async () => {
    const id = router.query.id as string;
    await updatePost({
      id,
      title: title === "" && typeof postTitle === "string" ? postTitle : title,
      body,
    });
    setTitle("");
    setActivatedModal(false);
    await router.push(`/posts/${id}`);
  };

  const cancel = () => {
    setTitle("");
    setActivatedModal(false);
  };

  const shakingAnimate = () => {
    if (mainRef.current === null) {
      return;
    }
    mainRef.current.animate(
      {
        transform: [
          "translate(-49%, -50%)",
          "translate(-51%, -50%)",
          "translate(-50%, -50%)",
        ],
      },
      {
        duration: 200,
        easing: "ease-in-out",
      }
    );
  };

  const admin = useAdmin();
  if (!admin) {
    return <></>;
  }

  return (
    <>
      <style jsx>{`
        .modal {
          z-index: 2;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
        }

        .main {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20%;
          height: 15%;
          background-color: whitesmoke;
          transform: translate(-50%, -50%);
          border-radius: 3%;
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
          display: flex;
          flex-direction: column;
          justify-contents: center;

          min-width: 200px;
          min-height: 150px;
        }

        .modal-title {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.8rem;
          height: 30%;
        }

        input {
          outline: none;
          border: none;
          height: 50%;
          box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        }

        .buttons {
          height: 50%;
          display: flex;
        }

        .buttons > button {
          flex-grow: 1;
          border: none;
          outline: none;
          box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
          transition: 0.2s background-color;
          cursor: pointer;
        }

        .buttons > button:hover {
          background-color: rgb(200, 200, 200);
        }
      `}</style>

      {activatedModal ? (
        <div
          className="modal"
          onClick={(e) => {
            if (e.target !== e.currentTarget) {
              return;
            }
            cancel();
          }}
        >
          <div className="main" ref={mainRef}>
            <span className="modal-title">??????</span>
            <input
              placeholder="????????? ???????????????"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="buttons">
              <button
                onClick={() => {
                  (async () => {
                    if (router.query.id) {
                      await update();
                    } else {
                      if (!(await uploadPost())) shakingAnimate();
                    }
                  })();
                }}
              >
                Upload
              </button>
              <button onClick={() => cancel()}>Cancel</button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;
