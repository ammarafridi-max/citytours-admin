import { Helmet } from "react-helmet";
import styles from "./AllBlogs.module.css";
import BlogCard from "../../../components/BlogCard/BlogCard";
import Loading from "../../../components/Loading/Loading";
import { useBlogs } from "../../../hooks/useBlogs";

export default function AllBlogs() {
  const { blogs, isLoading } = useBlogs();

  return (
    <>
      <Helmet>
        <title>Blogs</title>
      </Helmet>
      {isLoading && <Loading />}
      <h1>Blogs</h1>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>URL</th>
              <th>Country</th>
              <th>Status</th>
              <th>Date Created</th>
              <th>Date Updated</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.url}>
                <td>
                  <a href={`blogs/${blog.url}`}>{blog.title}</a>
                </td>
                <td>
                  <a href={`blogs/${blog.url}`}>{blog.url}</a>
                </td>
                <td>{blog.destination}</td>
                <td>{blog.status}</td>
                <td>{blog.dateCreated}</td>
                <td>{blog.dateUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
