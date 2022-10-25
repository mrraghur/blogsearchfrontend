import axios from "axios";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import Papa from "papaparse"

import Nav from "../components/nav/nav";
import styles from "../styles/Upload.module.css";
import Footer from "../components/footer/footer";
import useTable from "../components/table/useTable";
import Paginate from "../components/paginate/paginate";
import AnonymousFilters from "../components/filters/anonymous";
import Uploader from "../components/portals/uploader/uploader";

const Upload = () => {
  const [page, setPage] = React.useState(1);
  const [filters, setFilters] = React.useState({});
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [results, setResults] = React.useState({ data: [] });
  const [loading, setLoading] = React.useState(false);

  const { slice } = useTable(data, page, rowsPerPage);

  const handlePaginate = (val) => {
    setPage(val);
  };

  const fetchData = async (formData) => {
    setLoading(true);
    axios
      .post(
        "http://search.interviewblindspots.com/displaycode/upload/",
        formData
      )
      .then((res) => {
        setFilters(res.data);
        setLoading(false);
        console.log(res.data);
      });
  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    fetchData(formData);

    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setResults(results);
        setData(results?.data);
        setColumns(Object.keys(results.data[0]));
      },
    });
  };

  const handleFilter = (title, key) => {

    
    const ky = Object.keys(key).find((k) => key[k] === true);
    console.log(title, ky, results.data);

    if(ky){
      const filtered = results?.data?.filter((item) => {
        return item[title] === ky;
      });
      setData(filtered);
    }else{
      setData(results?.data);
    }

  };

  const handleReset = () => {
    setData(results?.data);
  };

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
                    <table className="w-full text-left text-gray-500 dark:text-gray-400 rounded-lg">
                      <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          {columns.map((col, i) => (
                            <th scope="col" className="py-3 px-6" key={i}>
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {slice.map((row, i) => (
                          <tr
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
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
