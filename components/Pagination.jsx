import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import styles from "../styles/components/Pagination.module.css";

const PaginationC = ({ blogsPerPage, data, paginate }) => {
  const [page, setPage] = React.useState(1);
  const pageNumbers = Math.ceil(data?.length / blogsPerPage);

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

export default PaginationC;
