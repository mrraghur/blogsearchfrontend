import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

import Nav from "../components/Nav";
import Filters from "../components/Filters";
import Actions from "../components/Actions";

import { FiSearch } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import { GoSettings } from "react-icons/go";
import { AiFillLinkedin, AiOutlineTwitter } from "react-icons/ai";

import styles from "../styles/Home.module.css";
import Blogs from "../components/Blogs";
import Pagination from "../components/Pagination";

export default function Home() {
  const [results, setResults] = useState([
    {
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      link: "https://noahpinion.substack.com/p/hispanics-or-coups",
      title: "Hispanics or coups - by Noah Smith - Noahpinion",
      description:
        "Hardly news - for years the GOP has been trying to tilt the scale away from majoritarianism through gerrymandering, Electoral College gaming, and command of the Senate.... ",
      category: "substack",
    },
    {
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      link: "https://noahpinion.substack.com/p/hispanics-or-coups",
      title: "Hispanics or coups - by Noah Smith - Noahpinion",
      description:
        "Hardly news - for years the GOP has been trying to tilt the scale away from majoritarianism through gerrymandering, Electoral College gaming, and command of the Senate.... ",
      category: "substack",
    },
    {
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      link: "https://noahpinion.substack.com/p/hispanics-or-coups",
      title: "Hispanics or coups - by Noah Smith - Noahpinion",
      description:
        "Hardly news - for years the GOP has been trying to tilt the scale away from majoritarianism through gerrymandering, Electoral College gaming, and command of the Senate.... ",
      category: "substack",
    },
    {
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      link: "https://noahpinion.substack.com/p/hispanics-or-coups",
      title: "Hispanics or coups - by Noah Smith - Noahpinion",
      description:
        "Hardly news - for years the GOP has been trying to tilt the scale away from majoritarianism through gerrymandering, Electoral College gaming, and command of the Senate.... ",
      category: "substack",
    },
    {
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      link: "https://noahpinion.substack.com/p/hispanics-or-coups",
      title: "Hispanics or coups - by Noah Smith - Noahpinion",
      description:
        "Hardly news - for years the GOP has been trying to tilt the scale away from majoritarianism through gerrymandering, Electoral College gaming, and command of the Senate.... ",
      category: "substack",
    },
    {
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      link: "https://noahpinion.substack.com/p/hispanics-or-coups",
      title: "Hispanics or coups - by Noah Smith - Noahpinion",
      description:
        "Hardly news - for years the GOP has been trying to tilt the scale away from majoritarianism through gerrymandering, Electoral College gaming, and command of the Senate.... ",
      category: "substack",
    },
    {
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      link: "https://noahpinion.substack.com/p/hispanics-or-coups",
      title: "Hispanics or coups - by Noah Smith - Noahpinion",
      description:
        "Hardly news - for years the GOP has been trying to tilt the scale away from majoritarianism through gerrymandering, Electoral College gaming, and command of the Senate.... ",
      category: "substack",
    },
    {
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      link: "https://noahpinion.substack.com/p/hispanics-or-coups",
      title: "Hispanics or coups - by Noah Smith - Noahpinion",
      description:
        "Hardly news - for years the GOP has been trying to tilt the scale away from majoritarianism through gerrymandering, Electoral College gaming, and command of the Senate.... ",
      category: "substack",
    },
    {
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      link: "https://noahpinion.substack.com/p/hispanics-or-coups",
      title: "Hispanics or coups - by Noah Smith - Noahpinion",
      description:
        "Hardly news - for years the GOP has been trying to tilt the scale away from majoritarianism through gerrymandering, Electoral College gaming, and command of the Senate.... ",
      category: "substack",
    },
    {
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      link: "https://noahpinion.substack.com/p/hispanics-or-coups",
      title: "Hispanics or coups - by Noah Smith - Noahpinion",
      description:
        "Hardly news - for years the GOP has been trying to tilt the scale away from majoritarianism through gerrymandering, Electoral College gaming, and command of the Senate.... ",
      category: "substack",
    },
    {
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      link: "https://noahpinion.substack.com/p/hispanics-or-coups",
      title: "Hispanics or coups - by Noah Smith - Noahpinion",
      description:
        "Hardly news - for years the GOP has been trying to tilt the scale away from majoritarianism through gerrymandering, Electoral College gaming, and command of the Senate.... ",
      category: "substack",
    },
    {
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      link: "https://noahpinion.substack.com/p/hispanics-or-coups",
      title: "Hispanics or coups - by Noah Smith - Noahpinion",
      description:
        "Hardly news - for years the GOP has been trying to tilt the scale away from majoritarianism through gerrymandering, Electoral College gaming, and command of the Senate.... ",
      category: "substack",
    },
    {
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      link: "https://noahpinion.substack.com/p/hispanics-or-coups",
      title: "Hispanics or coups - by Noah Smith - Noahpinion",
      description:
        "Hardly news - for years the GOP has been trying to tilt the scale away from majoritarianism through gerrymandering, Electoral College gaming, and command of the Senate.... ",
      category: "substack",
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage, setblogsPerPage] = useState(7);
  const [width, setWidth] = useState(0);

  const [showFilters, setShowFilters] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = results?.slice(indexOfFirstBlog, indexOfLastBlog);

  useEffect(() => {
    const width = window.innerWidth;
    setWidth(width);

    if (width > 992) {
      setShowFilters(true);
      setShowActions(true);
    } else if (width < 991 && width > 600) {
      setShowFilters(false);
      setShowActions(true);
    } else {
      setShowFilters(false);
      setShowActions(false);
    }
  });

  const handleShowFilters = () => {
    // setShowFilters(!showFilters);
  };

  const handleShowActions = () => {
    // setShowActions(!showActions);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Blog-Search</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo_blue.png" />
      </Head>

      <main className={styles.main}>
        <Nav />
        <div
          className={styles.content}
          style={
            showFilters
              ? {}
              : showActions
              ? {
                  gridTemplateColumns: "0fr 2.5fr 1fr",
                  gridTemplateAreas: "content content actions",
                }
              : {
                  gridTemplateColumns: "0fr 3fr 0fr",
                  gridTemplateAreas: "content content content",
                  padding: 0,
                  gridGap: 0,
                }
          }
        >
          <Filters
            showFilters={showFilters}
            handleShowFilters={handleShowFilters}
          />
          <div className={styles.blogs}>
            <div className={styles.top}>
              {showFilters ? (
                <></>
              ) : (
                <div
                  className={styles.filters}
                  style={{ width: showActions ? "8%" : "15%" }}
                >
                  <GoSettings
                    className={styles.icon}
                    // style={{ margin: showActions ? "0 5px" : "0 2px" }}
                  />
                </div>
              )}
              <div
                className={styles.search}
                style={{
                  width: showActions ? "100%" : "70%",
                  padding: showActions ? "0 10px" : "0 5px",
                }}
              >
                <FiSearch
                  className={styles.icon}
                  // style={{ margin: showActions ? "0 5px" : "0 2px" }}
                />
                <input
                  type="text"
                  placeholder="Search here..."
                  className={styles.search_input}
                />
                <GrClose className={styles.icon} />
              </div>
              {showActions ? (
                <></>
              ) : (
                <div
                  className={styles.actions}
                  style={{ width: showActions ? "8%" : "15%" }}
                >
                  <p className={styles.icon}>A</p>
                </div>
              )}
            </div>
            <div className={styles.results}>
              {results.length > 0 ? (
                <div className={styles.div}>
                  <div className={styles.header}>
                    <p>{results?.length} Results</p>
                    <select name="sort">
                      <option value="Relevance">Relevance</option>
                      <option value="Category">Category</option>
                    </select>
                  </div>
                  <Blogs blogs={currentBlogs} width={width} />
                  <Pagination
                    blogsPerPage={blogsPerPage}
                    totalBlogs={results.length}
                    currentPage={currentPage}
                    paginate={paginate}
                  />
                </div>
              ) : (
                <div className={styles.big_logo}>
                  <Image
                    src="/logo_blue.png"
                    width="150"
                    height="150"
                    alt="logo"
                  />
                </div>
              )}
            </div>
          </div>
          <Actions
            showActions={showActions}
            handleShowActions={handleShowActions}
          />
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.logo}>
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
      </footer>
    </div>
  );
}
