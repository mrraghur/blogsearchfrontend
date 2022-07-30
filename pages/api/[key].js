// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const handler = async (req, res) => {
  const { key } = req.query;
  const { page, per_page } = JSON.parse(req.body);

  const blogs = await axios.post(`${process.env.BACKEND_API}`, {
    searches: [
      {
        collection: "blogs",
        facet_by: "category,aud,readingtime",
        filter_by: "",
        highlight_affix_num_tokens: 20,
        highlight_full_fields: "text,title,imgs,category",
        max_facet_values: 30,
        page: page,
        per_page: per_page,
        q: `${key}`,
        query_by: "text,title,imgs,category",
        sort_by: "",
      },
    ],
  });

  return res.status(200).json({ blogs: blogs?.data });
};

export default handler;
