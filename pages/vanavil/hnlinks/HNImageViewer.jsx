import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import he from "he";
import cheerio from "cheerio";
import Masonry from "react-masonry-css";
import styles from "./HNLinksViewer.module.css";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Function to fetch comments from the API with pagination
const fetchComments = async (query) => {
  const now = moment.utc();
  const twentyFourHoursAgo = now.subtract(15, "days").unix();

  const params = {
    tags: "comment",
    numericFilters: `created_at_i>${twentyFourHoursAgo}`,
    query: query,
  };

  const url = "https://hn.algolia.com/api/v1/search";
  let page = 0;
  let comments = [];
  let nbPages = 1;

  try {
    while (page < nbPages) {
      const response = await axios.get(url, { params: { ...params, page } });
      if (response.status === 200) {
        comments = comments.concat(response.data.hits || []);
        nbPages = response.data.nbPages;
        page += 1;
      } else {
        console.error("Error fetching data", response.status);
        break;
      }
    }
  } catch (error) {
    console.error("Error fetching data", error);
  }

  return comments;
};

// Function to fetch all comments with YouTube links
const getCommentsWithLinks = async () => {
  const youtubeComments = await fetchComments("i.imgur.com");
  const youtubeComments2 = await fetchComments("i.redd.it");
  const youtubeComments3 = await fetchComments("http*jpeg");

  const comments = youtubeComments
    .concat(youtubeComments2)
    .concat(youtubeComments3);

  //const youtubePattern = /(?:youtube\.com\/watch\?v=|youtu\.be\/)[^\s"']+/;
  const youtubePattern1 = /(https:\/\/i.imgur.com\/.*)[^\s"']+" /;
  const youtubePattern2 = /(https:\/\/i.redd.it\/.*)[^\s"']+" /;
  const youtubePattern3 = /(https:\/\/.*\/.*jpeg)[^\s"']+/;
  const uniqueLinks = new Set();

  comments.forEach(async (comment) => {
    //console.log("comment parent is " + comment.id);
    const commentText = he.decode(comment.comment_text || "");
    const $ = cheerio.load(commentText);
    const parentId = comment.parent_id;
    if (youtubePattern1.test(commentText)) {
      var array = youtubePattern1.exec(commentText);
      for (let i = 0; i < array.length; i++) {
        uniqueLinks.add(array[i]);
      }
    } else if (youtubePattern2.test(commentText)) {
      var array = youtubePattern2.exec(commentText);
      for (let i = 0; i < array.length; i++) {
        uniqueLinks.add(array[i]);
      }
    } else if (youtubePattern3.test(commentText)) {
      var array = youtubePattern3.exec(commentText);
      for (let i = 0; i < array.length; i++) {
        console.log("adding " + i + " === " + array[i]);
        uniqueLinks.add(array[i]);
      }
    }

    // Extract links from href attributes
    //$("a").each((index, element) => {
    //  const href = $(element).attr("href");
    //  if (href && youtubePattern.test(href)) {
    //    uniqueLinks.add({ href, commentText, hnTitle: comment.story_title });
    //  }
    //});
  });
  console.log("uniqueLinks is " + uniqueLinks);

  return Array.from(uniqueLinks);
};

// Function to fetch YouTube video titles
const fetchYouTubeTitle = async (videoId, apiKey) => {
  return "Unknown Title";
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;
  try {
    const response = await axios.get(url);
    if (response.status === 200 && response.data.items.length > 0) {
      return response.data.items[0].snippet.title;
    } else {
      console.error("Error fetching YouTube title", response.status);
      return "Unknown Title";
    }
  } catch (error) {
    console.error("Error fetching YouTube title", error);
    return "Unknown Title";
  }
};

const HNImageViewer = () => {
  const [youtubeLinks, setYoutubeLinks] = useState([]);
  const [videoTitles, setVideoTitles] = useState({});
  const [dataFetched, setDataFetched] = useState(false);

  const apiKey = "YOUR_YOUTUBE_API_KEY"; // Replace with your YouTube Data API key

  useEffect(() => {
    const fetchComments = async () => {
      const links = await getCommentsWithLinks();

      console.log("links length is " + links.length);
      setYoutubeLinks(links);

      //// Fetch YouTube video titles incrementally
      //const titles = {};
      //for (let i = 0; i < links.length; i++) {
      //  const { href } = links[i];
      //  const videoId = href.match(/(?:watch\?v=|youtu\.be\/)([^\s"']+)/)[1];
      //  titles[href] = await fetchYouTubeTitle(videoId, apiKey);

      //  setVideoTitles((prevTitles) => ({ ...prevTitles, ...titles }));
      //}
      setDataFetched(true);
    };

    fetchComments();
  }, [apiKey]);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <div>
      <h1 className={styles["h1-heading"]}>
        Image Links from Hacker News Comments
      </h1>
      {dataFetched == false ? (
        <div className={styles["loader"]}>
          Please wait while we fetch the data...
          <LinearProgress />
        </div>
      ) : youtubeLinks.length > 0 ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={styles["my-masonry-grid"]}
          columnClassName={styles["my-masonry-grid_column"]}
        >
          {youtubeLinks.map((item, index) => (
            <img src={item} />
          ))}
        </Masonry>
      ) : (
        <div className={styles["loader"]}>
          No Links were found at the moment. Please Try again later. If the
          issue still persists, please contact us. Sorry for the inconvenience
        </div>
      )}
    </div>
  );
};

export default HNImageViewer;