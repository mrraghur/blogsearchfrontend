//src/components/Pagination.jsx
import styles from './Pagination.module.css';

export default function Pagination({ totalPages, currentPage, setCurrentPage }) {
  const createPagination = (totalPages, page) => {
    const paginationItems = [];
    let beforePage = page - 1;
    let afterPage = page + 1;

    if (page > 1) {
      paginationItems.push(
        <li key="prev" className={`${styles.btn} ${styles.prev}`} onClick={() => setCurrentPage(page - 1)}>
          <span>&#8249; Prev</span>
        </li>
      );
    }

    if (page > 2) {
      paginationItems.push(
        <li key="first" className={styles.numb} onClick={() => setCurrentPage(1)}>
          <span>1</span>
        </li>
      );
      if (page > 3) paginationItems.push(<li key="dots1" className={styles.dots}><span>...</span></li>);
    }

    if (page === totalPages) beforePage -= 2;
    else if (page === totalPages - 1) beforePage -= 1;

    if (page === 1) afterPage += 2;
    else if (page === 2) afterPage += 1;

    for (let plength = beforePage; plength <= afterPage; plength++) {
      if (plength > totalPages) continue;
      if (plength === 0) plength = 1;

      paginationItems.push(
        <li
          key={plength}
          className={`${styles.numb} ${page === plength ? styles.active : ''}`}
          onClick={() => setCurrentPage(plength)}
        >
          <span>{plength}</span>
        </li>
      );
    }

    if (page < totalPages - 1) {
      if (page < totalPages - 2) paginationItems.push(<li key="dots2" className={styles.dots}><span>...</span></li>);
      paginationItems.push(
        <li key="last" className={styles.numb} onClick={() => setCurrentPage(totalPages)}>
          <span>{totalPages}</span>
        </li>
      );
    }

    if (page < totalPages) {
      paginationItems.push(
        <li key="next" className={`${styles.btn} ${styles.next}`} onClick={() => setCurrentPage(page + 1)}>
          <span>Next &#8250;</span>
        </li>
      );
    }

    return paginationItems;
  };

  return (
    <div className={styles.pagination}>
      <ul>
        {createPagination(totalPages, currentPage)}
      </ul>
    </div>
  );
}