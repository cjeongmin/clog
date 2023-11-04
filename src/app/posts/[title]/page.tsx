"use client";

import styled from "@emotion/styled";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
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

  pre {
    padding: 1.5rem;
    background-color: #ededed;
    border-radius: 10px;
  }

  code,
  code * {
    font-size: 0.8rem;
    font-family: "Hack", monospace;
  }

  code * {
    line-height: 1.5rem;
  }

  code {
    background-color: #ededed;
  }

  hr {
    background-color: #808080;
    height: 1px;
    border: 0;
    border-radius: 2px;

    :hover {
      background-color: #ededed;
      transition: 1s ease-in-out background-color;
    }
  }
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

  \`\`\` python
  cjm = "cjeongmin"
  blog = "blog"

  print(cjm + " " + blog) # cjeongmin blog
  \`\`\`

  ### Hello
  ## Hi

  1. one
  2. two
  3. three

  - dash list1
  - dash list2

  \`\`\` html
  <div>
    <a href="https://www.naver.com">link</a>
  </div>
  \`\`\`
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
      hljs.highlightAll();
    }
  });

  return (
    <PostPageContainer>
      <Title>{title}</Title>
      <PostDate>{format(new Date())}</PostDate>
      <Divider />
      <ContentContainer ref={contentRef} />
    </PostPageContainer>
  );
}
