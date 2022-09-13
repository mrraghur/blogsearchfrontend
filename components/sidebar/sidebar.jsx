import React from "react";

import { ImCross } from "react-icons/im";

import Ad from "../ad/ad";
import styles from "./sidebar.module.css";

const SideBar = ({ handleSidebar }) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <p>Links</p>
        <ImCross onClick={handleSidebar} />
      </div>
      <div className={styles.nav}>
        <ul>
          <li className={styles.danger}>Home</li>
          <li className={styles.danger}>Directory</li>
          <li>Blog Rankings</li>
          <li>Best Posts</li>
          <li>Submit Blog</li>
          <li>API</li>
          <li>Data</li>
          <li>About</li>
        </ul>
      </div>
      <Ad>Ads</Ad>
      <Ad>Ads</Ad>
    </div>
  );
};

export default SideBar;
