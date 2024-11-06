import React from "react";
import styles from "./FilterOptions.module.css"; // Import the CSS module

const FilterOptions = ({ filters, setFilters }) => {
  console.log({ filters });

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Filter Options</h2>

      {/* Image Type Filter */}
      <div>
        <h3 className={styles.subHeading}>Image Type</h3>
        <div className={styles.listItem}>
          <input
            type="checkbox"
            id="imageTypeFilter"
            name="imageTypeFilter"
            value="imageTypeFilter"
            checked={filters.imageType.status}
            onChange={(e) => {
              setFilters({
                ...filters,
                imageType: {
                  ...filters.imageType,
                  status: e.target.checked
                }
              });
            }}
          />
          <label htmlFor="imageTypeFilter" className={styles.checkboxLabel}>
            Use Image Type Filter
          </label>
        </div>

        {filters.imageType.status && (
          <ul className={styles.list}>
            {filters.imageType.options.map((option) => (
              <li key={option} className={styles.listItem}>
                <input
                  type="checkbox"
                  id={option}
                  name={option}
                  value={option}
                  checked={filters.imageType.selected.includes(option)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        imageType: {
                          ...filters.imageType,
                          selected: [...filters.imageType.selected, option]
                        }
                      });
                    } else {
                      setFilters({
                        ...filters,
                        imageType: {
                          ...filters.imageType,
                          selected: filters.imageType.selected.filter(
                            (selectedOption) => selectedOption !== option
                          )
                        }
                      });
                    }
                  }}
                />
                <label htmlFor={option} className={styles.label}>
                  {option}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Black and White Ratio Filter */}
      <div>
        <h3 className={styles.subHeading}>Black and White Ratio</h3>
        <div className={styles.listItem}>
          <input
            type="checkbox"
            id="BWRatio"
            name="BWRatio"
            value="BWRatio"
            checked={filters.BWRatio.status}
            onChange={(e) => {
              setFilters({
                ...filters,
                BWRatio: {
                  ...filters.BWRatio,
                  status: e.target.checked
                }
              });
            }}
          />
          <label htmlFor="BWRatio" className={styles.label}>
            Black and White Ratio
          </label>
        </div>

        {filters.BWRatio.status && (
          <div>
            <select
              className={styles.select}
              value={filters.BWRatio.type}
              onChange={(e) => {
                setFilters({
                  ...filters,
                  BWRatio: {
                    ...filters.BWRatio,
                    type: e.target.value
                  }
                });
              }}
            >
              <option value="more than">More than</option>
              <option value="less than">Less than</option>
            </select>
            <input
              type="number"
              className={styles.input}
              value={filters.BWRatio.ratio}
              onChange={(e) => {
                setFilters({
                  ...filters,
                  BWRatio: {
                    ...filters.BWRatio,
                    ratio: e.target.value
                  }
                });
              }}
            />
          </div>
        )}
      </div>

      {/* Logo Filter */}
      <div>
        <h3 className={styles.subHeading}>Logo Filter</h3>
        <select
          className={styles.select}
          value={filters.logoFilter}
          onChange={(e) => {
            setFilters({
              ...filters,
              logoFilter: e.target.value
            });
          }}
        >
          <option value="both">Both</option>
          <option value="with_logo">With Logo</option>
          <option value="without_logo">Without Logo</option>
        </select>
      </div>

      {/* Human Detection Filter */}
      <div>
        <h3 className={styles.subHeading}>Human Detection</h3>
        <div className={styles.listItem}>
          <input
            type="checkbox"
            id="humanDetection"
            name="humanDetection"
            value="humanDetection"
            checked={filters.humanDetection.status}
            onChange={(e) => {
              setFilters({
                ...filters,
                humanDetection: {
                  ...filters.humanDetection,
                  status: e.target.checked
                }
              });
            }}
          />
          <label htmlFor="humanDetection" className={styles.label}>
            Number of Humans
          </label>
        </div>

        {filters.humanDetection.status && (
          <input
            type="number"
            className={styles.input}
            value={filters.humanDetection.number || ""}
            onChange={(e) => {
              setFilters({
                ...filters,
                humanDetection: {
                  ...filters.humanDetection,
                  number: e.target.value
                }
              });
            }}
            placeholder="Enter number of humans"
          />
        )}
      </div>
    </div>
  );
};

export default FilterOptions;
