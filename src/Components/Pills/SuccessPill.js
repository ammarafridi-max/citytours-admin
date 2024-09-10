import styles from "./Pill.module.css";

export default function SuccessPill({ children }) {
  return <span className={`${styles.pill} ${styles.success}`}>{children}</span>;
}
