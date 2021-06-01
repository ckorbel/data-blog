import React, { useState } from "react";
import { Box, Link, Flex, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";
import styled from "styled-components";
// import { useMeQuery, useLogoutMutation } from "../generated/graphql";
// import { isServer } from "../utils/isServer";

const ContainerStyled = styled.div`
  background-color: #435562;
  display: flex;
  z-index: 1;
  position: sticky;
  top: 0;
  padding: 1rem;
`;

const LoginStyled = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  .link-item,
  a {
    margin-right: 12px;
  }
  a:hover {
    cursor: pointer;
  }
`;

const HeadingStyled = styled.h2`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-weight: 700;
  font-size: 1.875rem;
  line-height: 1.33;
  color: #fff;
`;

interface NavBarProps {}

const Navbar: React.FC<NavBarProps> = ({}) => {
  const [account, setAccount] = useState(false);
  const { data, loading } = useMeQuery();

  let body = null;

  // data is loading
  if (loading) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>register</Link>
        </NextLink>
      </>
    );
    // user is logged in
  } else {
    body = (
      <LoginStyled>
        <NextLink href="/playground">
          <Link>playground</Link>
        </NextLink>
        <NextLink href="/create-post">create post</NextLink>
        <Box className="link-item">{data.me.username}</Box>
        <i className="material-icons">account_circle</i>
      </LoginStyled>
    );
  }

  return (
    <Flex
      zIndex={1}
      position="sticky"
      top={0}
      p={4}
      style={{ backgroundColor: "#435562" }}
    >
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <NextLink href="/">
          <Link>
            <HeadingStyled>Data Blog</HeadingStyled>
          </Link>
        </NextLink>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};

export default Navbar;
