import { postDateFormatter } from "@/libs/post";
import PostModel from "@/models/PostModel";
import styled from "@emotion/styled";
import Link from "next/link";

const PostContainer = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;

  width: 100%;
  height: 30%;
  border-radius: 10px;
  background-color: #10101080;

  padding: 1.5rem 1rem;

  :hover {
    cursor: pointer;
    background-color: #101010;
    transition: ease-in-out 0.2s background-color;
    transition: ease-in-out 0.3s box-shadow;

    -moz-box-shadow: 0 0 5px #fdfdfd30;
    -webkit-box-shadow: 0 0 5px #fdfdfd30;
    box-shadow: 0px 0px 5px 1px #fdfdfd30;
  }
`;

const Title = styled.p`
  font-weight: bold;
`;

const PostDate = styled.p`
  font-size: 0.7rem;
`;

export default function Post({ title, date }: PostModel) {
  const removeExtTitle = title.replace(".md", "");
  const pathname = `/posts/${removeExtTitle}`;

  return (
    <>
      <PostContainer href={{ pathname }}>
        <Title>{removeExtTitle}</Title>
        <PostDate>{postDateFormatter(date)}</PostDate>
      </PostContainer>
    </>
  );
}
