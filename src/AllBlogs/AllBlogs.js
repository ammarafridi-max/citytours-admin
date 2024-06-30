import BlogCard from "../Components/BlogCard/BlogCard";
import { useEffect, useState } from "react";
import UpdateBlog from "../UpdateBlog/UpdateBlog";

export default function AllBlogs() {
  const [blogs, setBlogs] = useState([]);

  async function deleteBlog(id) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/blogs/delete/${id}`,
        { method: "delete" }
      );
      if (response.ok) {
        setBlogs((prevData) => prevData.filter((blog) => blog._id !== id));
        console.log(response.json());
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getBlogs() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/blogs`
        );
        const data = await response.json();
        setBlogs(data);
        console.log(data);
      } catch {
        console.log("error");
      }
    }

    getBlogs();
  }, []);

  return (
    <>
      <h1>Blogs</h1>
      <div className="row">
        {blogs.map((blog) => {
          return (
            <div className="col-3" key={blog._id}>
              <BlogCard
                title={blog.title}
                src={blog.image}
                onDelete={() => deleteBlog(blog._id)}
                url={blog.url}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
