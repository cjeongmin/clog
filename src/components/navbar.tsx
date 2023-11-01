"use client";

import styled from "@emotion/styled";
import Link from "next/link";

class Category {
  constructor(public content: string, public url: string) {}
}

const categories: Category[] = [
  new Category("Home", ""),
  new Category("Posts", "posts"),
  new Category("Tags", "tags"),
  new Category("About", "about"),
];

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;

  width: 100%;
`;

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 2rem;
`;

export default function Navbar() {
  return (
    <>
      <NavContainer>
        <Link href="/">
          <Title>clog</Title>
        </Link>
        <TagContainer>
          {categories.map((v, i) => (
            <Link key={i} href={{ pathname: `/${v.url}` }}>
              {v.content}
            </Link>
          ))}
        </TagContainer>
      </NavContainer>
    </>
  );
}
