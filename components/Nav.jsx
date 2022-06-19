import React from "react";
import Image from "next/image";

import styles from "../styles/components/Nav.module.css";

const Nav = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src="/logo_white.png" width="28" height="28" alt="logo" />
        <p>BlogSearch</p>
      </div>
      <div className={styles.nav}>
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
      </div>
    </div>
  );
};

export default Nav;
