import React from "react";
import Image from "next/image";

import { BiLinkExternal } from "react-icons/bi";

import styles from "../styles/components/Blog.module.css";

const Blog = ({ blog }) => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image src={blog?.image} alt="blog" width="100" height="100" />
      </div>
      <div className={styles.content}>
        <p className={styles.link}>
          <BiLinkExternal className={styles.icon} />
          {blog?.link}
        </p>
        <p className={styles.title}>{blog?.title}</p>
        <div className={styles.description}>{blog?.description}</div>
      </div>
      <div className={styles.category}>{blog?.category}</div>
    </div>
  );
};

export default Blog;
