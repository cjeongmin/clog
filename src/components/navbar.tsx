"use client";

import Category from "@/models/Category";
import styled from "@emotion/styled";
import Link from "next/link";

const categories: Category[] = [
  new Category("Home", ""),
  new Category("Tags", "tags"),
  new Category("About", "about"),
];

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 20%;

  width: 100%;
`;

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
`;

const Title = styled.p`
  font-family: "Nanum Gothic Coding", monospace;
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
