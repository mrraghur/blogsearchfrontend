import axios from "axios";
import dotenv from "dotenv";
import curlirize from 'axios-curlirize';

//#const axiosCurlirize = require('axios-curlirize');

dotenv.config();

//https://suhail.hashnode.dev/nodejs-tutorial-how-to-easily-convert-axios-requests-to-curl-commands-with-axios-curlirize-in-nodejs-and-the-browser
curlirize(axios);

const handler = async (req, res) => {
  const { key } = req.body;
  const blogs = await axios.post(`${process.env.BACKEND_API}`, {
    searches: [
      {
        collection: "blogs",
        facet_by: "category,aud,readingtime",
        filter_by: "",
        highlight_affix_num_tokens: 20,
        highlight_full_fields: "text,title,imgs,category",
        max_facet_values: 30,
        page: 1,
        per_page: 200,
        q: `${key}`,
        num_typos: 1,
        query_by: "text,title,imgs,category",
        query_by_weights: "2,2,2,1",
        sort_by: "",
      },
    ],
  });

  //console.log("search.js data is " + blogs?.data);
  return res.status(200).json({ blogs: blogs?.data });
};

export default handler;
