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
import { getPostsWithRecentComments } from "./hntree";

// color array
const colors = [
  "#f4433672",
  "#e91e6281",
  "#9b27b07b",
  "#683ab782",
  "#3f51b582",
  "#2195f384",
  "#03a8f481",
  "#00bbd48c",
  "#0096877c",
  "#4caf4f8e",
  "#8bc34a7e",
  "#ccdc397e",
  "#ffeb3b76",
  "#ffc10786",
  "#ff990080",
  "#ff562287",
  "#79554877",
  "#9e9e9e87",
  "#607d8b86",
];

// Function to extract and clean YouTube links from comments
const extractYouTubeLinks = (comments) => {
  const youtubePattern = /(?:youtube\.com\/watch\?v=|youtu\.be\/)[^\s"']+/;
  const uniqueLinks = new Set();

  comments.forEach((comment) => {
    const commentText = he.decode(comment.actualComment.comment_text || "");
    const $ = cheerio.load(commentText);

    // Extract links from href attributes
    $("a").each((index, element) => {
      const href = $(element).attr("href");
      if (href && youtubePattern.test(href)) {
        uniqueLinks.add({
          href,
          commentText,
          hnTitle: comment.actualComment.story_title,
          commentTree: comment.commentTree,
          commentTreeArray: comment.commentTreeArray,
        });
      }
    });
  });

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

const HNVideoViewer = () => {
  const [youtubeLinks, setYoutubeLinks] = useState([]);
  const [videoTitles, setVideoTitles] = useState({});
  const [dataFetched, setDataFetched] = useState(false);

  const apiKey = "YOUR_YOUTUBE_API_KEY"; // Replace with your YouTube Data API key
  const LOCAL_STORAGE_KEY = "youtubeLinksData";
  const EXPIRY_TIME = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

  useEffect(() => {
    // Create a new Web Worker
    const hnWorker = new Worker(new URL("./hnLinksWorker.js", import.meta.url));

    const fetchComments = async () => {
      // When the worker sends back the result
      hnWorker.onmessage = async (e) => {
        const links = extractYouTubeLinks(e.data);
        setYoutubeLinks(links);

        // Fetch YouTube video titles incrementally
        const titles = {};
        for (let i = 0; i < links.length; i++) {
          const { href } = links[i];
          const videoId = href.match(/(?:watch\?v=|youtu\.be\/)([^\s"']+)/)[1];
          titles[href] = await fetchYouTubeTitle(videoId, apiKey);

          setVideoTitles((prevTitles) => ({ ...prevTitles, ...titles }));
        }

        // Save to local storage with a timestamp
        const dataToStore = { links, timestamp: Date.now() };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToStore));

        setDataFetched(true);
      };

      // Ask the worker to perform the memory-intensive task
      hnWorker.postMessage("fetchLinks");
    };

    const loadDataFromLocalStorage = () => {
      const storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      if (storedData) {
        const { links, timestamp } = storedData;
        const currentTime = Date.now();

        // Check if the data is older than 4 hours
        if (currentTime - timestamp < EXPIRY_TIME) {
          setYoutubeLinks(links);
          setDataFetched(true);
        }
      }
    };

    // Initial data loading from local storage
    loadDataFromLocalStorage();

    // Fetch fresh data in the background
    fetchComments();

    return () => {
      // Terminate the worker when the component unmounts
      hnWorker.terminate();
    };
  }, []);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  console.log({ youtubeLinks });

  return (
    <div>
      <h1 className={styles["h1-heading"]}>
        YouTube Links from Hacker News Comments
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
          {youtubeLinks.map(
            (
              { href, commentText, hnTitle, commentTree, commentTreeArray },
              index
            ) => (
              <div key={index} className={styles["youtube-block"]}>
                <iframe
                  width="100%"
                  height="200"
                  src={`https://www.youtube.com/embed/${
                    href.match(/(?:watch\?v=|youtu\.be\/)([^\s"']+)/)[1]
                  }`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                {/* <h3>{videoTitles[href]}</h3> */}
                <h3>{hnTitle}</h3>
                {/* <p dangerouslySetInnerHTML={{ __html: commentText }}></p> */}
                {/* Display the commentTreeArray using map with alternating text colors */}
                <div>
                  {commentTreeArray.map((comment, index) => (
                    <>
                      {/* [{index}] */}
                      <div
                        key={index}
                        style={{
                          backgroundColor: colors[index % colors.length],
                          padding: "5px",
                          borderRadius: "5px",
                          marginBottom: "5px",
                        }}
                        className={styles["comment-tree-node"]}
                        dangerouslySetInnerHTML={{ __html: comment.text }}
                      />
                    </>
                  ))}
                </div>
              </div>
            )
          )}
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

export default HNVideoViewer;
