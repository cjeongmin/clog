"use client";

import { fetchPosts, getFileContent } from "@/libs/post";
import PostModel from "@/models/PostModel";
import { postsState } from "@/states/posts";
import styled from "@emotion/styled";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { marked } from "marked";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

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

  const [posts, setPosts] = useRecoilState(postsState);

  const [date, setDate] = useState<Date | null>(null);

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

  useEffect(() => {
    const post = posts.find((v) => v.title === title + ".md");
    const current = contentRef.current;
    if (current && post) {
      setDate(post.date);
      current.innerHTML = marked.parse(post.content);
      hljs.highlightAll();
    }
  }, [posts]);

  return (
    <PostPageContainer>
      <Title>{title}</Title>
      <PostDate>{date != null ? format(date) : ""}</PostDate>
      <Divider />
      <ContentContainer ref={contentRef} />
    </PostPageContainer>
  );
}
