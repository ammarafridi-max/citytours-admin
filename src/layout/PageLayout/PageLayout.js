import Navigation from "../Navigation/Navigation";
import styles from "./PageLayout.module.css";

export default function PageLayout({ children }) {
  return (
    <div className={styles.outer}>
      <div className={styles.container}>
        <Navigation />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
