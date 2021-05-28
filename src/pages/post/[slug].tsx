import React from "react";
import Image from "next/image";
import { BLOCKS } from "@contentful/rich-text-types";
import { Blog, Field } from "../index";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Navbar from "../../components/Navbar";

const client = require("contentful").createClient({
  space: process.env.NEXT_PULBIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

interface PostProps {
  post: any; // a mess
}

interface PostParams {
  params: Field;
}

export async function getStaticPaths() {
  const data = await client.getEntries({
    content_type: "blogPost",
  });
  return {
    paths: data.items.map((item: Blog) => ({
      params: { slug: item.fields.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: PostParams) {
  const data = await client.getEntries({
    content_type: "blogPost",
    "fields.slug": params.slug,
  });
  return {
    props: {
      post: data.items[0],
    },
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <>
      <Navbar />
      <h1>{post.fields.title}</h1>
      <div>
        {documentToReactComponents(post.fields.body, {
          renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: (node) => {
              console.log(node);
              return (
                <Image
                  src={`https:${node.data.target.fields.file.url}`}
                  width={node.data.target.fields.file.details.image.width}
                  height={node.data.target.fields.file.details.image.height}
                />
              );
            },
          },
        })}
      </div>
    </>
  );
};

export default Post;
