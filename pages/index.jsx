import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter, withRouter } from "next/router";
import { useForm } from "react-hook-form";

import { FiSearch } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import { GoSettings } from "react-icons/go";

import Nav from "../components/nav/nav";
import Footer from "../components/footer/footer";
import Filters from "../components/filters/filters";
import Actions from "../components/actions/actions";

import styles from "../styles/Home.module.css";
import Blogs from "../components/blogs/blogs";

function Home(props) {
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);
  const [blogs, setBlogs] = React.useState([]);
  const [datas, setDatas] = React.useState([]);
  const [filters, setFilters] = React.useState(true);
  const [actions, setActions] = React.useState(true);

  const { register, handleSubmit, reset } = useForm();

  const fetchBlogs = async (data) => {
    setLoading(true);

    await fetch(`/api/${data?.key}`, {
      body: JSON.stringify(),
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setBlogs(data?.blogs?.results[0]?.hits);
        setDatas(data?.blogs?.results[0]);
      });
  };

  const handleSearch = async (data) => {
    if (!loading) {
      setBlogs([]);

      //add category to url
      const params = new URLSearchParams(router.query);
      params.set("key", data?.key);
      router.push(`/?${params.toString()}`);

      fetchBlogs(data);
    }
  };

  useEffect(() => {
    if (router.asPath.split("?")[1]) {
      if (router.asPath.split("?")[1].includes("&")) {
        const keyStr = router.asPath.split("?")[1].split("&")[0];
        const anotherStr = router.asPath.split("?")[1].split("&")[1];

        if (keyStr.split("=")[0] == "key") {
          fetchBlogs({ key: keyStr.split("=")[1] });
          reset({
            key: keyStr
              .split("=")[1]
              .replace(/[+]/g, " ")
              .replace(/%/g, "")
              .replace(/25/g, "")
              .replace(/2B/g, ""),
          });
        }

        console.log(anotherStr);
      } else {
        const keyStr = router.asPath.split("?")[1];
        if (keyStr.split("=")[0] == "key") {
          fetchBlogs({ key: keyStr.split("=")[1] });
          reset({
            key: keyStr
              .split("=")[1]
              .replace(/[+]/g, " ")
              .replace(/%/g, "")
              .replace(/25/g, "")
              .replace(/2B/g, ""),
          });
        }
      }
    }
  }, []);

  //filters
  const handleCategories = async (event, value) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (event.target.checked) {
      //add category to url
      const params = new URLSearchParams(router.query);
      params.set("category", value);
      // params.delete("category");
      params.delete("audience");
      params.delete("country");
      params.delete("name");
      router.push(`/?${params.toString()}`);

      const filtered = datas?.hits?.filter((result) => {
        if (result?.document?.category === value) {
          return true;
        }
      });
      setBlogs(filtered);
    } else {
      //remove category from url
      const params = new URLSearchParams(router.query);
      params.delete("category");
      router.push(`/?${params.toString()}`);

      setBlogs(datas?.hits);
    }
  };

  const handleAudiences = async (data) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
      //add audience to url
      const params = new URLSearchParams(router.query);
      params.set("audience", filtered[0]?.document?.aud);
      params.delete("category");
      // params.delete("audience");
      params.delete("country");
      params.delete("name");
      router.push(`/?${params.toString()}`);

      setBlogs(filtered);
    } else {
      //remove category from url
      const params = new URLSearchParams(router.query);
      params.delete("audience");
      router.push(`/?${params.toString()}`);

      setBlogs(datas?.hits);
    }
  };

  const handleCountries = async (data) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
      //add country to url
      const params = new URLSearchParams(router.query);
      params.set("country", filtered[0]?.document?.countries);
      params.delete("category");
      params.delete("audience");
      // params.delete("country");
      params.delete("name");
      router.push(`/?${params.toString()}`);

      setBlogs(filtered);
    } else {
      //remove country from url
      const params = new URLSearchParams(router.query);
      params.delete("country");
      router.push(`/?${params.toString()}`);

      setBlogs(datas?.hits);
    }
  };

  const handleNames = async (data) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
      //add name to url
      const params = new URLSearchParams(router.query);
      params.set("name", filtered[0]?.document?.names);
      params.delete("category");
      params.delete("audience");
      params.delete("country");
      // params.delete("name");
      router.push(`/?${params.toString()}`);

      setBlogs(filtered);
    } else {
      //remove name from url
      const params = new URLSearchParams(router.query);
      params.delete("name");
      router.push(`/?${params.toString()}`);

      setBlogs(datas?.hits);
    }
  };

  const handleTime = (data) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const filtered = datas?.hits?.filter((result) => {
      if (
        parseInt(data.min) <= parseInt(result?.document?.readingtime) &&
        parseInt(result?.document?.readingtime) <= parseInt(data.max)
      ) {
        return true;
      }
    });

    setBlogs(filtered);
  };

  const handleReset = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    //remove all params from url
    const params = new URLSearchParams(router.query);
    params.delete("category");
    params.delete("audience");
    params.delete("country");
    params.delete("name");
    router.push(`/?${params.toString()}`);

    setBlogs(datas?.hits);
  };

  const goHome = () => {
    setLoading(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setBlogs([]);
    setDatas([]);
    reset({ key: "" });
    router.push({ pathname: `/`, query: {} }, undefined, {
      shallow: true,
    });
  };

  return (
    <div className={styles.body}>
      <div className={styles.main}>
        <Nav reset={goHome} />
        <div className={styles.container}>
          <Filters
            datas={datas}
            handleCategories={handleCategories}
            handleAudiences={handleAudiences}
            handleCountries={handleCountries}
            handleNames={handleNames}
            handleTime={handleTime}
            resetAll={handleReset}
          />
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.filters}>
                <GoSettings />
              </div>
              <div className={styles.white}>
                <FiSearch className={styles.icon} />
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
                    <FiSearch className={styles.icon} />
                  </button>
                </form>
                <GrClose
                  className={styles.icon}
                  onClick={() => reset({ key: "" })}
                />
              </div>
              <div className={styles.actions}>
                <p>A</p>
              </div>
            </div>
            <div className={styles.blogs}>
              {blogs?.length > 0 ? (
                <Blogs blogs={blogs} time={datas?.search_time_ms} />
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
          <Actions show={actions} />
        </div>
      </div>
      <Footer goHome={goHome} />
    </div>
  );
}

export default withRouter(Home);
