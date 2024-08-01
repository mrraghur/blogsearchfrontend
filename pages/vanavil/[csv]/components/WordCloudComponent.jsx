// /pages/vanavil/[csv]/components/WordCloudComponent.jsx
"use client";

import React from "react";
import dynamic from "next/dynamic";

const WordCloud = dynamic(() => import("react-d3-cloud"), {
  ssr: false,
});

const fontSizeMapper = (word) => Math.log2(word.value) * 5;
const rotate = (word) => (word.value % 90) - 45;

const WordCloudComponent = ({ data, onWordClick }) => {
  // Transform data to the required format for react-d3-cloud
  const wordCloudData = data.map((item) => ({
    text: item.word,
    value: item.count,
  }));

  console.log("wordCloudData", wordCloudData);

  return (
    <WordCloud
      data={wordCloudData}
      fontSizeMapper={fontSizeMapper}
      rotate={rotate}
      onWordClick={(event, d) => {
        if (onWordClick) {
          onWordClick(d.text);
        }
      }}
    />
  );
};

export default WordCloudComponent;
