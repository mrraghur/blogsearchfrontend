import React from "react";

import { GoSettings } from "react-icons/go";

import styles from "./filters.module.css";
import Row from "./row";

const AnonymousFilters = ({ data, handleFilter, height, handleReset }) => {
  const onReset = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header_name}>
          <GoSettings className={styles.icon} />
          <p>Filters</p>
        </div>
      </div>
      {Object?.keys(data)?.map((filter, index) => (
        <Row
          key={index}
          filter={filter}
          data={data}
          handleFilter={handleFilter}
          handleReset={handleReset}
        />
      ))}
      <button className={styles.button} onClick={onReset}>
        Clear filters
      </button>
    </div>
  );
};

export default AnonymousFilters;
