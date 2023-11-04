"use client";

import Post from "@/components/post";
import { fetchPosts, getFileContent } from "@/libs/post";
import styled from "@emotion/styled";
import { useEffect } from "react";
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
  new PostModel("title5", "content5"),
  new PostModel("title5", "content5"),
  new PostModel("title5", "content5"),
  new PostModel("title5", "content5"),
  new PostModel("title5", "content5"),
  new PostModel("title5", "content5"),
  new PostModel("title5", "content5"),
  new PostModel("title5", "content5"),
  new PostModel("title5", "content5"),
  new PostModel("title5", "content5"),
  new PostModel("title5", "content5"),
  new PostModel("title5", "content5"),
  new PostModel("title5", "content5"),
  new PostModel("title5", "content5"),
  new PostModel("title5", "content5"),
  new PostModel("title5", "content5"),
  new PostModel("title5", "content5"),
  new PostModel("title5", "content5"),
  new PostModel("title5", "content5"),
];

const RootPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
`;

const VerticalPostLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  height: 100%;
  overflow-y: auto;
  padding: 1rem 0;
`;

export default function RootPage() {
  return (
    <RecoilRoot>
      <RootPageContainer>
        <h4>Recent Posts</h4>
        <VerticalPostLayout>
          {posts.map((v, i) => (
            <Post key={i} title={v.title} content={v.content} />
          ))}
        </VerticalPostLayout>
      </RootPageContainer>
    </RecoilRoot>
  );
}
