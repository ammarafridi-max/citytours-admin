import styles from "./BlogCard.module.css";

export default function BlogCard(props) {
  return (
    <div className={`${styles.BlogCard} row`}>
      <div className={styles.BlogCardInterior}>
        <div className={styles.ImgDiv}>
          <img className={styles.Img} src={props.src} />
        </div>
        <div className={styles.Content}>
          <p className={styles.Title}>{props.title}</p>
          <div className="row justify-content-between">
            <a href={`/blogs/update/${props.url}`} className={styles.Btn}>
              <button className={` ${styles.UpdateBtn}`} onClick={props.onEdit}>
                Edit
              </button>
            </a>
            <a href="#" className={styles.Btn}>
              <button
                className={`${styles.DeleteBtn}`}
                onClick={props.onDelete}
              >
                Delete
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
