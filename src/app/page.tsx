"use client";

import Post from "@/components/post";
import { fetchPosts, getFileContent } from "@/libs/post";
import PostModel from "@/models/PostModel";
import { postsState } from "@/states/posts";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";

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
  const [posts, setPosts] = useRecoilState(postsState);

  useEffect(() => {
    (async () => {
      const res: PostModel[] = [];
      const postFiles = await fetchPosts();
      for (const post of postFiles) {
        const content = await getFileContent(post.path);
        res.push(new PostModel(post.name, post.path, new Date()));
      }
      setPosts(res);
    })();
  });

  return (
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
  );
}

export default function RootPage() {
  return (
    <RecoilRoot>
      <Index />
    </RecoilRoot>
  );
}
