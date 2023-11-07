"use client";

import Post from "@/components/post";
import { getPosts } from "@/libs/post";
import { postsState } from "@/states/posts";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

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
`;

export default function RootPage() {
  const [posts, setPosts] = useRecoilState(postsState);

  useEffect(() => {
    (async () => {
      setPosts(await getPosts());
    })();
  }, []);

  return (
    <RootPageContainer>
      <h4>Recent Posts</h4>
      <VerticalPostLayout>
        {posts.length > 0
          ? posts.map((v, i) => (
              <Post key={i} title={v.title} content={v.content} date={v.date} />
            ))
          : "글을 기다리고 있어요."}
      </VerticalPostLayout>
    </RootPageContainer>
  );
}
