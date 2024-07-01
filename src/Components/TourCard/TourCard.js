import styles from "./TourCard.module.css";
import { Link } from "react-router-dom";

export default function TourCard({ image, name, url }) {
  return (
    <div className={styles.Card}>
      <Link className={styles.Btn} to={`/tours/update/${url}`}>
        <div className={styles.ImgDiv}>
          <img src={image} className={styles.Img} />
        </div>
        <div className={styles.Content}>
          <p className={styles.Title}>{name}</p>
          <div className="row p-0 m-0 justify-content-between"></div>
        </div>
      </Link>
    </div>
  );
}
