"use client";

import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import Pagination from "./components/Pagination";
import Masonry from "react-masonry-css";
import styles from "./components/Page.module.css";
import SearchBar from "./components/SearchBar";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import WordCloudComponent from "./components/WordCloudComponent";
import { useRouter } from "next/router";

const Page = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [wordCloudData, setWordCloudData] = useState([]);
  const router = useRouter();
  const { csv } = router.query;

  const fetchData = (page = 0, pageSize = itemsPerPage, query = searchQuery) => {
    if (!csv) return;
    fetch(`/api/getCsvData?csv=${csv}&page=${page}&pageSize=${pageSize}&searchQuery=${query}`)
      .then((response) => response.json())
      .then((jsonData) => {
        const { paginatedData, totalItems, wordCloudData } = jsonData;
        setData(paginatedData);
        setFilteredData(paginatedData);
        setPageCount(Math.ceil(totalItems / itemsPerPage));
        setWordCloudData(wordCloudData);
      })
      .catch((error) => {
        console.error("Error fetching and parsing CSV data:", error);
      });
  };

  useEffect(() => {
    if (typeof window !== "undefined" && csv) {
      fetchData(currentPage);
    }
  }, [csv, currentPage, itemsPerPage, searchQuery]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const value = localStorage.getItem("itemsPerPage") || "";
      if (value) {
        setItemsPerPage(parseInt(value));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("itemsPerPage", itemsPerPage);
      setCurrentPage(0); // Reset to first page when items per page change
      fetchData(0, itemsPerPage); // Fetch the new set of data
    }
  }, [itemsPerPage]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(0); // Reset to first page
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const offset = currentPage * itemsPerPage;
  const currentData = filteredData.slice(offset, offset + itemsPerPage);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const handleWordClick = (word) => {
    setSearchQuery(word);
  };

  return (
    <div className={styles.Page}>
      <div className={styles.leftColumn}>
        <h1>Word Cloud</h1>
        <SearchBar value={searchQuery} onChange={handleSearchChange} />
        <WordCloudComponent data={wordCloudData} onWordClick={handleWordClick} />
      </div>
      <div className={styles.rightColumn}>
        <h1>Image Gallery</h1>
        <div
          className={styles.controls}
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
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={styles.myMasonryGrid}
          columnClassName={styles.myMasonryGridColumn}
        >
          {currentData.map((item, index) => (
            <Card key={index} image={item} />
          ))}
        </Masonry>
        <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
      </div>
    </div>
  );
};

export default Page;
