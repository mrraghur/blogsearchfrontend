import axios from "axios";

const handler = async (req, res) => {
  console.log(req.body);

  // await axios
  //   .post(`${process.env.BACKEND_API}/upload/`, {
  //     file: req.body,
  //   })
  //   .then((res) => {
  //     console.log(res);
  //     return res.status(200).json({ file: res?.data });
  //   });

  return { file: "file" };
};

export default handler;
