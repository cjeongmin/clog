"use client";

import Post from "@/components/post";
import styled from "@emotion/styled";
import { RecoilRoot } from "recoil";

class PostModel {
  constructor(public title: string, public content: string) {}
}

const posts: PostModel[] = [
  new PostModel("title1", "content1"),
  new PostModel("title2", "content2"),
  new PostModel("title3", "content3"),
  new PostModel("title4", "content4"),
  new PostModel("title5", "content5"),
];

const RootPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
`;

const HorizontalPostLayout = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  height: 100%;
`;

export default function RootPage() {
  return (
    <RecoilRoot>
      <RootPageContainer>
        <h4>Recent Posts</h4>
        <HorizontalPostLayout>
          {posts.map((v, i) => (
            <Post key={i} title={v.title} content={v.content} />
          ))}
        </HorizontalPostLayout>
      </RootPageContainer>
    </RecoilRoot>
  );
}
