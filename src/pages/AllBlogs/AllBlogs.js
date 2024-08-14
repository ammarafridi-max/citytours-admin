import BlogCard from "../../components/BlogCard/BlogCard";
import { useEffect, useState } from "react";

export default function AllBlogs() {
  const [blogs, setBlogs] = useState([]);

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
            <div className="col-4" key={blog._id}>
              <BlogCard
                title={blog.title}
                img={blog.image}
                tag={blog.tag}
                dateCreated={blog.dateCreated}
                url={`${blog.url}`}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
