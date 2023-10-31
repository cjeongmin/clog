"use client";

import styled from "@emotion/styled";
import Link from "next/link";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  max-width: 200px;
  width: 20%;
  height: 100%;
  background-color: #fdfdfd;
  border-radius: 25px;
  padding: 2.5rem;
  color: #191919;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  height: 20%;
`;

const ProfileImage = styled.div`
  width: 100%;
  min-width: 100%;
  height: 81%;
  min-height: 81%;
  border-radius: 50%;
  background-color: #f0f0f0;
`;

const Categories = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const CategoryItem = styled.div<{ last: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 3rem;

  border-top: 1px solid #ededed;
  border-bottom: ${({ last }) => last && "1px solid #ededed"};
`;

class Category {
  constructor(public showName: string, public link: string) {}
}

const categorieItems: Category[] = [
  new Category("Recent Posts", "recent"),
  new Category("Posts", "posts"),
  new Category("About", "about"),
];

export default function Navbar() {
  return (
    <Container>
      <ProfileContainer>
        <ProfileImage />
        <p>Choi Jeong-min</p>
      </ProfileContainer>

      <Categories>
        {categorieItems.map((v, i) => (
          <CategoryItem
            key={`category:${v.showName + v.link}`}
            last={i == categorieItems.length - 1 ? true : false}
          >
            <Link href={`/${v.link}`}>{v.showName}</Link>
          </CategoryItem>
        ))}
      </Categories>
    </Container>
  );
}
