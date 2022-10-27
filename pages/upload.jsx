import axios from "axios";
import React from "react";
import Head from "next/head";
import Image from "next/image";

import Nav from "../components/nav/nav";
import styles from "../styles/Upload.module.css";
import Footer from "../components/footer/footer";
import Paginate from "../components/paginate/paginate";
import AnonymousFilters from "../components/filters/anonymous";
import Uploader from "../components/portals/uploader/uploader";

const Upload = () => {
  const [page, setPage] = React.useState(1);
  const [filters, setFilters] = React.useState({});
  const [rowsPerPage, setRowsPerPage] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [results, setResults] = React.useState({ data: [] });
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
    setLoading(true);

    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    axios
      .post(
        "https://search.interviewblindspots.com/displaycode/upload/",
        formData
      )
      .then((res) => {
        setLoading(false);
        setResults(res.data);
        setData(res?.data?.values);
        setFilters(res.data.filters);
        setColumns(res?.data?.columnHeadings);
      });
  };

  const handleFilter = (title, key) => {
    console.log(title, key);
    const ky = Object.keys(key).find((k) => key[k] === true);
    const index = columns.indexOf(title);

    if (ky) {
      const filtered = results?.values?.filter((item) => {
        return item[index] === ky;
      });
      setData(filtered);
    } else {
      setData(results?.values);
    }
  };

  const handleReset = () => {
    setData(results?.values);
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

  return (
    <div className={styles.container}>
      <Head>
        <title>Upload</title>
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
                  filter={handleFilter}
                  handleReset={handleReset}
                />
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
