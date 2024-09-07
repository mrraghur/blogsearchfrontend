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

// Function to fetch comments from the API with pagination
const fetchComments = async (query) => {
  const now = moment.utc();
  const twentyFourHoursAgo = now.subtract(1, "days").unix();

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
  // const trial = await getCommentParentTree({ parent_id: 41471572 });
  // const trial = await getPostsWithRecentComments("On the efficiency angle, I think a big ");
  // console.log(trial);
  // return []

  const youtubeComments = await getPostsWithRecentComments("youtube.com");
  const youtuBeComments = await getPostsWithRecentComments("youtu.be");

  return youtubeComments.concat(youtuBeComments);
};

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

const HNLinksViewer = () => {
  const [youtubeLinks, setYoutubeLinks] = useState([]);
  const [videoTitles, setVideoTitles] = useState({});
  const [dataFetched, setDataFetched] = useState(false);

  const apiKey = "YOUR_YOUTUBE_API_KEY"; // Replace with your YouTube Data API key

  useEffect(() => {
    const fetchComments = async () => {
      const comments = await getCommentsWithLinks();
      const links = extractYouTubeLinks(comments);
      setYoutubeLinks(links);

      // Fetch YouTube video titles incrementally
      const titles = {};
      for (let i = 0; i < links.length; i++) {
        const { href } = links[i];
        const videoId = href.match(/(?:watch\?v=|youtu\.be\/)([^\s"']+)/)[1];
        titles[href] = await fetchYouTubeTitle(videoId, apiKey);

        setVideoTitles((prevTitles) => ({ ...prevTitles, ...titles }));
      }
      setDataFetched(true);
    };

    fetchComments();
  }, [apiKey]);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  console.log({youtubeLinks});

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
          {youtubeLinks.map(({ href, commentText, hnTitle, commentTree }, index) => (
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
              <p dangerouslySetInnerHTML={{ __html: commentText }}></p>
            </div>
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

export default HNLinksViewer;

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
