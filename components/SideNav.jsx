import React from "react";
import { ImCross } from "react-icons/im";

import Ad from "./Ad";
import styles from "../styles/components/SideNav.module.css";

const SideNav = ({ handleShowSideNav, width }) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <p>Links</p>
        <ImCross onClick={handleShowSideNav} />
      </div>
      <div className={styles.nav}>
        {width < 600 ? (
          <ul>
            <li>Home</li>
            <li>Directory</li>
            <li>Blog Rankings</li>
            <li>Best Posts</li>
            <li>Submit Blog</li>
            <li>API</li>
            <li>Data</li>
            <li>About</li>
          </ul>
        ) : (
          <ul>
            <li>Blog Rankings</li>
            <li>Best Posts</li>
            <li>Submit Blog</li>
            <li>API</li>
            <li>Data</li>
            <li>About</li>
          </ul>
        )}
      </div>
      <Ad>Ads</Ad>
      <Ad>Ads</Ad>
    </div>
  );
};

export default SideNav;
