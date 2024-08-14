import { useState } from "react";
import styles from "./BlogCard.module.css";
import { Link } from "react-router-dom";

function BlogCard({ title, img, description, tag, dateCreated, url }) {
  const blog = {
    title: "How to build your dream holiday package?",
    description:
      "It doesn't have to be hard. Just stick to basics and you'll create your dream package. In this guide, you'll learn how to create your dream package.",
    category: "Travel",
    dateWritten: "March 13, 2023",
  };

  return (
    <div className={styles.blogCardDiv}>
      <Link to={`/blogs/${url}`}>
        <div className={styles.blogCardImgDiv}>
          <img src={img} className={styles.blogCardImg} />
        </div>
        <div className={styles.blogCardContent}>
          <div className={styles.blogCardDate}>{dateCreated}</div>
          <div className={styles.blogCardPill}>{tag}</div>
          <h4 className={styles.blogCardHeading}>{title}</h4>

          {/* <img className={styles.blogAuthorImage} />
                <h6 className={styles.blogAuthorName}>Ammar Afridi</h6> */}
        </div>
      </Link>
    </div>
  );
}

export default BlogCard;
