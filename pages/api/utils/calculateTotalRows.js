// utils/calculateTotalRows.js

import fs from "fs";
import path from "path";
import csvParser from "csv-parser";

export const calculateTotalRows = (filePath) => {
  return new Promise((resolve, reject) => {
    let rowCount = 0;
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", () => {
        rowCount++;
      })
      .on("end", () => {
        resolve(rowCount);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};
