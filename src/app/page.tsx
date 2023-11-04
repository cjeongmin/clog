"use client";

import Post from "@/components/post";
import { postsSelector } from "@/states/posts";
import styled from "@emotion/styled";
import { RecoilRoot, useRecoilValue } from "recoil";

const RootPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
`;

const VerticalPostLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1rem;
  height: 100%;
  overflow-y: auto;
  padding: 1rem 0rem;
`;

export function Index() {
  const posts = useRecoilValue(postsSelector);

  return (
    <RecoilRoot>
      <RootPageContainer>
        <h4>Recent Posts</h4>
        <VerticalPostLayout>
          {posts.length > 0
            ? posts.map((v, i) => (
                <Post key={i} title={v.title} content={v.content} />
              ))
            : "글을 기다리고 있어요."}
        </VerticalPostLayout>
      </RootPageContainer>
    </RecoilRoot>
  );
}

export default function RootPage() {
  return (
    <RecoilRoot>
      <Index />
    </RecoilRoot>
  );
}
