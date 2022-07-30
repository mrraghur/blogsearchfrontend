import React from "react";

import { GoSettings } from "react-icons/go";
import { AiOutlineLeft } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";

import styles from "../styles/components/Filters.module.css";

const Filters = ({ showFilters, handleShowFilters, width, face_counts }) => {
  return (
    <div
      className={styles.container}
      style={
        showFilters
          ? width < 992
            ? {
                // display: "flex",
                position: "absolute",
                width: "250px",
                top: "110px",
                left: "1px",
                zIndex: "10",
                boxShadow: "3px 2px 10px rgba(0, 0, 0, 0.25)",
              }
            : { display: "flex" }
          : { display: "none" }
      }
    >
      <div className={styles.header}>
        <div className={styles.header_name}>
          <GoSettings className={styles.icon} />
          <p>Filters</p>
        </div>
        <div className={styles.header_collapse} onClick={handleShowFilters}>
          <AiOutlineLeft className={styles.icon} />
        </div>
      </div>
      <div className={styles.categories}>
        <div className={styles.categories_header}>
          <p>Refine By:</p>
        </div>
        <div className={styles.title}>
          <p>Categories</p>
        </div>
        <div className={styles.categories_search}>
          <FiSearch className={styles.icon} />
          <input type="text" placeholder="Search categories" />
        </div>
        <div className={styles.list}>
          <div className={styles.list_item}>
            <div className={styles.item_left}>
              <input type="checkbox" />
              <p>Subtrack</p>
            </div>
            <div className={styles.item_right}>
              <p>0</p>
            </div>
          </div>
        </div>
        <button className={styles.button}>Show more</button>
      </div>
      <div className={styles.audience}>
        <div className={styles.title}>
          <p>Audience</p>
        </div>
        <div className={styles.list}>
          <div className={styles.list_item}>
            <div className={styles.item_left}>
              <input type="checkbox" />
              <p>Expert</p>
            </div>
            <div className={styles.item_right}>
              <p>{face_counts[1]?.counts[0]?.count}</p>
            </div>
          </div>
          <div className={styles.list_item}>
            <div className={styles.item_left}>
              <input type="checkbox" />
              <p>Intermediate</p>
            </div>
            <div className={styles.item_right}>
              <p>{face_counts[1]?.counts[1]?.count}</p>
            </div>
          </div>
          <div className={styles.list_item}>
            <div className={styles.item_left}>
              <input type="checkbox" />
              <p>Beginner</p>
            </div>
            <div className={styles.item_right}>
              <p>{face_counts[1]?.counts[2]?.count}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.time}>
        <div className={styles.title}>
          <p>Reading time (minutes)</p>
        </div>
        <div className={styles.choose}></div>
        <button className={styles.button}>Clear filters</button>
      </div>
    </div>
  );
};

export default Filters;
