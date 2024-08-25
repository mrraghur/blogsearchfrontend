import fs from "fs";
import path from "path";
import { calculateTotalRows } from "./calculateTotalRows";

const CSV_FILE_MAPPING_PATH = path.resolve(
  "./pages/api/utils/csvFileMapping.json"
);
const CSV_FILE_MAPPING_TEMP_PATH = path.resolve(
  "./pages/api/utils/csvFileMapping_temp.json"
);
const ONE_DAY_MS = 24 * 60 * 60 * 1000; // 1 day in milliseconds

export const updateCSVFileMapping = async () => {
  // Check if the CSV file mapping was updated in the last 24 hours
  if (fs.existsSync(CSV_FILE_MAPPING_TEMP_PATH)) {
    const tempCsvFileMapping = JSON.parse(
      fs.readFileSync(CSV_FILE_MAPPING_TEMP_PATH, "utf-8")
    );
    if (tempCsvFileMapping.lastUpdated + ONE_DAY_MS > Date.now()) {
      return tempCsvFileMapping.csvs;
    }
  }

  // Read the CSV file mapping
  const csvFileMapping = JSON.parse(
    fs.readFileSync(CSV_FILE_MAPPING_PATH, "utf-8")
  );
  console.log(csvFileMapping);

  const currentTime = Date.now();
  let isUpdated = false;

  const updatedCsvMapping = { csvs: {}, lastUpdated: currentTime };

  for (const csv in csvFileMapping) {
    const { fileName } = csvFileMapping[csv];
    if (fs.existsSync("./public/data/"+ fileName)) { // If the file exists, calculate total rows
      const filePath = path.resolve("./public/data", fileName);

      // Calculate total rows for the CSV file
      try {
        const totalRows = await calculateTotalRows(filePath);
        updatedCsvMapping.csvs[csv] = {
          fileName,
          totalRows,
        };
        isUpdated = true;
      } catch (error) {
        console.error(`Error calculating total rows for ${fileName}:`, error);
      }
    } else { // If the CSV file does not exist, add it to the mapping with 0 rows
      updatedCsvMapping.csvs[csv] = {
        fileName,
        totalRows: 0,
      };
      isUpdated = true;
    }
  }

  if (isUpdated) {
    fs.writeFileSync(
      CSV_FILE_MAPPING_TEMP_PATH,
      JSON.stringify(updatedCsvMapping, null, 2)
    );
  }

  console.log(updatedCsvMapping);

  return updatedCsvMapping.csvs;
};
