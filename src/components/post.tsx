import styled from "@emotion/styled";
import Link from "next/link";

const PostContainer = styled(Link)`
  display: flex;
  flex-direction: column;

  width: 47.5%;
  min-height: 25vh;
  height: 30%;
  border-radius: 10px;
  background-color: #10101080;

  padding: 1rem;

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

const Content = styled.p`
  font-size: 0.75rem;
`;

export default function Post({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const removeExtTitle = title.replace(".md", "");
  const pathname = `/posts/${removeExtTitle}`;

  return (
    <>
      <PostContainer href={{ pathname }}>
        <Title>{removeExtTitle}</Title>
      </PostContainer>
    </>
  );
}
