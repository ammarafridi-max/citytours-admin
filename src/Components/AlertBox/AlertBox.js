import styles from "./AlertBox.module.css";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";

export default function AlertBox({ alertBox, children }) {
  const [show, setShow] = useState(
    alertBox.showAlertBox ? styles.show : styles.hidden
  );

  useEffect(() => {
    setShow(alertBox.showAlertBox ? styles.show : styles.hidden);
    const timer = setTimeout(() => {
      setShow(styles.hidden);
    }, 6000);

    return () => clearTimeout(timer);
  }, [alertBox.showAlertBox]);

  const handleClose = () => {
    setShow(styles.hidden);
  };

  const alertTypeClass =
    alertBox.type === "error"
      ? styles.error
      : alertBox.type === "success"
      ? styles.success
      : styles.info;

  return (
    <>
      <div className={`${styles.alertBg} ${show}`} onClick={handleClose}>
        <div
          className={`${styles.alertContainer} ${alertTypeClass}`}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the container
        >
          <div className={styles.alertHeader}>
            <h4 className={styles.alertTitle}>{alertBox.title}</h4>
            <button className={styles.closeIcon} onClick={handleClose}>
              <IoClose />
            </button>
          </div>
          <div className={styles.alertBody}>
            <p>{children || "This is a very important message"}</p>
          </div>
        </div>
      </div>
    </>
  );
}
