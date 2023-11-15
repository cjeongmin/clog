"use client";
import Post from "@/components/post";
import { loadPosts } from "@/libs/post";
import {
  postsState,
  postsWithDateSelector,
  postsWithoutDateSelector,
} from "@/states/posts";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const RootPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
`;

const VerticalPostLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  overflow-y: auto;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

export default function RootPage() {
  const [posts, setPosts] = useRecoilState(postsState);
  const postsWithDate = useRecoilValue(postsWithDateSelector);
  const postsWithoutDate = useRecoilValue(postsWithoutDateSelector);

  useEffect(() => {
    (async () => {
      const res = await loadPosts();
      setPosts(
        res.filter((post) => {
          return post.publish;
        })
      );
    })();
  }, []);

  return (
    <RootPageContainer>
      <h4>Recent Posts</h4>
      <VerticalPostLayout>
        {postsWithDate.length > 0
          ? postsWithDate.map((v, i) => (
              <Post
                key={i}
                name={v.name}
                content={v.content}
                date={v.date}
                publish={v.publish}
                tags={v.tags}
              />
            ))
          : "글을 기다리고 있어요."}
      </VerticalPostLayout>
      <h4 style={{ marginTop: "1rem" }}>No Date</h4>
      <VerticalPostLayout>
        {postsWithoutDate.length > 0
          ? postsWithoutDate.map((v, i) => (
              <Post
                key={i}
                name={v.name}
                content={v.content}
                date={v.date}
                publish={v.publish}
                tags={v.tags}
              />
            ))
          : "글을 기다리고 있어요."}
      </VerticalPostLayout>
    </RootPageContainer>
  );
}
