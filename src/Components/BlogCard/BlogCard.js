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
    <div className={styles.blogCard}>
      <div className={styles.imgContainer}></div>
    </div>
  );
}

export default BlogCard;
