import React from "react";

import { BiLinkExternal } from "react-icons/bi";

import styles from "../styles/components/Blog.module.css";

const Blog = ({ blog, width }) => {
  return (
    <>
      {width > 600 ? (
        <div className={styles.container}>
          <div className={styles.image}>
            <img src={blog?.document?.imgs} alt="blog" loading="lazy" />
          </div>
          <div className={styles.content}>
            <p className={styles.link}>
              <BiLinkExternal className={styles.icon} />
              {blog?.document?.url.substr(0, 45)}...
            </p>
            <p className={styles.title}>
              {blog?.document?.title.substr(0, 45)}
            </p>
            <div className={styles.description}>
              {blog?.highlights[0]?.snippet}...
            </div>
          </div>
          <div className={styles.category}>{blog?.document?.category}</div>
        </div>
      ) : (
        <div className={styles.phone_blog?.document}>
          <div className={styles.top}>
            <div className={styles.left}>
              <img
                src={blog?.document?.image}
                alt="blog?.document"
                loading="lazy"
              />
            </div>
            <div className={styles.right}>
              <p className={styles.link}>
                <BiLinkExternal className={styles.icon} />
                {blog?.document?.url.substr(0, 38)}...
              </p>
              <p className={styles.title}>
                {blog?.document?.title.substr(0, 38)}...
              </p>
              <div className={styles.category_fam}>
                {blog?.document?.category}
              </div>
            </div>
          </div>
          <div className={styles.description}>
            {blog?.highlights[0]?.snippet?.substr(0, 150)}...
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;
