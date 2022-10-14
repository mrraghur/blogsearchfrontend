import React from "react";
import Papa from "papaparse";
import Head from "next/head";

import Nav from "../components/nav/nav";
import { parseIfJson } from "../utils/parse";
import styles from "../styles/Upload.module.css";
import Footer from "../components/footer/footer";
import useTable from "../components/table/useTable";
import Filters from "../components/filters/filters";
import Paginate from "../components/paginate/paginate";
import Uploader from "../components/portals/uploader/uploader";

const Upload = () => {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [data, setData] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const { slice } = useTable(data, page, rowsPerPage);

  const handlePaginate = (val) => {
    setPage(val);
  };

  const uploadFile = async (e) => {
    setLoading(true);

    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log(results.data);
        setLoading(false);
        setColumns(Object.keys(results.data[0]));
        setData(results?.data);
      },
    });
  };

  console.log(slice);

  return (
    <div className={styles.container}>
      <Head>
        <title>Upload</title>
      </Head>
      <Nav reset={() => {}} />
      <div className={styles.content}>
        <Filters />
        {data.length > 0 ? (
          <div className={styles.data}>
            <div className={styles.blogs}>
              {slice?.map((item, index) => (
                <div key={index} className={styles.blog}>
                  {Object.keys(item).map((key, index) => (
                    <div key={index} className={styles.blogItem}>
                      <span className={styles.key}>{key}:</span>
                      <span className={styles.value}>
                        {parseIfJson(item[key]).length > 50
                          ? `${item[key].substr(0, 50)}...`
                          : item[key]}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <Paginate
              blogsPerPage={rowsPerPage}
              len={data?.length}
              paginate={handlePaginate}
            />
          </div>
        ) : (
          <Uploader upload={uploadFile} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Upload;
