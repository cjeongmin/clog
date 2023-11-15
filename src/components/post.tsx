import MarkDownFile from "@/models/MarkDownFile";
import styled from "@emotion/styled";
import Link from "next/link";

const PostContainer = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 30%;
  border-radius: 10px;

  @media (prefers-color-scheme: dark) {
    background-color: #10101080;

    @media (min-width: 1025px) {
      :hover {
        cursor: pointer;
        background-color: #101010;
        transition: ease-in-out 0.2s background-color;
        transition: ease-in-out 0.3s box-shadow;

        -moz-box-shadow: 0 0 5px #fdfdfd30;
        -webkit-box-shadow: 0 0 5px #fdfdfd30;
        box-shadow: 0px 0px 5px 1px #fdfdfd30;
      }
    }
  }

  @media (prefers-color-scheme: light) {
    background-color: #f0f0f0;

    @media (min-width: 1025px) {
      :hover {
        cursor: pointer;
        background-color: #e0e0e0;
        transition: ease-in-out 0.2s background-color;
        transition: ease-in-out 0.3s box-shadow;

        -moz-box-shadow: 0 0 5px #a0a0a0;
        -webkit-box-shadow: 0 0 5px #a0a0a0;
        box-shadow: 0px 0px 5px 1px #a0a0a0;
      }
    }
  }

  padding: 1.5rem 1rem;
`;

const Title = styled.p`
  font-weight: bold;
`;

const PostDate = styled.p`
  font-size: 0.7rem;
`;

export default function Post({ name, date }: MarkDownFile) {
  const removeExtTitle = name.replace(".md", "");
  const pathname = `/posts/${removeExtTitle}`;

  return (
    <>
      <PostContainer href={{ pathname }}>
        <Title>{removeExtTitle}</Title>
        <PostDate>{date}</PostDate>
      </PostContainer>
    </>
  );
}
