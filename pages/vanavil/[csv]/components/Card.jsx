import React, { useState } from "react";
import FullScreenModal from "./FullScreenModal";
import styles from "./Page.module.css";

function getDomainName(url) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.origin;
  } catch (error) {
    console.log("Invalid URL:", url);
    console.error("Invalid URL:", error);
    return null;
  }
}

const Card = ({ image }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <div className={styles["card"]}>
        {/* Display image */}
        <img
          src={
            image?.image_url?.startsWith("http")
              ? image.image_url
              : `${getDomainName(image.article_url)}${image.image_url}`
          }
          loading="lazy"
          alt={image.image_alt || "Image"}
          onClick={openModal}
        />

        {/* Display basic information */}
        <h3>{image.image_alt}</h3>
        <h4>{image.article_title}</h4>

        {/* Display additional details */}
        <p><strong>Caption:</strong> {image.caption || "No caption available"}</p>
        <p><strong>Detailed Caption:</strong> {image.detailed_caption || "No detailed caption available"}</p>
        <p><strong>More Detailed Caption:</strong> {image.more_detailed_caption || "No more detailed caption available"}</p>
        <p><strong>BW Ratio:</strong> {image.bw_ratio || "Unavailable"}</p>
        <p><strong>Logo Detection:</strong> {image.logo_detection_img}</p>
        <p><strong>Human Detected:</strong> {image.human_detected}</p>

        {/* Display article link */}
        <a href={image.article_url} target="_blank" rel="noopener noreferrer">
          Read More
        </a>
      </div>

      {/* Full Screen Modal for Image */}
      <FullScreenModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        image={image}
      />
    </div>
  );
};

export default Card;
