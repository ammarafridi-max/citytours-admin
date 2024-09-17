import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { uploadToCloudinary } from "../../services/blogServices";
import { createUrl } from "../../utils/createUrl";

export const statusOptions = ["Draft", "Published", "Archived"];

export const tags = [
  "Destination Guides",
  "Travel Tips & Advice",
  "Adventure Travel",
  "Cultural Experiences",
  "Luxury Travel",
  "Family Travel",
  "Solo Travel",
  "Food & Travel",
  "Sustainable Travel",
  "Travel Photography",
];

export const initialState = {
  dateCreated: new Date(),
  dateUpdated: "",
  title: "",
  url: "",
  tag: "",
  status: "Draft",
  image: "",
  destination: "",
  excerpt: "",
  content: "",
};

export function useBlogs(blogUrl) {
  const editorRef = useRef(null);
  const { url } = useParams();
  const [currentBlog, setCurrentBlog] = useState(initialState);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newBlogData, setNewBlogData] = useState({
    ...initialState,
    status: statusOptions[0],
    tag: tags[0],
  });
  const [alertBox, setAlertBox] = useState({
    showAlertBox: false,
    title: "",
    type: "info",
    message: "",
  });
  const navigate = useNavigate();

  // ---------- GET ALL BLOGS ----------

  useEffect(() => {
    async function getBlogs() {
      try {
        setIsLoading(true);
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/blogs`);
        if (!res.ok) throw new Error("Could not fetch blogs");
        const data = await res.json();
        if (!data) throw new Error("No blogs found");
        setBlogs(data.data);
        console.log(data);
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    }
    getBlogs();
  }, []);

  // ---------- GET A PARTICULAR BLOG ----------

  useEffect(() => {
    async function getBlog() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/blogs/get/${blogUrl}`
        );
        const data = await res.json();
        setCurrentBlog(data);
        console.log(data);
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    }
    getBlog();
  }, [blogUrl]);

  // ---------- CREATE A BLOG ----------

  async function handleCreateBlog(e) {
    try {
      e.preventDefault();
      setIsLoading(true);

      let imageUrl = newBlogData.image;
      if (newBlogData.image && newBlogData.image instanceof File) {
        imageUrl = await uploadToCloudinary(newBlogData.image);
      }

      const blog = {
        ...newBlogData,
        url: newBlogData.url ? newBlogData.url : createUrl(newBlogData.title),
        content: editorRef.current.getContent(),
        image: imageUrl,
      };

      console.log(blog);

      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/blogs/add`,
        {
          method: "post",
          body: JSON.stringify(blog),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.status === 409)
        return alert("Blog with the same URL already exists");
      if (!res.ok) {
        throw new Error("Failed to add blog");
      }
      if (res.status === 200) alert("Blog added successfully");
      navigate("/blogs");
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }

  // ---------- UPDATE A BLOG ----------

  async function handleUpdateBlog(e) {
    try {
      e.preventDefault();
      setIsLoading(true);

      const updatedBlog = {
        ...currentBlog,
        content: editorRef.current.getContent(),
        dateUpdated: new Date(),
      };

      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/blogs/update/${url}`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedBlog),
        }
      );
      if (!res.ok) throw new Error("Could not delete blog");
      const data = await res.json();
      setAlertBox({
        type: "success",
        title: "Updated successfully!",
        message: "Blog has been updated",
        showAlertBox: true,
      });
      console.log(data);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }

  // ---------- DELETE A BLOG ----------

  async function handleDeleteBlog() {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/blogs/delete/${currentBlog._id}`,
        { method: "delete" }
      );
      if (!res.ok) throw new Error("An error occurred");
      const data = await res.json();
      setAlertBox({
        type: "success",
        title: "Blog delete!",
        message: "Blog has been deleted successfully",
        showAlertBox: true,
      });
      setShowModal(false);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    editorRef,
    initialState,
    currentBlog,
    alertBox,
    blogs,
    isLoading,
    newBlogData,
    showModal,
    showModal,
    setShowModal,
    navigate,
    setCurrentBlog,
    setIsLoading,
    setAlertBox,
    setNewBlogData,
    handleCreateBlog,
    handleUpdateBlog,
    handleDeleteBlog,
  };
}
