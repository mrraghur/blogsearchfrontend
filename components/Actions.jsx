import React from "react";

import { TbDatabaseExport } from "react-icons/tb";
import { BsShareFill } from "react-icons/bs";

import styles from "../styles/components/Actions.module.css";
import Ad from "./Ad";

const Actions = ({ showActions }) => {
  return (
    <div
      className={styles.container}
      style={{ display: showActions ? "flex" : "none" }}
    >
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
