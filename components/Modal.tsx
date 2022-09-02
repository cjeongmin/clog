import { ReactElement, useState } from "react";
import { useActivatedModalState } from "../atoms/activatedState";

const Modal = (): ReactElement => {
  const [activatedModal, setActivatedModal] = useActivatedModalState();
  const [title, setTitle] = useState("");

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
        <div className="modal">
          <div className="main">
            <span className="modal-title">제목</span>
            <input
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="buttons">
              <button>Upload</button>
              <button onClick={() => setActivatedModal(false)}>Cancel</button>
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
