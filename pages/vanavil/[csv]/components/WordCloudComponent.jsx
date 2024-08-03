// /src/components/WordCloudComponent.jsx
import React, { useCallback, useEffect, useState } from 'react';
import { removeStopwords } from 'stopword';
import dynamic from "next/dynamic";

const WordCloud = dynamic(() => import("react-wordcloud"), {
  ssr: false,
});

const WordCloudComponent = ({ data, onWordClick }) => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    if (!data) return;
    const titles = data.map(item => item.article_title).join(' ');
    const filteredWords = removeStopwords(titles.split(' '));
    const wordCount = filteredWords.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});
    const wordArray = Object.keys(wordCount).map(word => ({
      text: word,
      value: wordCount[word],
    }));
    setWords(wordArray);
  }, [data]);

  const options = {
    enableTooltip: true,
    deterministic: false,
    fontSizes: [15, 60],
    rotations: 2,
    rotationAngles: [-90, 0],
    scale: 'sqrt',
    spiral: 'archimedean',
    transitionDuration: 1000,
  };

  const callbacks = {
    onWordClick: (word) => {
      onWordClick(word.text);
    },
  };

  return (
    <div style={{ height: "calc(100vh - 100px)", width: '100%' }}>
      <WordCloud words={words} options={options} callbacks={callbacks} />
    </div>
  );
};

export default WordCloudComponent;
