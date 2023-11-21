"use client";
import Post from "@/components/post";
import { loadPosts } from "@/libs/post";
import { usePostsState } from "@/states/posts";
import styled from "@emotion/styled";
import { useEffect } from "react";

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
  const { posts, setPosts } = usePostsState();

  useEffect(() => {
    (async () => {
      setPosts(await loadPosts());
    })();
  }, []);

  return (
    <RootPageContainer>
      <h4>Recent Posts.</h4>
      <VerticalPostLayout>
        {posts.date.length > 0
          ? posts.date.map((v, i) => (
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
      <h4 style={{ marginTop: "1rem" }}>No Date.</h4>
      <VerticalPostLayout>
        {posts.noDate.length > 0
          ? posts.noDate.map((v, i) => (
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
