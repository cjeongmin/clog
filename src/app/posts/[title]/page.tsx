"use client";

import styled from "@emotion/styled";
import { marked } from "marked";
import { useEffect, useRef } from "react";

const Divider = styled.div`
  height: 1px;
  background-color: #808080;
  margin: 1rem 0;
`;

const PostPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Title = styled.h1`
  text-align: center;
`;

const PostDate = styled.p`
  text-align: end;
  color: #808080;

  :hover {
    transition: 0.25s color ease-in-out;
    color: #fdfdfd;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const content = `
  # Hello
  ---
  - this is list item1
  - this is list item2

  **bold**  
  *italic*
`;

function format(date: Date): string {
  const paddingZero = (x: number) => {
    return x.toString().padStart(2, "0");
  };

  const [year, month, day] = [
    date.getFullYear(),
    date.getMonth(),
    date.getDay(),
  ];
  const [hour, minute] = [date.getHours(), date.getMinutes()];
  return `${year}.${paddingZero(month)}.${paddingZero(day)} - ${paddingZero(
    hour
  )}:${paddingZero(minute)}`;
}

export default function PostPage({ params }: { params: { title: string } }) {
  const title = params.title;
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const current = contentRef.current;
    if (current != null) {
      current.innerHTML = marked.parse(content);
    }
  });

  return (
    <PostPageContainer>
      <Title>{title}</Title>
      <PostDate>{format(new Date())}</PostDate>
      <Divider />
      <ContentContainer ref={contentRef}></ContentContainer>
    </PostPageContainer>
  );
}
