import styles from "./Feedback.module.css";

export default function Feedback({ children, className, type }) {
  return (
    <div className={`${styles.feedback} ${styles[type]} ${className}`}>
      <p>{children}</p>
    </div>
  );
}
