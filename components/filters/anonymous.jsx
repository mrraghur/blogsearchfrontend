import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { GoSettings } from "react-icons/go";

import styles from "./filters.module.css";

const AnonymousFilters = ({ data, filter, height, handleReset }) => {
  const { register, handleSubmit, reset } = useForm();

  const handleFilter = (title) => (data) => {
    filter(title, data);
  };

  const onReset = () => {
    reset();
    handleReset();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header_name}>
          <GoSettings className={styles.icon} />
          <p>Filters</p>
        </div>
      </div>
      {Object?.keys(data)?.map((filter, index) => (
        <div className={styles.audience} key={index}>
          <div className={styles.title}>
            <p>{filter.trim()}</p>
          </div>
          <form
            className={styles.list}
            onSubmit={handleSubmit(handleFilter(filter))}
          >
            {Object?.keys(data[filter])
              .slice(0, 5)
              .map((item, index) => (
                <div className={styles.list_item} key={index}>
                  <div className={styles.item_left}>
                    <input type="checkbox" {...register(`${item.trim()}`)} />
                    <p>{item.trim()}</p>
                  </div>
                  <div className={styles.item_right}>
                    <p>{data[filter][item]}</p>
                  </div>
                </div>
              ))}
            <button type="submit" className={styles.button}>
              Filter
            </button>
          </form>
          {Object?.keys(data[filter]).length > 5 && (
            <button className={styles.button}>Show more</button>
          )}
        </div>
      ))}
      <button className={styles.button} onClick={onReset}>
        Clear filters
      </button>
    </div>
  );
};

export default AnonymousFilters;
