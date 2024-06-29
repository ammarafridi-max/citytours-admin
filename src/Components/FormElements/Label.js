import styles from "./Label.module.css";

export default function Label(props) {
  return (
    <label
      className={`${styles.Label} ${props.className}`}
      htmlFor={props.htmlFor}
    >
      {props.children}
    </label>
  );
}
