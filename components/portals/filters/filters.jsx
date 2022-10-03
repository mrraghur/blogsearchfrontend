import _ from "lodash";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { FiSearch } from "react-icons/fi";
import { GoSettings } from "react-icons/go";

import Slider from "../../slider/slider";
import styles from "./filters.module.css";

const FPortal = ({
  handleCategories,
  handleAudiences,
  resetAll,
  handleTime,
  datas,
  handleCountries,
  handleNames,
}) => {
  const [audiences, setAudiences] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [countries, setCountries] = React.useState([]);
  const [names, setNames] = React.useState([]);

  const [shownames, setShownames] = React.useState(false);
  const [showCountries, setShowCountries] = React.useState(false);

  const { register, handleSubmit, reset } = useForm();
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    reset: reset1,
  } = useForm();
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    reset: reset2,
  } = useForm();

  const handleReset = () => {
    reset({
      beginner: false,
      intermediate: false,
      expert: false,
      category: false,
    });
    resetAll();
  };

  useEffect(() => {
    setAudiences(_.countBy(datas?.hits?.map((data) => data.document?.aud)));
    setCategories(
      _.countBy(datas?.hits?.map((data) => data.document?.category))
    );
    setCountries(
      _.countBy(datas?.hits?.map((data) => data.document?.countries))
    );
    setNames(_.countBy(datas?.hits?.map((data) => data.document?.names)));
  }, [datas]);

  const handleShowCountries = () => {
    setShownames(false);
    setShowCountries(!showCountries);
  };

  const handleShowNames = () => {
    setShowCountries(false);
    setShownames(!shownames);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header_name}>
          <GoSettings className={styles.icon} />
          <p>Filters</p>
        </div>
        <div className={styles.header_collapse}>
          {/* <AiOutlineLeft className={styles.icon} /> */}
        </div>
      </div>
      <div className={styles.categories}>
        <div className={styles.categories_header}>
          <p>Refine By:</p>
        </div>
        <div className={styles.title}>
          <p>Categories</p>
        </div>
        <div className={styles.categories_search}>
          <FiSearch className={styles.icon} />
          <input type="text" placeholder="Search categories" />
        </div>
        <div className={styles.list}>
          {Object.keys(categories).map((category, index) => (
            <div className={styles.list_item} key={index}>
              <div className={styles.item_left}>
                <input
                  type="checkbox"
                  onChange={(e) => handleCategories(e, category)}
                  // {...register("category")}
                />
                <p>{category}</p>
              </div>
              <div className={styles.item_right}>
                <p>{categories[category]}</p>
              </div>
            </div>
          ))}
        </div>
        <button className={styles.button}>Show more</button>
      </div>
      <div className={styles.audience}>
        <div className={styles.title}>
          <p>Audience</p>
        </div>
        <form className={styles.list} onSubmit={handleSubmit(handleAudiences)}>
          {Object.keys(audiences).map((audience, index) => (
            <div className={styles.list_item} key={index}>
              <div className={styles.item_left}>
                <input type="checkbox" {...register(`${audience}`)} />
                <p>{audience}</p>
              </div>
              <div className={styles.item_right}>
                <p>{audiences[audience]}</p>
              </div>
            </div>
          ))}
          <button type="submit" className={styles.button}>
            Filter
          </button>
        </form>
      </div>
      <div className={styles.audience}>
        <div className={styles.title}>
          <p>Countries</p>
        </div>
        <form className={styles.list} onSubmit={handleSubmit1(handleCountries)}>
          {showCountries ? (
            <>
              {Object.keys(countries).map((country, index) => (
                <div className={styles.list_item} key={index}>
                  <div className={styles.item_left}>
                    <input type="checkbox" {...register1(`${country}`)} />
                    <p>{country}</p>
                  </div>
                  <div className={styles.item_right}>
                    <p>{countries[country]}</p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {Object.keys(countries)
                .slice(0, 5)
                .map((country, index) => (
                  <div className={styles.list_item} key={index}>
                    <div className={styles.item_left}>
                      <input type="checkbox" {...register1(`${country}`)} />
                      <p>{country}</p>
                    </div>
                    <div className={styles.item_right}>
                      <p>{countries[country]}</p>
                    </div>
                  </div>
                ))}
            </>
          )}
          <button
            type="button"
            className={styles.button}
            onClick={handleShowCountries}
          >
            {showCountries ? `Show less` : `Show more`}
          </button>
          <button type="submit" className={styles.button}>
            Filter
          </button>
        </form>
      </div>
      <div className={styles.audience}>
        <div className={styles.title}>
          <p>Names</p>
        </div>
        <form className={styles.list} onSubmit={handleSubmit2(handleNames)}>
          {shownames ? (
            <>
              {Object.keys(names).map((name, index) => (
                <div className={styles.list_item} key={index}>
                  <div className={styles.item_left}>
                    <input type="checkbox" {...register2(`${name}`)} />
                    <p>{name}</p>
                  </div>
                  <div className={styles.item_right}>
                    <p>{names[name]}</p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {Object.keys(names)
                .slice(0, 5)
                .map((name, index) => (
                  <div className={styles.list_item} key={index}>
                    <div className={styles.item_left}>
                      <input type="checkbox" {...register2(`${name}`)} />
                      <p>{name}</p>
                    </div>
                    <div className={styles.item_right}>
                      <p>{names[name]}</p>
                    </div>
                  </div>
                ))}
            </>
          )}
          <button
            type="button"
            className={styles.button}
            onClick={handleShowNames}
          >
            {shownames ? `Show less` : `Show more`}
          </button>
          <button type="submit" className={styles.button}>
            Filter
          </button>
        </form>
      </div>
      <div className={styles.time}>
        <div className={styles.title}>
          <p>Reading time (minutes)</p>
        </div>
        <Slider handleTime={handleTime} />
        <button className={styles.button} onClick={handleReset}>
          Clear filters
        </button>
      </div>
    </div>
  );
};

export default FPortal;
