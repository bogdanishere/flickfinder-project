import styles from "../styles/pages/spinner.module.scss";

function Spinner() {
  return (
    <div className={styles["spinner-container"]}>
      <div className={styles["spinner"]}></div>
    </div>
  );
}

export default Spinner;
