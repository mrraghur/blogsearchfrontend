import React from "react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

//icons
import { FiSearch } from "react-icons/fi";
import { GrClose } from "react-icons/gr";

import Nav from "../components/nav/nav";
import styles from "../styles/Upload.module.css";
import Footer from "../components/footer/footer";
import Paginate from "../components/paginate/paginate";
import AnonymousFilters from "../components/filters/anonymous";
import Uploader from "../components/portals/uploader/uploader";

const Upload = () => {
  //configs
  const router = useRouter();
  const { handleSubmit, register, reset } = useForm();

  //local data
  const [page, setPage] = React.useState(1);
  const [filters, setFilters] = React.useState({});
  const [rowsPerPage, setRowsPerPage] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [results, setResults] = React.useState({ data: [] });
  const [datas, setDatas] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [tableRange, setTableRange] = React.useState([]);
  const [slice, setSlice] = React.useState([]);

  //paginating the data
  const calculateRange = (data, rowsPerPage) => {
    const range = [];
    const num = Math.ceil(data.length / rowsPerPage);
    let i = 1;
    for (let i = 1; i <= num; i++) {
      range.push(i);
    }
    return range;
  };

  const sliceData = (data, page, rowsPerPage) => {
    return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  };

  React.useEffect(() => {
    const range = calculateRange(data, rowsPerPage);
    setTableRange([...range]);

    const slice = sliceData(data, page, rowsPerPage);
    setSlice([...slice]);
  }, [rowsPerPage, data, page]);

  const handlePaginate = (val) => {
    setPage(val);
  };

  //getting data
  const uploadFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      if (file?.type === "text/csv") {
        const data = new FormData();
        data.append("file", file);
        axios
          .post(
            "https://backend.interviewblindspots.com/displaycode/upload/",
            data
          )
          .then((res) => {
            const { filters, columnHeadings, values } = res.data;
            setLoading(false);
            setDatas(res.data);
            setFilters(filters);
            setColumns(columnHeadings);
            setData(values);
          });
      } else {
        setLoading(false);
        alert("Please upload a csv file");
      }
    } else {
      alert("Please upload a csv file");
    }
  };

  const extract = (arr) => {
    const one = arr.reduce((acc, curr) => {
      return [...acc, ...curr];
    }, []);
    return one;
  };

  const handleFilter = (arr) => {
    console.log(arr);

    //remove previous filters from url
    const url = window.location.href;
    const newUrl = url.split("?")[0];
    window.history.pushState({}, "", newUrl);

    //add filters to url
    const newUrl2 = `${newUrl}?${arr.join("& ")}`;
    window.history.pushState({}, "", newUrl2);

    // const params = new URLSearchParams(router.query);
    // arr.forEach((item) => {
    //   const key = Object.keys(item)[0];
    //   const value = Object.values(item)[0];
    //   params.set(key, value);
    // });
    // router.push(`/upload/?${params.toString()}`);

    setData([]);
    const one = arr.map((element) => {
      const key = Object.values(element)[0];
      const index = columns.indexOf(Object.keys(element)[0]);
      return datas.values.filter((item) => item[index] === key);
    });
    setData(extract(one));
  };

  const handleReset = () => {
    setData(datas?.values);
  };

  React.useEffect(() => {
    const height = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    const num = Math.floor((height - 250) / 50);
    setRowsPerPage(num);
  }, [results]);

  const handleSearch = (data) => {};

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
      </Head>
      <Nav reset={() => {}} />
      <div className={styles.content}>
        {loading ? (
          <div className={styles.loading}>
            <Image
              src="/loader.svg"
              width="150"
              height="150"
              alt="loading..."
            />
          </div>
        ) : (
          <>
            {Object.keys(filters).length > 0 ? (
              <>
                <AnonymousFilters
                  data={filters}
                  handleFilter={handleFilter}
                  handleReset={handleReset}
                />
                <div className={styles.all}>
                  <div className={styles.search}>
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
                  <div className={styles.data}>
                    <div className={styles.blogs}>
                      <table className="w-10 text-left text-gray-500 dark:text-gray-400 rounded-lg">
                        <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            {columns.map((col, i) => (
                              <th
                                scope="col"
                                className="py-3 px-6 whitespace-nowrap"
                                key={i}
                              >
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {slice.map((row, i) => (
                            <tr
                              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 whitespace-nowrap"
                              key={i}
                            >
                              {Object.values(row).map((col, j) => (
                                <td className="py-4 px-6" key={j}>
                                  {col}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <Paginate
                      blogsPerPage={rowsPerPage}
                      len={data?.length}
                      paginate={handlePaginate}
                    />
                  </div>
                </div>
              </>
            ) : (
              <Uploader upload={uploadFile} />
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Upload;
