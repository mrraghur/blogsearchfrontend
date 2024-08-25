import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./components/Card";
import Pagination from "./components/Pagination";
import Masonry from "react-masonry-css";
import SearchBar from "./components/SearchBar";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import WordCloudComponent from "./components/WordCloudComponent";
import { useRouter } from "next/router";
import styles from "./components/Page.module.css";
import ErrorMessage from "./components/ErrorMessage";

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

const Page = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [loading, setLoading] = useState(false);
  const [estimatedTotalRecords, setEstimatedTotalRecords] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { csv } = router.query;

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error state before fetching

      const response = await axios.get("/api/getCsvData", {
        params: {
          csv,
          page: currentPage,
          itemsPerPage,
          searchQuery,
        },
      });

      setEstimatedTotalRecords(response.data.estimatedTotalRecords);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching and parsing data from API:", error);
      setError(error.message); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    if (!csv) return;

    fetchData();
  }, [csv, currentPage, itemsPerPage, searchQuery]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(0); // Reset to first page
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const debouncedSearch = debounce((query) => {
    setCurrentPage(0); // Reset to first page
  }, 1000); // Adjust the delay as needed (e.g., 500ms)

  const handleWordCloudWordClick = (word) => {
    setSearchQuery(word);
    debouncedSearch(word);
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  if (!data) return <></>;

  return (
    <div className={styles["Page"]}>
      {error && <div className={styles["error"]}>{error}</div>}
      <div className={styles["left-column"]}>
        <SearchBar value={searchQuery} onChange={handleSearchChange} />
        <WordCloudComponent
          data={data}
          onWordClick={handleWordCloudWordClick}
        />
      </div>
      <div className={styles["right-column"]}>
        <h1>Image Gallery</h1>
        <div
          className={styles["controls"]}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label htmlFor="itemsPerPage">Items per page:</label>
          <FormControl style={{ width: "100px" }}>
            <Select
              labelId="itemsPerPage"
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
        </div>
        {error && <ErrorMessage message={error} onRetry={fetchData} />}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className={styles["my-masonry-grid"]}
            columnClassName={styles["my-masonry-grid_column"]}
          >
            {data.map((item, index) => (
              <Card key={index} image={item} />
            ))}
          </Masonry>
        )}
        <Pagination
          totalPages={Math.floor(estimatedTotalRecords / itemsPerPage)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Page;
