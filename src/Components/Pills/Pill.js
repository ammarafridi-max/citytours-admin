import { useEffect } from "react";
import { useState } from "react";
import styles from "./Pill.module.css";

export default function Pill({ type, text }) {
  const [className, setClassName] = useState(styles.success);

  useEffect(() => {
    if (type === "success") {
      setClassName(styles.success);
    } else if (type === "failed") {
      setClassName(styles.failed);
    } else {
      setClassName(styles.neutral);
    }
  }, [className]);

  return <span className={className}>Active</span>;
}
