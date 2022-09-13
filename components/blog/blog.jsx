import React from "react";
import Image from "next/image";
import parse from "html-react-parser";
import { useRouter } from "next/router";

import { BiLinkExternal } from "react-icons/bi";

import styles from "./blog.module.css";

const Blog = ({ blog }) => {
  const router = useRouter();

  const goToBlog = () => {
    router.push(
      { pathname: `${blog?.document?.url}` },
      blog?.document?.url,
      {}
    );
  };

  return (
    <div className={styles.container} onClick={goToBlog}>
      <div className={styles.image}>
        <img src={blog?.document?.imgs} width={150} height={100} alt="blog" />
      </div>
      <div className={styles.content}>
        <p className={styles.link}>
          <BiLinkExternal className={styles.icon} />
          {`${blog?.document?.url.substr(0, 50)}...`}
        </p>
        <p className={styles.title}>{blog?.document?.title.substr(0, 65)}</p>
        <div className={styles.description}>
          {parse(blog?.highlights[0]?.snippet?.substr(0, 300))}...
        </div>
      </div>
      <div className={styles.category}>{blog?.document?.category}</div>
    </div>
  );
};

export default Blog;
