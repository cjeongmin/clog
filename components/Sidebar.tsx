import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";

const PostList = (): ReactElement => {
  return <div></div>;
};

const Sidebar = (): ReactElement => {
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
          display: flex;
          flex-direction: column;
          overflow-y: auto;
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
        <PostList />
      </div>
    </>
  );
};

export default Sidebar;
