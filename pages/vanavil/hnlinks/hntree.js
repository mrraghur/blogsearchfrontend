import axios from "axios";
import moment from "moment";

function buildCommentArrayFromTree(obj) {
  if (!obj) return [];
  const result = [];
  const stack = [obj];
  while (stack.length > 0) {
    const current = stack.pop();
    const { child, ...comment } = current; // Destructure the "child" key from current
    result.push(comment);
    if (current.child) {
      stack.push(current.child);
    }
  }
  return result;
}

// Function to fetch comments from the API in the last 24 hours
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

// Function to fetch detailed story by story ID
const fetchStory = async (storyId) => {
  const url = `https://hn.algolia.com/api/v1/items/${storyId}`;

  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Error fetching story", response.status);
    }
  } catch (error) {
    console.error("Error fetching story", error);
  }

  return null;
};

// Recursive function to search for a specific comment by ID and build its tree
const findAndBuildCommentTree = (currentComment, targetCommentId) => {
  // If the current comment matches the target, build the tree from here
  if (currentComment.id === targetCommentId) {
    const commentTree = {
      text: currentComment.text,
      author: currentComment.author,
      created_at: currentComment.created_at,
      child: null,
    };

    return commentTree; // Return the built tree for this comment
  }

  // Recursively search in child comments if the current comment doesn't match
  if (currentComment.children && currentComment.children.length > 0) {
    for (const child of currentComment.children) {
      const found = findAndBuildCommentTree(child, targetCommentId);
      if (found) {
        const { children, ...commentTree } = currentComment; // Remove all unnecessary children from the parent
        commentTree.child = found;
        return commentTree; // If the target comment is found, return the tree
      }
    }
  }

  return null; // Return null if the comment is not found in this subtree
};

// Main function to fetch comments and build the comment tree
export const getPostsWithRecentComments = async (query) => {
  const comments = await fetchComments(query);

  // Create an array to store results with the comment tree
  const postsWithCommentTrees = [];
  let i = 1;
  let total = comments.length;

  for (const comment of comments) {
    // Fetch the detailed story of the comment using story_id
    const story = await fetchStory(comment.story_id);

    if (story) {
      // Apply DFS to find the specific comment in the story and build the tree
      const commentTree = findAndBuildCommentTree(
        story,
        parseInt(comment.objectID)
      );

      const commentTreeArray = buildCommentArrayFromTree(commentTree);

      // removing 1st element as it is the article itself
      commentTreeArray.shift();

      console.log({ commentTreeArray });

      console.log(`Completed building comment tree for ${i}/${total}`);
      i++;

      // If the comment tree is found, add it to the result array
      if (commentTree) {
        postsWithCommentTrees.push({
          storyTitle: story.title,
          storyId: story.id,
          commentTree: commentTree,
          actualComment: comment,
          commentTreeArray: commentTreeArray,
        });
      }
    }
    return postsWithCommentTrees;
  }

  return postsWithCommentTrees;
};
