import styles from "./InputWithText.module.css";

export default function InputWithText(props) {
  return (
    <div className={styles.container}>
      <span>Adults</span>
      <input type="text" />
    </div>
  );
}
