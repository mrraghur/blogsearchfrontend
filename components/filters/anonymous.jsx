import _ from "lodash";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { GoSettings } from "react-icons/go";

import styles from "./filters.module.css";

const AnonymousFilters = ({ data }) => {
  const [filters, setFilters] = React.useState([]);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (data[0]?.Continent) {
      const continents = data.map((item) => {
        return item.Continent;
      });

      const countries = data.map((item) => {
        return item.Country;
      });

      setFilters([
        ...filters,
        {
          title: "Continents",
          data: _.countBy(continents),
        },
        {
          title: "Countries",
          data: _.countBy(countries),
        },
      ]);
    }
  }, [data]);

  const handleFilter = (title) => (data) => {
    console.log(title);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header_name}>
          <GoSettings className={styles.icon} />
          <p>Filters</p>
        </div>
      </div>
      {filters?.map((filter, index) => (
        <div className={styles.audience} key={index}>
          <div className={styles.title}>
            <p>{filter?.title}</p>
          </div>
          <form
            className={styles.list}
            onSubmit={handleSubmit(handleFilter(filter?.title))}
          >
            {Object.keys(filter?.data)
              .slice(0, 5)
              .map((item, index) => (
                <div className={styles.list_item} key={index}>
                  <div className={styles.item_left}>
                    <input
                      type="checkbox"
                      {...register(`${filter?.title}_${item}`)}
                    />
                    <p>{item}</p>
                  </div>
                  <div className={styles.item_right}>
                    <p>{Object.values(filter?.data)[index]}</p>
                  </div>
                </div>
              ))}
            <button type="submit" className={styles.button}>
              Filter
            </button>
          </form>
          {Object.keys(filter?.data).length > 5 && (
            <button className={styles.button}>Show more</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default AnonymousFilters;
