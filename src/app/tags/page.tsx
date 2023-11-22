"use client";

import Post from "@/components/post";
import { loadPosts } from "@/libs/post";
import { usePostsState } from "@/states/posts";
import { useTagsState } from "@/states/tags";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
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

const Tag = styled.span<{ selected: boolean }>`
  color: ${(props) => (props.selected ? "#fdfdfd" : "#808080")};
  text-decoration: underline;
  text-underline-offset: 3px;

  :hover {
    cursor: pointer;
  }
`;

export default function TagsPage() {
  const { setPosts } = usePostsState();
  const { tags, setTags } = useTagsState();
  const [selected, setSelected] = useState("");

  useEffect(() => {
    (async () => {
      const { date, noDate, tags } = await loadPosts();
      setPosts({ date, noDate });
      setTags(tags);
    })();
  }, []);

  return (
    <>
      <PageContainer>
        <h4 style={{ margin: "1rem 0" }}>Tags.</h4>
        <TagsContainer>
          {Object.keys(tags).map((tag, i) => (
            <Tag
              key={i}
              selected={selected === tag}
              onClick={() => setSelected(tag)}
            >
              {`#${tag}`}
            </Tag>
          ))}
        </TagsContainer>
        <h4 style={{ margin: "1rem 0" }}>Posts.</h4>
        <VerticalPostLayout>
          {tags[selected] ? (
            tags[selected].map((file, i) => (
              <Post
                key={i}
                content={file.content}
                date={file.date}
                name={file.name}
                publish={file.publish}
                tags={file.tags}
              />
            ))
          ) : (
            <p>
              {selected === ""
                ? "태그를 선택해주세요."
                : "글을 불러오고 있어요."}
            </p>
          )}
        </VerticalPostLayout>
      </PageContainer>
    </>
  );
}
