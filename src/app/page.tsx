"use client";

import styled from "@emotion/styled";

// 임시 데이터
const tags: string[] = Array.from({ length: 20 }).map((_, i) => `tag${i + 1}`);

const Container = styled.div({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

const TagContainer = styled.div({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "0.5rem 0.75rem",
});

const Tag = styled.span({
  background: "#80808050",
  color: "#181818",
  borderRadius: "10px",
  padding: "10px",

  ":hover": {
    background: "#808080a0",
    transition: "ease-in-out background 0.3s",
  },
});

export default function Home() {
  return (
    <>
      <Container>
        <strong style={{ fontSize: "2rem", padding: "10px" }}>Tags</strong>
        <TagContainer>
          {tags.map((v, i) => (
            <Tag key={i}>{v}</Tag>
          ))}
        </TagContainer>
      </Container>
    </>
  );
}
