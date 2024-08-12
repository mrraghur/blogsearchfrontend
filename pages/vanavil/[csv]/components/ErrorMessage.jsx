import styles from "./Error.module.css";

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className={styles["error-container"]}>
      <span className={styles["error-icon"]}>⚠️</span>
      <span className={styles["error-text"]}>{message}</span>
      {onRetry && (
        <button className={styles["error-retry-button"]} onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
