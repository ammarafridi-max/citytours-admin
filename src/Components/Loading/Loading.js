import styles from "./Loading.module.css";
import spinner from "./spinner.gif";

export default function Loading() {
  return (
    <div style={{ position: "relative" }}>
      <div className={styles.spinnerDiv}>
        <div className={styles.ldsRing}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
