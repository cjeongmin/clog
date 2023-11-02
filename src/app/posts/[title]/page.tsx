"use client";

import styled from "@emotion/styled";

const PostPageContainer = styled.div`
  display: flex;

  min-height: 100%;
  height: 100%;
`;

export default function PostPage({ params }: { params: { title: string } }) {
  console.log("Post Page");
  return <PostPageContainer>{params.title}</PostPageContainer>;
}
