import { useState } from "react";
import axios from "axios";
import styles from "./ImageAnalyzer.module.css"; // Import the CSS module

export default function CheckImage() {
  const [imageURL, setImageURL] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [tolerance, setTolerance] = useState(0.1);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  //const bwDetectorUrl = "http://localhost:3007/check-image";
  //TODO: Add this to .env file
  const bwDetectorUrl = "https://dev.interviewblindspots.com/displaycode/check-image/";

  const handleURLSubmit = async () => {
    if (!imageURL) return;

    setLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("url", imageURL);
    formData.append("tolerance", tolerance);

    try {
      const response = await axios.post(
        bwDetectorUrl,
        formData
      );
      setResult(response.data);
    } catch (err) {
      setError("Failed to fetch data. Please check the URL and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileSubmit = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("tolerance", tolerance);

    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        bwDetectorUrl,
        formData
      );
      setResult(response.data);
    } catch (err) {
      setError(
        "Failed to fetch data. Please check the image file and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImageURL("");
    setImageFile(null);
    setPreviewURL("");
    setResult(null);
    setError("");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setImageFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Check if an Image is Black and White</h1>

      <div className={styles.inputContainer}>
        <h2 className={styles.subheading}>Enter Image URL</h2>
        <div className={styles.urlInputWrapper}>
          <input
            type="text"
            placeholder="Enter image URL"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            className={styles.inputField}
          />
          <button onClick={handleReset} className={styles.resetButton}>
            Reset
          </button>
        </div>
        <button onClick={handleURLSubmit} className={styles.button}>
          Check URL
        </button>
      </div>

      <div
        className={`${styles.dropZone} ${dragging ? styles.dragging : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <h2 className={styles.subheading}>Or Upload an Image</h2>
        <p className={styles.dropZoneText}>
          {dragging
            ? "Drop your image here"
            : "Drag & drop an image or click to select"}
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.fileInput}
        />
        {previewURL && (
          <div className={styles.previewContainer}>
            <img src={previewURL} alt="Preview" className={styles.previewImage} />
          </div>
        )}
        <button onClick={handleFileSubmit} className={styles.button}>
          Check File
        </button>
      </div>

      <div>
        <h2 className={styles.subheading}>Set Tolerance Level</h2>
        <input
          type="number"
          step="0.01"
          min="0"
          max="1"
          value={tolerance}
          onChange={(e) => setTolerance(e.target.value)}
          className={styles.inputField}
        />
      </div>

      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {result && (
        <div className={styles.result}>
          <p className={styles.resultText}>
            <strong>Is Black and White:</strong>{" "}
            {result.is_black_and_white ? "Yes" : "No"}
          </p>
          <p className={styles.resultText}>
            <strong>Black-and-White Ratio:</strong> {result.bwRatio.toFixed(2)}
          </p>
          <p className={styles.resultText}>
            <strong>Used Tolerance:</strong> {result.tolerance}
          </p>
        </div>
      )}
    </div>
  );
}
