import styles from "./UpdateButton.module.css";
import { MdModeEdit } from "react-icons/md";

export default function UpdateButton({
  width,
  mt,
  mb,
  my,
  href,
  className,
  type,
  onClick,
  disabled,
  children,
}) {
  const linkStyle = {
    width: "fit-content",
  };

  const btnStyle = {
    width: width === "100%" && "100%",
    marginTop: mt || my,
    marginBottom: mb || my,
  };

  return (
    <a href={href} style={linkStyle}>
      <button
        style={btnStyle}
        className={`${className} ${styles.Btn}`}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        <MdModeEdit />
      </button>
    </a>
  );
}
