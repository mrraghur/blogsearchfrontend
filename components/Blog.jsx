import React from "react";
import parse from "html-react-parser";
import { useRouter } from "next/router";

import { BiLinkExternal } from "react-icons/bi";

import styles from "../styles/components/Blog.module.css";

const Blog = ({ blog, width }) => {
  const router = useRouter();

  const goToBlog = () => {
    router.push(
      { pathname: `${blog?.document?.url}` },
      blog?.document?.url,
      {}
    );
  };

  return (
    <>
      {width > 600 ? (
        <div className={styles.container} onClick={goToBlog}>
          <div className={styles.image}>
            <img
              src={blog?.document?.imgs}
              alt="blog"
              loading="lazy"
              placeholder="blur"
            />
          </div>
          <div className={styles.content}>
            <p className={styles.link}>
              <BiLinkExternal className={styles.icon} />
              {width > 922
                ? `${blog?.document?.url?.substr(0, 60)}...`
                : `${blog?.document?.url.substr(0, 50)}...`}
            </p>
            <p className={styles.title}>
              {blog?.document?.title.substr(0, 65)}
            </p>
            <div className={styles.description}>
              {parse(blog?.highlights[0]?.snippet?.substr(0, 300))}...
            </div>
          </div>
          <div className={styles.category}>{blog?.document?.category}</div>
        </div>
      ) : (
        <div className={styles.phone_blog}>
          <div className={styles.top}>
            <div className={styles.left}>
              <img src={blog?.document?.imgs} alt="blog" loading="lazy" />
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
            {parse(blog?.highlights[0]?.snippet?.substr(0, 150))}...
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;
