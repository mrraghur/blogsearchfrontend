// pages/api/getCSVData.js

import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import { updateCSVFileMapping } from "./utils/updateCSVFileMapping";

export default async function handler(req, res) {
  var { csv, page = 1, itemsPerPage = 50, searchQuery = "", filters } = req.query;

  const csvFileMapping = await updateCSVFileMapping();
  const mapping = csvFileMapping[csv];

  if (!mapping) {
    return res.status(400).json({ error: "Invalid CSV file" });
  }

  const { fileName, totalRows } = mapping;
  const filePath = path.resolve("./public/data", fileName);

  itemsPerPage = parseInt(itemsPerPage);
  page = parseInt(page);

  const results = [];
  let totalMatchedRecords = 0;
  const offset = (page - 1) * itemsPerPage;
  const endOffset = offset + itemsPerPage;
  let processedRecords = 0;
  let sentResponse = false;

  // Parse the filters from the query string
  const parsedFilters = JSON.parse(filters || "{}");

  try {
    const stream = fs
      .createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row) => {
        // Apply search query filter
        const matchesSearch =
          searchQuery === "" ||
          row?.image_alt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row?.article_title
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          row?.article_url?.toLowerCase().includes(searchQuery.toLowerCase());

        // Apply additional filters based on the parsedFilters object
        let matchesFilters = true;

        // Filter by image type if the filter is active
        if (parsedFilters.imageType?.status) {
          const imageExtension = path.extname(row?.image_url || "").toLowerCase();
          if (!parsedFilters.imageType.selected.includes(imageExtension)) {
            matchesFilters = false;
          }
        }

        // Filter by Black and White Ratio if the filter is active
        if (parsedFilters.BWRatio?.status) {
          const bwRatio = parseFloat(row?.bw_ratio || 0);
          const targetRatio = parseFloat(parsedFilters.BWRatio.ratio);

          if (parsedFilters.BWRatio.type === "more than") {
            if (bwRatio <= targetRatio) matchesFilters = false;
          } else if (parsedFilters.BWRatio.type === "less than") {
            if (bwRatio >= targetRatio) matchesFilters = false;
          }
        }

        // Check if the row matches both the search query and the filters
        if (matchesSearch && matchesFilters) {
          totalMatchedRecords++;

          if (
            totalMatchedRecords > offset &&
            totalMatchedRecords <= endOffset
          ) {
            results.push(row);
          }
        }

        processedRecords++;
        if (totalMatchedRecords >= endOffset && !sentResponse) {
          res.status(200).json({
            estimatedTotalRecords: Math.floor(
              (totalMatchedRecords / processedRecords) * totalRows
            ),
            data: results,
          });
          sentResponse = true;
          stream.destroy();
        }
      })
      .on("end", () => {
        if (!sentResponse) {
          res.status(200).json({
            totalMatchedRecords,
            data: results,
          });
        }
      })
      .on("error", (error) => {
        console.error("Error reading the CSV file:", error);
        if (!sentResponse) {
          res.status(500).json({ error: "Error reading the CSV file" });
          sentResponse = true;
        }
      });
  } catch (error) {
    console.error("Error handling the request:", error);
    if (!sentResponse) {
      res.status(500).json({ error: "Server error" });
    }
  }
}
