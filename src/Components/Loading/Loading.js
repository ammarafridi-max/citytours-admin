import styles from "./Loading.module.css";
import spinner from "./spinner.gif";

export default function Loading() {
  return (
    <div style={{ position: "relative" }}>
      <div className={styles.spinnerDiv}>
        <img src={spinner} className={styles.spinner} />
      </div>
    </div>
  );
}
