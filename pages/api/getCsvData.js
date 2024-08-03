import fs from "fs";
import path from "path";
import Papa from "papaparse";

const csvFileMapping = {
  ncsu: "public\\data\\ncsu_processed_data.csv",
  stanford: "public\\data\\stanford_processed_data.csv",
};

const filterData = (data, searchQuery) => {
  if (!searchQuery) return data;
  return data.filter(
    (item) =>
      item?.image_alt?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      String(item?.article_title)
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase()) ||
      item?.article_url?.toLowerCase().includes(searchQuery?.toLowerCase())
  );
};

const generateWordCloudData = (data) => {
  const wordCounts = {};
  data.forEach((item) => {
    // console.log("item", item);
    const words = String(item?.article_title)?.split(" ") || [];
    words.forEach((word) => {
      const lowerWord = word.toLowerCase();
      wordCounts[lowerWord] = (wordCounts[lowerWord] || 0) + 1;
    });
  });
  return Object.entries(wordCounts).map(([text, value]) => ({ text, value }));
};

export default function handler(req, res) {
  const { csv, page = 0, pageSize = 50, searchQuery = "" } = req.query;
  const filePath = path.join(process.cwd(), csvFileMapping[csv]);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading CSV file:", err);
      res.status(500).json({ error: "Error reading CSV file" });
      return;
    }

    Papa.parse(data, {
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        const filteredData = filterData(result.data, searchQuery);
        const start = page * pageSize;
        const end = start + parseInt(pageSize);
        const paginatedData = filteredData.slice(start, end);
        const totalItems = filteredData.length;
        const wordCloudData = generateWordCloudData(filteredData);
        res.status(200).json({ paginatedData, totalItems, wordCloudData });
      },
      error: (parseError) => {
        console.error("Error parsing CSV file:", parseError);
        res.status(500).json({ error: "Error parsing CSV file" });
      },
    });
  });
}
