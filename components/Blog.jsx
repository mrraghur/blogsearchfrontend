import React from "react";

import { BiLinkExternal } from "react-icons/bi";

import styles from "../styles/components/Blog.module.css";

const Blog = ({ blog, width }) => {
  return (
    <>
      {width > 600 ? (
        <div className={styles.container}>
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
        </div>
      ) : (
        <div className={styles.phone_blog}>
          <div className={styles.top}>
            <div className={styles.left}>
              <img src={blog?.image} alt="blog" loading="lazy" />
            </div>
            <div className={styles.right}>
              <p className={styles.link}>
                <BiLinkExternal className={styles.icon} />
                {blog?.link.substr(0, 38)}...
              </p>
              <p className={styles.title}>{blog?.title.substr(0, 38)}...</p>
              <div className={styles.category_fam}>{blog?.category}</div>
            </div>
          </div>
          <div className={styles.description}>{blog?.description}</div>
        </div>
      )}
    </>
  );
};

export default Blog;
