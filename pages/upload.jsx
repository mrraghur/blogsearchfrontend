import React from "react";
import Papa from "papaparse";
import Head from "next/head";

import Nav from "../components/nav/nav";
import styles from "../styles/Upload.module.css";
import Footer from "../components/footer/footer";
import useTable from "../components/table/useTable";
import Paginate from "../components/paginate/paginate";
import AnonymousFilters from "../components/filters/anonymous";
import Uploader from "../components/portals/uploader/uploader";

const Upload = () => {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [results, setResults] = React.useState({ data: [] });
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
        setLoading(false);
        setResults(results);
        setData(results?.data);
        setColumns(Object.keys(results.data[0]));
      },
    });
  };

  const handleFilter = (title, key) => {
    if (title === "Continents") {
      const filtered = results?.data.filter((item) => item.Continent === key);
      setData(filtered);
    } else if (title === "Countries") {
      const filtered = results?.data.filter((item) => item.Country === key);
      setData(filtered);
    } else {
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
        <AnonymousFilters
          data={results?.data}
          filter={handleFilter}
          handleReset={handleReset}
        />
        {data.length > 0 ? (
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
        ) : (
          <Uploader upload={uploadFile} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Upload;
