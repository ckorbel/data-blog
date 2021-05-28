import NavBar from "../components/Navbar";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { fetchEntries } from "../utils/contentfulPosts";

export interface Field {
  body: any; // todo
  publishedDate: string;
  slug: string;
  title: string;
}

interface Sys {
  createdAt: string;
  id: string;
  locale: string;
  revision: number;
  type: string;
  updatedAt: string;
}

export interface Blog {
  fields: Field;
  sys: Sys; // todo
}

interface IndexProps {
  posts: Blog[];
}

export async function getStaticProps() {
  const posts: Blog[] = await fetchEntries();
  return {
    props: {
      posts,
    },
  };
}

const Index: React.FC<IndexProps> = ({ posts = [] }) => {
  return (
    <>
      <NavBar />
      <div className="posts"></div>
      <ul>
        {posts &&
          posts.map((post) => (
            <li key={post.sys.id}>
              <NextLink href={`/post/${post.fields.slug}`}>
                <Link>{post.fields.title}</Link>
              </NextLink>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Index;
