import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { FaBars } from "react-icons/fa";

import styles from "./nav.module.css";
import SideBar from "../sidebar/sidebar";

const Nav = ({ reset }) => {
  const [sidebar, setSidebar] = React.useState(false);
  const router = useRouter();

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  const goToUpload = () => {
    router.push("/upload");
  };

  const goToHome = () => {
    router.push("/");
  };

  return (
    <div className={styles.container}>
      {sidebar ? <SideBar handleSidebar={handleSidebar} /> : <></>}
      <div className={styles.logo} onClick={() => reset()}>
        <Image src="/logo_white.png" width="28" height="28" alt="logo" />
        <p>BlogSearch</p>
      </div>
      <div className={styles.nav}>
        <ul>
          <li onClick={goToHome}>Home</li>
          <li onClick={goToUpload}>Upload</li>
          <li>Blog Rankings</li>
          <li>Best Posts</li>
          <li>Submit Blog</li>
          <li>API</li>
          <li>Data</li>
          <li>About</li>
        </ul>
      </div>
      <div className={styles.tablet_nav}>
        <ul>
          <li>Home</li>
          <li>Directory</li>
        </ul>
        <div className={styles.bars} onClick={handleSidebar}>
          <FaBars className={styles.icon} />
        </div>
      </div>
      <div className={styles.phone_nav}>
        <div className={styles.bars} onClick={handleSidebar}>
          <FaBars className={styles.icon} />
        </div>
      </div>
    </div>
  );
};

export default Nav;
