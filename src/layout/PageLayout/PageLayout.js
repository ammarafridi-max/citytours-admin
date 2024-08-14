import Navigation from "../Navigation/Navigation";
import styles from "./PageLayout.module.css";

export default function PageLayout({ children }) {
  return (
    <div className="row p-0 m-0">
      <Navigation />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
