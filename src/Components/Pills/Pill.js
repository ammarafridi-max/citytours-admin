import { useEffect } from "react";
import { useState } from "react";
import styles from "./Pill.module.css";

export default function Pill({ children }) {
  return <span className={`${styles.pill}`}>{children}</span>;
}
