import React, { useEffect } from "react";

import styles from "./slider.module.css";

const Slider = ({ handleTime }) => {
  const [one, setOne] = React.useState(0);
  const [two, setTwo] = React.useState(100);
  const [max, setMax] = React.useState(100);
  const [min, setMin] = React.useState(0);
  const [percent1, setPercent1] = React.useState(0);
  const [percent2, setPercent2] = React.useState(0);

  const slideOne = (e) => {
    setOne(e?.target?.value);
    fillColor();
  };

  const slideTwo = (e) => {
    setTwo(e?.target?.value);
    fillColor();
  };

  const fillColor = () => {
    setPercent1((one / max) * 100);
    setPercent2((two / max) * 100);
  };

  const onFilter = () => {
    handleTime({ min: one, max: two });
  };

  useEffect(() => {
    fillColor();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.values}>
        <span>Min: {one}</span>
        <span>Max: {two}</span>
      </div>
      <div className={styles.container}>
        <div
          className={styles.slider_track}
          style={{
            background: `linear-gradient(to right, var(--gray) ${percent1}% , var(--blue) ${percent1}% , var(--blue) ${percent2}%, var(--gray) ${percent2}%)`,
          }}
        ></div>
        <input
          type="range"
          min={min}
          max={max}
          value={one}
          onChange={slideOne}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={two}
          onChange={slideTwo}
        />
      </div>
      <button type="submit" className={styles.button} onClick={onFilter}>
        Filter
      </button>
    </div>
  );
};

export default Slider;
