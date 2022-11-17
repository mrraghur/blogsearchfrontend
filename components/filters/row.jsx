import React from "react";
import { useForm } from "react-hook-form";

import styles from "./row.module.css";

const Row = ({ filter, data, handleFilter, handleReset }) => {
  //configs
  const { register, handleSubmit } = useForm();

  //local data
  const [num, setNum] = React.useState(5);
  const [more, setMore] = React.useState(false);
  const [text, setText] = React.useState("Show more");

  const submit = (data) => {
    const one = Object.keys(data).filter((value) => data[value] === true);

    if (one.length > 0) {
      const two = one[0].split("_");
      const three = two[1];
      handleFilter(filter, three);
    } else {
      handleReset();
    }
  };

  const handleMore = () => {
    if (num === 5) {
      setNum(Object.keys(data[filter]).length - 1);
      setText("Show less");
    } else {
      setText("Show more");
      setNum(5);
    }
  };

  React.useEffect(() => {
    if (Object.keys(data[filter]).length > 5) {
      setMore(true);
    }
  }, [data, filter]);

  return (
    <div className={styles.audience}>
      <div className={styles.title}>
        <p>{filter.trim()}</p>
      </div>
      <form className={styles.list} onSubmit={handleSubmit(submit)}>
        {Object?.keys(data[filter])
          .slice(0, num)
          .map((item, index) => (
            <div className={styles.list_item} key={index}>
              <div className={styles.item_left}>
                <input type="checkbox" {...register(`one_${item.trim()}`)} />
                <p>{item.trim()}</p>
              </div>
              <div className={styles.item_right}>
                <p>{data[filter][item]}</p>
              </div>
            </div>
          ))}
        <button type="submit" className={styles.button}>
          Filter
        </button>
      </form>
      {more && (
        <button className={styles.button} onClick={handleMore}>
          {text}
        </button>
      )}
    </div>
  );
};

export default Row;
