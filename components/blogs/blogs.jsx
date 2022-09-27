import React, { useEffect } from "react";
import Blog from "../blog/blog";
import Paginate from "../paginate/paginate";

import styles from "./blogs.module.css";

const Blogs = ({ blogs, time, remove }) => {
  const [blogsPerPage, setBlogsPerPage] = React.useState(20);
  const [page, setPage] = React.useState(1);

  const indexOfLastPost = page * blogsPerPage;
  const indexOfFirstPost = indexOfLastPost - blogsPerPage;
  const currentPosts = blogs?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (page) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setPage(page);
  };

  useEffect(() => {
    setPage(1);
  }, [blogs]);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <p>{time} Millseconds</p>
        <p>{blogs?.length} Results</p>
        <select name="sort">
          <option value="Relevance">Relevance</option>
          <option value="Category">Category</option>
        </select>
      </div>
      <div className={styles.blogs}>
        {currentPosts?.map((blog, index) => (
          <Blog blog={blog} key={index} remove={remove} />
        ))}
      </div>
      <Paginate
        blogsPerPage={blogsPerPage}
        len={blogs?.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Blogs;
