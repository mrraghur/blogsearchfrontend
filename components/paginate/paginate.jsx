import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import styles from "./paginate.module.css";

const Paginate = ({ blogsPerPage, len, paginate }) => {
  const [page, setPage] = React.useState(1);
  const pageNumbers = Math.ceil(len / blogsPerPage);

  const handleChange = (event, value) => {
    setPage(value);
    paginate(value);
  };

  return (
    <Stack spacing={2} className={styles.container}>
      <Pagination
        count={pageNumbers}
        color="secondary"
        onChange={handleChange}
        page={page}
      />
    </Stack>
  );
};

export default Paginate;
