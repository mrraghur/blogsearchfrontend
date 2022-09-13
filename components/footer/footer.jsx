import React from "react";
import Image from "next/image";

import { AiFillLinkedin, AiOutlineTwitter } from "react-icons/ai";

import styles from "./footer.module.css";

const Footer = ({ goHome }) => {
  return (
    <div className={styles.container}>
      <div className={styles.logo} onClick={goHome}>
        <Image src="/logo_white.png" width="28" height="28" alt="logo" />
        <p>BlogSearch</p>
      </div>
      <div className={styles.links}>
        <div className={styles.resources}>
          <p className={styles.title}>Resources</p>
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
        <div className={styles.socials}>
          <p className={styles.title}>Follow us</p>
          <ul>
            <li>
              <AiFillLinkedin className={styles.icon} />
              <p>LInkedIn</p>
            </li>
            <li>
              <AiOutlineTwitter className={styles.icon} />
              <p>Twitter</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
