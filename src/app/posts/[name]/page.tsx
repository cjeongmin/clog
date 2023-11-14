"use client";

import MarkDownFile from "@/models/MarkDownFile";
import styled from "@emotion/styled";
import axios from "axios";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { marked } from "marked";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Divider = styled.div`
  height: 1px;
  background-color: #808080;
  margin: 1rem 0;
`;

const PostPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.75rem;

  pre {
    padding: 1.5rem;
    background-color: #ededed;
    border-radius: 10px;
  }

  code,
  code * {
    font-size: 0.8rem;
    font-family: "'Hack', 'Nanum Gothic Coding'", monospace;
    line-height: 1.5rem;
  }

  pre > code {
    background-color: #ededed;
  }

  hr {
    background-color: #808080;
    height: 1px;
    border: 0;
    border-radius: 2px;
  }

  a {
    color: #808080;
    text-decoration: underline;
    text-underline-position: below;
    text-underline-offset: 2px;
  }

  img {
    max-width: 100%;
    border-radius: 10px;
    margin: 1rem 0;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
`;

const PostDate = styled.p`
  text-align: end;
  color: #808080;

  :hover {
    transition: 0.25s color ease-in-out;
    color: #fdfdfd;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  gap: 0.5rem;
`;

const Tag = styled.span`
  color: #808080;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function PostPage() {
  const { name } = useParams();
  const contentRef = useRef<HTMLDivElement>(null);

  const [post, setPost] = useState<MarkDownFile | null>(null);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`/api/posts/${name}`);
      const post = response.data as MarkDownFile;
      setPost(post);
    })();
  }, []);

  useEffect(() => {
    const current = contentRef.current;
    if (current && post) {
      current.innerHTML = marked.parse(post.content);

      if (typeof window?.MathJax !== "undefined") {
        window.MathJax.typesetClear();
        window.MathJax.typeset();
      }

      hljs.highlightAll();
    }
  }, [post]);

  return (
    <>
      <PostPageContainer>
        {post && post.publish ? (
          <>
            <Title>{post.name}</Title>
            <PostDate>{post.date}</PostDate>
            {post.tags.length ? (
              <TagsContainer>
                {post.tags.map((v, i) => (
                  <Tag key={i}>{`#${v}`}</Tag>
                ))}
              </TagsContainer>
            ) : (
              <></>
            )}
            <Divider />
            <ContentContainer ref={contentRef} />
          </>
        ) : (
          <>
            <p style={{ textAlign: "center" }}>
              {post?.publish === false
                ? "비공개 글입니다."
                : "글을 불러오고 있어요."}
            </p>
          </>
        )}
      </PostPageContainer>
    </>
  );
}

declare global {
  interface Window {
    MathJax: any;
  }
}
