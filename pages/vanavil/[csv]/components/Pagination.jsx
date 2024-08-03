// src/components/Pagination.js

import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from "./Page.module.css"

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel={'previous'}
      nextLabel={'next'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={onPageChange}
      containerClassName={styles["pagination"]}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
    />
  );
};

export default Pagination;
