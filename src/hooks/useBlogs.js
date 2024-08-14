import { useEffect, useState } from "react";

export function useBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // ---------- GET ALL BLOGS ----------

  useEffect(() => {
    async function getBlogs() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/blogs`
        );
        const data = await response.json();
        setBlogs(data);
        console.log(data);
      } catch {
        console.log("error");
      } finally {
        setIsLoading(false);
      }
    }
    getBlogs();
  }, []);

  return { blogs, isLoading };
}
