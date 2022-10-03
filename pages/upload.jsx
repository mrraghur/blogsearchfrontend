import React from "react";
import Papa from "papaparse";
import { DataGrid } from "@mui/x-data-grid";

import Nav from "../components/nav/nav";
import styles from "../styles/Upload.module.css";
import Footer from "../components/footer/footer";
import Uploader from "../components/portals/uploader/uploader";

const Upload = () => {
  const [data, setData] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const uploadFile = async (e) => {
    setLoading(true);

    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setLoading(false);

        //columns
        const keys = results.data[0]?.__parsed_extra;
        const columns = keys.map((key) => {
          return {
            field: key,
            headerName: key,
            width: 200,
            sortable: true,
          };
        });

        //data
        const [, ...rest] = results.data;
        let r = rest.map((v) =>
          Object.fromEntries(keys.map((k, i) => [k, v?.__parsed_extra[i]]))
        );

        setColumns(columns);
        setData(r);
      },
    });
  };

  return (
    <div className={styles.container}>
      <Nav reset={() => {}} />
      {data.length > 0 ? (
        <div style={{ height: 1000, width: "100%" }}>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={16}
            rowsPerPageOptions={[20]}
            checkboxSelection
          />
        </div>
      ) : (
        <Uploader upload={uploadFile} />
      )}
      <Footer />
    </div>
  );
};

export default Upload;
