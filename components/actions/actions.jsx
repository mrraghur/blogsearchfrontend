import React from "react";

import { BsShareFill } from "react-icons/bs";
import { TbDatabaseExport } from "react-icons/tb";

import Ad from "../ad/ad";
import styles from "./actions.module.css";

const Actions = () => {
  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <p className={styles.title}>Actions</p>
        <button className={styles.button}>
          <TbDatabaseExport className={styles.icon} />
          <p>Export results to CSV</p>
        </button>
        <button className={styles.button}>
          <BsShareFill className={styles.icon} />
          <p>Export results to CSV</p>
        </button>
      </div>
      <Ad>Ads</Ad>
      <Ad>Ads</Ad>
    </div>
  );
};

export default Actions;
