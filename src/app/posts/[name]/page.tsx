"use client";

import { getMetaData, postDateFormatter, replaceLinks } from "@/libs/post";
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

  pre {
    padding: 1.5rem;
    background-color: #ededed;
    border-radius: 10px;
  }

  code,
  code * {
    font-size: 0.8rem;
    font-family: "Hack", "Nanum Gothic Coding", monospace;
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

export default function PostPage() {
  const { name } = useParams();
  const contentRef = useRef<HTMLDivElement>(null);

  const [post, setPost] = useState<MarkDownFile | null>(null);

  useEffect(() => {
    (async () => {
      const response = await axios.post(`/api/posts`, {
        name: name,
      });
      const post = response.data as MarkDownFile;
      setPost({
        name: post.name,
        content: post.content,
        createAt: new Date(post.createAt),
        lastModified: new Date(post.lastModified),
      });
    })();
  }, []);

  useEffect(() => {
    const current = contentRef.current;
    if (current && post) {
      const metadata = getMetaData(post.content);
      const content = replaceLinks(metadata.content);
      current.innerHTML = marked.parse(content);
      hljs.highlightAll();
    }
  }, [post]);

  return (
    <>
      <PostPageContainer>
        {post ? (
          <>
            <Title>{post.name}</Title>
            <PostDate>{postDateFormatter(post.createAt)}</PostDate>
            <Divider />
            <ContentContainer ref={contentRef} />
          </>
        ) : (
          <>
            <p style={{ textAlign: "center" }}>글을 불러오고 있어요</p>
          </>
        )}
      </PostPageContainer>
    </>
  );
}
