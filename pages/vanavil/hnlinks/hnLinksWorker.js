// hnLinksWorker.js
import { getPostsWithRecentComments } from "./hntree";

// Function to fetch all comments with YouTube links
const getCommentsWithLinks = async () => {
  const youtubeComments = await getPostsWithRecentComments("youtube.com");
  const youtuBeComments = await getPostsWithRecentComments("youtu.be");
  
  // Combine both results
  return youtubeComments.concat(youtuBeComments);
};

onmessage = async (e) => {
  if (e.data === "fetchLinks") {
    // Execute the memory-intensive task
    const result = await getCommentsWithLinks();
    
    // Send the result back to the main thread
    postMessage(result);
  }
};
