import styles from "./Select.module.css";

export default function Select(props) {
  return (
    <div className={styles.SelectDiv}>
      <select
        className={styles.Select}
        onChange={props.onChange}
        onClick={props.onClick}
        value={props.value}
      >
        {props.children}
      </select>
    </div>
  );
}
