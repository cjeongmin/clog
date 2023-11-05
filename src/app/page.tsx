"use client";

import Post from "@/components/post";
import { fetchPosts, getFileContent, replaceLinks } from "@/libs/post";
import PostModel from "@/models/PostModel";
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
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  height: 100%;
  overflow-y: auto;
  padding: 1rem 0 1rem 1rem;
`;

export default function RootPage() {
  const [posts, setPosts] = useRecoilState(postsState);

  useEffect(() => {
    (async () => {
      const res: PostModel[] = [];
      const postFiles = await fetchPosts();
      for (const post of postFiles) {
        const content = await getFileContent(post.path);
        res.push(new PostModel(post.name, content, post.date));
      }
      setPosts(res);
    })();
  }, []);

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
