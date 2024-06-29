import styles from "./Counter.module.css";
import { Remove } from "@mui/icons-material";
import { Add } from "@mui/icons-material";
import { useState } from "react";

export default function Counter(props) {
  const [count, setCount] = useState(props.value);

  function increment() {
    setCount((prevState) => {
      if (prevState < 12) {
        return prevState + 1;
      } else {
        return prevState;
      }
    });
    props.setCount((prevCount) => prevCount + 1);
  }

  function decrement() {
    setCount((prevState) => {
      if (prevState > 1) {
        return prevState - 1;
      } else {
        return prevState;
      }
    });
    props.setCount((prevCount) => prevCount - 1);
  }

  return (
    <div className={styles.CounterDiv}>
      <div className={styles.IconDiv} onClick={decrement}>
        <Remove />
      </div>
      <input
        type="text"
        className={styles.Count}
        value={count} // Use local count state here
        onChange={props.onChange}
        disabled
      />
      <div className={styles.IconDiv} onClick={increment}>
        <Add />
      </div>
    </div>
  );
}
