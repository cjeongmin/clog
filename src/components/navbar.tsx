"use client";

import Category from "@/models/Category";
import styled from "@emotion/styled";
import Link from "next/link";

const categories: Category[] = [
  { content: "Home", url: "" },
  { content: "Tags", url: "tags" },
  { content: "About", url: "about" },
];

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 20%;

  width: 100%;

  @media (max-width: 768px) {
    padding: 1rem 10%;
  }
`;

const CategoriesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Title = styled.p`
  font-family: "Nanum Gothic Coding", monospace;
  font-weight: bold;
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export default function Navbar() {
  return (
    <>
      <NavContainer>
        <Link href="/">
          <Title>clog</Title>
        </Link>
        <CategoriesContainer>
          {categories.map((v, i) => (
            <Link key={i} href={{ pathname: `/${v.url}` }}>
              {v.content}
            </Link>
          ))}
        </CategoriesContainer>
      </NavContainer>
    </>
  );
}
