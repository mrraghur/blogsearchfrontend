import React from "react";

import { BiLinkExternal } from "react-icons/bi";

import styles from "../styles/components/Blog.module.css";

const Blog = ({ blog, width }) => {
  return (
    <div className={styles.container}>
      {width > 600 ? (
        <>
          <div className={styles.image}>
            <img src={blog?.image} alt="blog" loading="lazy" />
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
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Blog;
