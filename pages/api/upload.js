// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const handler = async (req, res) => {
  // const { file } = req.body;
  // console.log(req.file);

  const data = await axios.post(
    `${process.env.BACKEND_API}/displaycode/upload/`,
    {
      file: req.body,
    }
  );

  return res.status(200).json({ file: data?.data });
};

export default handler;
