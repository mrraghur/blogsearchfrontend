import React from "react";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import styles from "../styles/components/Pagination.module.css";

const Pagination = ({
  blogsPerPage,
  totalBlogs,
  paginate,
  currentPage,
  width,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBlogs / blogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div
      className={styles.container}
      style={width > 600 ? {} : { margin: "10px 0" }}
    >
      <AiOutlineLeft className={styles.icon} />
      <ul>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={number == currentPage ? `${styles.active}` : ""}
          >
            <p onClick={() => paginate(number)}>{number}</p>
          </li>
        ))}
      </ul>
      <AiOutlineRight className={styles.icon} />
    </div>
  );
};

export default Pagination;
