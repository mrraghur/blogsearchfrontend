import React from "react";
import Papa from "papaparse";

import Nav from "../components/nav/nav";
import Footer from "../components/footer/footer";
import styles from "../styles/Upload.module.css";
import useTable from "../components/table/useTable";
import Paginate from "../components/paginate/paginate";
import Uploader from "../components/portals/uploader/uploader";

const Upload = () => {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
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
        setLoading(false);
        setColumns(Object.keys(results.data[0]));
        setData(results?.data);
      },
    });
  };

  return (
    <div className={styles.container}>
      <Nav reset={() => {}} />
      <div className={styles.content}>
        {data.length > 0 ? (
          <>
            <table className="text-sm text-center">
              <thead className="uppercase">
                <tr>
                  {columns.map((col, index) => (
                    <th key={index} scope="col" className="px-5 py-5">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {slice.map((dat, index) => (
                  <tr key={index}>
                    {Object.values(dat).map((one, index) => (
                      <td key={index} scope="row" className="px-5 py-5">
                        {one}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <Paginate
              blogsPerPage={rowsPerPage}
              len={data?.length}
              paginate={handlePaginate}
            />
          </>
        ) : (
          <Uploader upload={uploadFile} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Upload;
