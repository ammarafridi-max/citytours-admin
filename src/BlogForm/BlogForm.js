import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../Components/FormElements/Input";
import Label from "../Components/FormElements/Label";
import PrimaryButton from "../Components/Buttons/PrimaryButton";
import TextEditor from "../TextEditor/TextEditor";
import AlertBox from "../Components/AlertBox/AlertBox";
import styles from "./BlogForm.module.css";

export default function BlogForm() {
  const [alert, setAlert] = useState();
  const [currentState, setCurrentState] = useState("active"); // active | loading | successful
  const [image, setImage] = useState("");
  const descriptionRef = useRef(null);
  const { url } = useParams();
  const navigate = useNavigate();

  const date = new Date().toLocaleDateString("default", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [blogData, setBlogData] = useState({
    title: "",
    url: "",
    dateCreated: date,
    dateUpdated: "",
    tag: "",
    description: "",
    image: "",
  });

  const handleChange = (stateName) => (e) => {
    const { value } = e.target;
    setBlogData((prevState) => {
      const newState = {
        ...prevState,
        [stateName]: value,
      };

      if (stateName === "title") {
        newState.url = value
          .toLowerCase()
          .replace(/ /g, "-") // Replace spaces with hyphens
          .replace(/[,'"?.:]/g, ""); // Remove specified characters
      }

      return newState;
    });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_BlOG_PRESET
    );
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "post", body: formData }
    );
    const data = await response.json();
    return data.secure_url;
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setCurrentState("loading");

    let imageUrl = blogData.image;
    if (image && image instanceof File) {
      imageUrl = await uploadToCloudinary(image);
    }

    const newBlogData = {
      ...blogData,
      description: descriptionRef.current
        ? descriptionRef.current.getContent()
        : "",
      image: imageUrl,
      dateUpdated: date,
    };

    if (
      !newBlogData.title ||
      !newBlogData.url ||
      !imageUrl ||
      !descriptionRef.current.getContent()
    ) {
      setCurrentState("active");
      setAlert(<AlertBox>All fields are required</AlertBox>);
      return;
    }

    try {
      const endpoint = url
        ? `${process.env.REACT_APP_BACKEND_URL}/blogs/update/${url}`
        : `${process.env.REACT_APP_BACKEND_URL}/blogs/add`;
      const method = url ? "POST" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBlogData),
      });

      if (response.status === 409) {
        setCurrentState("active");
        setAlert(
          <AlertBox type="error">
            Blog with the same URL already exists
          </AlertBox>
        );
        return;
      }

      if (!response.ok) {
        throw new Error(url ? "Failed to update blog" : "Failed to add blog");
      }

      const successMessage = url
        ? "Blog updated successfully"
        : "Blog added successfully";
      setCurrentState("active");
      setAlert(<AlertBox type="success">{successMessage}</AlertBox>);
      setTimeout(() => navigate(`/blogs`), 3000); // Redirect after successful action
    } catch (error) {
      setCurrentState("active");
      setAlert(<AlertBox type="error">{error.message}</AlertBox>);
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (url) {
      async function fetchData() {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/blogs/get/${url}`
          );
          if (!response.ok) throw new Error("Error fetching data");
          const data = await response.json();
          setBlogData(data);
          await descriptionRef.current.setContent(data.text);
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    }
  }, [url]);

  return (
    <>
      <h1>{url ? "Update Blog" : "Add Blog"}</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="row mb-3 align-items-center">
          <div className="col-2">
            <Label>Date Created</Label>
          </div>
          <div className="col-10">
            <Input type="text" value={blogData.dateCreated} disabled={true} />
          </div>
        </div>

        {url && (
          <div className="row mb-3 align-items-center">
            <div className="col-2">
              <Label>Last Updated</Label>
            </div>
            <div className="col-10">
              <Input type="text" value={blogData.dateUpdated} disabled={true} />
            </div>
          </div>
        )}

        <div className="row mb-3 align-items-center">
          <div className="col-2">
            <Label>Title</Label>
          </div>
          <div className="col-10">
            <Input
              type="text"
              value={blogData.title}
              onChange={handleChange("title")}
            />
          </div>
        </div>

        <div className="row mb-3 align-items-center">
          <div className="col-2">
            <Label>URL</Label>
          </div>
          <div className="col-10">
            <Input
              type="text"
              value={blogData.url}
              onChange={handleChange("url")}
              disabled={!!url}
            />
          </div>
        </div>

        <div className="row mb-3 align-items-center">
          <div className="col-2">
            <Label>Tag</Label>
          </div>
          <div className="col-10">
            <Input
              type="text"
              value={blogData.tag}
              onChange={handleChange("tag")}
            />
          </div>
        </div>

        {url && (
          <div className="row mb-3 align-items-center">
            <div className="col-2">
              <Label>Current Image</Label>
            </div>
            <div className="col-10">
              <img src={blogData.image} className={styles.Image} />
            </div>
          </div>
        )}

        <div className="row mb-3 align-items-center">
          <div className="col-2">
            <Label>{url ? "New Image" : "Image"}</Label>
          </div>
          <div className="col-10">
            <Input type="file" onChange={handleImage} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-2">
            <Label>Text</Label>
          </div>
          <div className="col-10">
            <TextEditor
              onInit={(_evt, editor) => (descriptionRef.current = editor)}
              initialValue={url ? blogData.description : ""}
            />
          </div>
        </div>

        <div className="col-12 text-center mt-5">
          {currentState === "active" && (
            <div>
              {alert}
              <PrimaryButton type="submit">
                {url ? "Update Blog" : "Add Blog"}
              </PrimaryButton>
            </div>
          )}
          {currentState === "loading" && (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
      </form>
    </>
  );
}
