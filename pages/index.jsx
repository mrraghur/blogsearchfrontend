import Head from "next/head";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
import SideNav from "../components/SideNav";

export default function Home() {
  const router = useRouter();
  const [datas, setDatas] = useState({});
  const [results, setResults] = useState([]);
  const [blogsPerPage, setblogsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [width, setWidth] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);
  const [face_counts, setFaceCounts] = useState([
    { counts: [{ count: "0", value: "subtrack" }] },
    {
      counts: [
        { count: 0, value: "expert" },
        { count: 0, value: "intermediate" },
        { count: 0, value: "beginner" },
      ],
    },
    { counts: [] },
  ]);

  const { register, handleSubmit, reset } = useForm();

  const indexOfLastPost = page * blogsPerPage;
  const indexOfFirstPost = indexOfLastPost - blogsPerPage;
  const currentPosts = results?.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    const width = window.innerWidth;
    setWidth(width);

    if (width > 992) {
      setShowFilters(true);
      setShowActions(true);
    } else if (width < 992 && width > 600) {
      setShowFilters(false);
      setShowActions(true);
    } else {
      setShowFilters(false);
      setShowActions(false);
    }
  }, [width]);

  useEffect(() => {
    if (router.asPath.split("=")[1]) {
      setLoading(true);
      setResults([]);
      const str = encodeURI(router.asPath.split("=")[1]);
      reset({
        key: str
          .replace(/[+]/g, " ")
          .replace(/%/g, "")
          .replace(/25/g, "")
          .replace(/2B/g, ""),
      });

      fetch(`/api/${router.asPath.split("=")[1]}`, {
        body: JSON.stringify(),
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setLoading(false);
          setResults(data?.blogs?.results[0]?.hits);
          setDatas(data?.blogs?.results[0]);
          setFaceCounts(data?.blogs?.results[0]?.facet_counts);
        });
    }
  }, [router.asPath]);

  const handleShowFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleShowActions = () => {
    setShowActions(!showActions);
  };

  const handleShowSideNav = () => {
    setShowSideNav(!showSideNav);
  };

  const paginate = async (page) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setPage(page);
  };

  const handleSearch = async (data) => {
    if (!loading) {
      router.push(
        { pathname: `/`, query: { key: `${data?.key}` } },
        undefined,
        {
          shallow: true,
        }
      );

      setLoading(true);
      setResults([]);

      await fetch(`/api/${data?.key}`, {
        body: JSON.stringify(),
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setResults(data?.blogs?.results[0]?.hits);
          setDatas(data?.blogs?.results[0]);
          setFaceCounts(data?.blogs?.results[0]?.facet_counts);
        });
    }
  };

  const handleCategories = async (event, value) => {
    if (event.target.checked) {
      const filtered = datas?.filter((result) => {
        if (result?.document?.category === value) {
          return true;
        }
      });
      setResults(filtered);
      setPage(1);
    } else {
      setResults(datas?.hits);
    }
  };

  const handleAudiences = async (data) => {
    if (data?.beginner || data?.intermediate || data?.expert) {
      const filtered = datas?.hits?.filter((result) => {
        if (
          (data?.beginner && result?.document?.aud === "beginner") ||
          (data?.intermediate && result?.document?.aud === "intermediate") ||
          (data?.expert && result?.document?.aud === "expert")
        ) {
          return true;
        }
      });

      setResults(filtered);
      setPage(1);
    } else {
      setResults(datas?.hits);
    }
  };

  const handleCountries = async (data) => {
    if (Object.values(data)?.includes(true)) {
      let filtered = [];
      Object.entries(data).forEach(([key, value]) => {
        if (value) {
          const one = datas?.hits?.filter((result) => {
            if (result?.document?.countries === key) {
              return true;
            }
          });
          filtered = [...filtered, ...one];
          // console.log(one);
        }
      });
      setResults(filtered);
      setPage(1);
    } else {
      setResults(datas?.hits);
    }
  };

  const handleNames = async (data) => {
    if (Object.values(data)?.includes(true)) {
      let filtered = [];
      Object.entries(data).forEach(([key, value]) => {
        if (value) {
          const one = datas?.hits?.filter((result) => {
            if (result?.document?.names === key) {
              return true;
            }
          });
          filtered = [...filtered, ...one];
          // console.log(one);
        }
      });
      setResults(filtered);
      setPage(1);
    } else {
      setResults(datas?.hits);
    }
  };

  const handleTime = (data) => {
    const filtered = datas?.hits?.filter((result) => {
      if (
        parseInt(data.min) <= parseInt(result?.document?.readingtime) &&
        parseInt(result?.document?.readingtime) <= parseInt(data.max)
      ) {
        return true;
      }
    });

    setResults(filtered);
    setPage(1);
  };

  const handleReset = () => {
    setResults(datas?.hits);
    setPage(1);
  };

  const goHome = () => {
    setLoading(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setResults([]);
    setDatas([]);
    reset({ key: "" });
    router.push({ pathname: `/`, query: {} }, undefined, {
      shallow: true,
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Blog-Search</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo_blue.png" />
      </Head>

      <main className={styles.main}>
        <Nav handleShowSideNav={handleShowSideNav} reset={goHome} />
        {showSideNav ? (
          <SideNav handleShowSideNav={handleShowSideNav} width={width} />
        ) : (
          <></>
        )}
        <div
          className={styles.content}
          style={
            showFilters
              ? width < 992
                ? width < 600
                  ? {
                      gridTemplateColumns: "0fr 5fr 0fr",
                      gridTemplateAreas: "content content actions",
                      gridGap: 0,
                      padding: 0,
                    }
                  : {
                      gridTemplateColumns: "0fr 3fr 1fr",
                      gridTemplateAreas: "content content actions",
                      gridGap: 10,
                      padding: 0,
                    }
                : {}
              : showActions
              ? width > 600
                ? {
                    gridTemplateColumns: "0fr 3fr 1fr",
                    gridTemplateAreas: "content content actions",
                    gridGap: 10,
                    padding: 0,
                  }
                : {
                    gridTemplateColumns: "0fr 3fr 0fr",
                    gridTemplateAreas: "content content content",
                    padding: 0,
                    gridGap: 0,
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
            width={width}
            face_counts={face_counts}
            handleCategories={handleCategories}
            handleAudiences={handleAudiences}
            resetAll={handleReset}
            handleTime={handleTime}
            datas={datas}
            handleCountries={handleCountries}
            handleNames={handleNames}
          />
          <div className={styles.blogs}>
            <div className={styles.top}>
              {showFilters ? (
                width > 992 ? (
                  <></>
                ) : (
                  <div
                    className={styles.filters}
                    style={{
                      width: showActions ? "15%" : "15%",
                      background: "#4158d0",
                      color: "white",
                    }}
                    onClick={handleShowFilters}
                  >
                    <GoSettings
                      className={styles.icon}
                      // style={{ margin: showActions ? "0 5px" : "0 2px" }}
                    />
                  </div>
                )
              ) : (
                <div
                  className={styles.filters}
                  style={{ width: showActions ? "15%" : "15%" }}
                  onClick={handleShowFilters}
                >
                  <GoSettings
                    className={styles.icon}
                    // style={{ margin: showActions ? "0 5px" : "0 2px" }}
                  />
                </div>
              )}
              <div
                className={styles.search}
                // style={
                //   showFilters
                //     ? width < 600
                //       ? { width: "70%" }
                //       : {}
                //     : {
                //         width: showActions ? "70%" : "70%",
                //         padding: showActions ? "0" : "0 5px",
                //       }
                // }
              >
                {width > 600 ? <FiSearch className={styles.icon} /> : ""}
                <form
                  action="#"
                  className={styles.form}
                  onSubmit={handleSubmit(handleSearch)}
                >
                  <input
                    type="text"
                    placeholder="Search here..."
                    className={styles.search_input}
                    required
                    {...register("key")}
                  />
                  <button type="submit">
                    {width > 600 ? (
                      "Search"
                    ) : (
                      <FiSearch className={styles.icon} />
                    )}
                  </button>
                </form>
                <GrClose
                  className={styles.icon}
                  onClick={() => reset({ key: "" })}
                />
              </div>
              {width > 600 ? (
                <></>
              ) : (
                <div
                  className={styles.actions}
                  // style={{ width: showActions ? "8%" : "15%" }}
                  style={
                    showActions
                      ? { width: "15%", background: "#4158d0", color: "white" }
                      : { width: "15%" }
                  }
                  onClick={handleShowActions}
                >
                  <p className={styles.icon}>A</p>
                </div>
              )}
            </div>
            <div
              className={styles.results}
              style={width > 600 ? { height: "100%" } : { height: "1800px" }}
            >
              {results?.length > 0 ? (
                <div className={styles.div}>
                  <div className={styles.header}>
                    <p>{results?.length} Results</p>
                    <select name="sort">
                      <option value="Relevance">Relevance</option>
                      <option value="Category">Category</option>
                    </select>
                  </div>
                  <Blogs blogs={currentPosts} width={width} />
                  <Pagination
                    blogsPerPage={blogsPerPage}
                    paginate={paginate}
                    width={width}
                    data={results}
                  />
                </div>
              ) : (
                <div className={styles.big_logo}>
                  {loading ? (
                    <Image
                      src="/loader.svg"
                      width="150"
                      height="150"
                      alt="loading..."
                    />
                  ) : (
                    <Image
                      src="/logo_blue.png"
                      width="150"
                      height="150"
                      alt="logo"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
          <Actions
            showActions={showActions}
            handleShowActions={handleShowActions}
            width={width}
          />
        </div>
      </main>

      <footer className={styles.footer}>
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
      </footer>
    </div>
  );
}
