import React from "react";

import { GoSettings } from "react-icons/go";
import { AiOutlineLeft } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";

import styles from "../styles/components/Filters.module.css";

const Filters = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header_name}>
          <GoSettings className={styles.icon} />
          <p>Filters</p>
        </div>
        <div className={styles.header_collapse}>
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
        <div className={styles.categories_list}>
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
              <p>0</p>
            </div>
          </div>
          <div className={styles.list_item}>
            <div className={styles.item_left}>
              <input type="checkbox" />
              <p>Intermediate</p>
            </div>
            <div className={styles.item_right}>
              <p>0</p>
            </div>
          </div>
          <div className={styles.list_item}>
            <div className={styles.item_left}>
              <input type="checkbox" />
              <p>Beginner</p>
            </div>
            <div className={styles.item_right}>
              <p>0</p>
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
