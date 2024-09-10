import styles from "./Pill.module.css";

export default function DangerPill({ children }) {
  return <span className={`${styles.pill} ${styles.danger}`}>{children}</span>;
}
