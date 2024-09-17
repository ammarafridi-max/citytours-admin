import styles from "./Input.module.css";

export default function Input(props) {
  return (
    <input
      type={props.type}
      className={styles.Input}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      id={props.id}
      name={props.name}
      onClick={props.onClick}
      disabled={props.disabled && true}
      checked={props.checked}
      multiple={props.multiple}
    />
  );
}
