"use client";
import Post from "@/components/post";
import { loadPosts } from "@/libs/post";
import { usePostsState } from "@/states/posts";
import { useTagsState } from "@/states/tags";
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
  padding: 0.5rem;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

export default function RootPage() {
  const { posts, setPosts } = usePostsState();
  const { setTags } = useTagsState();

  useEffect(() => {
    (async () => {
      const { date, noDate, tags } = await loadPosts();
      setPosts({ date, noDate });
      setTags(tags);
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
          : "글을 불러오고 있어요."}
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
          : "글을 불러오고 있어요."}
      </VerticalPostLayout>
    </RootPageContainer>
  );
}
