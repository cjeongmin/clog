import styled from "@emotion/styled";

const PostContainer = styled.div`
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
  return (
    <>
      <PostContainer>
        <Title>{title}</Title>
        <Content>{content}</Content>
      </PostContainer>
    </>
  );
}
