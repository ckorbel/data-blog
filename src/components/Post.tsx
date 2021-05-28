import React from "react";

interface Image {
  file: {
    url: string;
  };
  fields: string;
  description: string;
}

export interface PostProps {
  key: string;
  date: string;
  image?: Image;
  title: string;
}

const Post: React.FC<PostProps> = (post) => {
  // let { file, description } = image;

  return (
    <div className="post">
      {/* <img alt={description} src={`https:${file.url}`} />
      <div className="description">{description}</div> */}
      <div className="text">
        <h2>{post.title}</h2>
        {/* <h3>{date?.substring(0, 10)}</h3> */}
      </div>
    </div>
  );
};

export default Post;
