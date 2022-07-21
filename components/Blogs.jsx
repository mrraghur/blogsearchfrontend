import React, { useState } from "react";

import Blog from "./Blog";

import styles from "../styles/components/Blogs.module.css";

const Blogs = ({ blogs, width }) => {
  console.log(blogs);

  return (
    <div className={styles.blogs}>
      {blogs.map((blog, index) => (
        <Blog blog={blog} key={index} width={width} />
      ))}
    </div>
  );
};

export default Blogs;
