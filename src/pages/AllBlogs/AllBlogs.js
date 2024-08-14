import BlogCard from "../../components/BlogCard/BlogCard";
import Loading from "../../components/Loading/Loading";
import { useBlogs } from "../../hooks/useBlogs";

export default function AllBlogs() {
  const { blogs, isLoading } = useBlogs();

  return (
    <>
      {isLoading && <Loading />}
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
