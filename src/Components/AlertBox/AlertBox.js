import styles from "./AlertBox.module.css";
import { IoMdCloseCircle } from "react-icons/io";
import { useState } from "react";

export default function AlertBox({ type, children }) {
  const [show, setShow] = useState(true);

  function closeAlertBox() {
    setShow(false);
  }

  return (
    <>
      {show && (
        <div
          className={`row m-0
          ${styles.AlertBox}
          ${type === "success" && styles.Success}
          ${type === "error" && styles.Danger}
          `}
        >
          <p className={styles.Text}>{children}</p>
          {/* <div className="col-1 text-end">
            <IoMdCloseCircle className={styles.Icon} onClick={closeAlertBox} />
          </div> */}
        </div>
      )}
    </>
  );
}
