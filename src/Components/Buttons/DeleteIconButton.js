import styles from "./DeleteIconButton.module.css";
import { FaTrash } from "react-icons/fa";

export default function DeleteIconButton({
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
        <FaTrash />
      </button>
    </a>
  );
}
