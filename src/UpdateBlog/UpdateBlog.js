import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./UpdateBlog.module.css";
import Input from "../Components/FormElements/Input";
import Label from "../Components/FormElements/Label";
import PrimaryButton from "../Components/Buttons/PrimaryButton";
import TextEditor from "../TextEditor/TextEditor";
import AlertBox from "../Components/AlertBox/AlertBox";

export default function UpdateBlog() {
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
  const [formState, setFormState] = useState({
    title: "",
    url: "",
    dateCreated: date,
    dateUpdated: "",
    tag: "",
    description: "",
    image: "", // Initialize image in formState
  });

  async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_BlOG_PRESET
    );
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "post",
        body: formData,
      }
    );
    const data = await response.json();
    return data.secure_url;
  }

  async function handleFunction(e) {
    e.preventDefault();
    setCurrentState("loading");
    let imageUrl = formState.image;
    if (image) {
      imageUrl = await uploadToCloudinary(image);
    }
    const blogData = {
      ...formState,
      description: descriptionRef.current.getContent(),
      image: imageUrl,
      dateUpdated: date,
    };
    if (
      !formState.title ||
      !formState.url ||
      !descriptionRef.current.getContent()
    ) {
      setCurrentState("active");
      setAlert(<AlertBox>All fields are required</AlertBox>);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/blogs/update/${url}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(blogData),
        }
      );

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
        throw new Error("Failed to update blog");
      }

      const data = await response.json();
      setCurrentState("active");
      setAlert(<AlertBox type="success">Blog updated successfully</AlertBox>);
      navigate(`/blogs`); // Redirect to the updated blog page
    } catch (error) {
      setCurrentState("active");
      setAlert(<AlertBox type="error">{error.message}</AlertBox>);
      console.error(error.message);
    }
  }

  const handleChange = (stateName) => (e) => {
    const { value } = e.target;
    setFormState((prevState) => {
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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/blogs/get/${url}`
        );
        if (!response.ok) console.log("Error fetching data");
        const data = await response.json();
        setFormState({
          title: data.title,
          url: data.url,
          dateCreated: data.dateCreated,
          dateUpdated: data.dateUpdated,
          tag: data.tag,
          description: data.text,
          image: data.image,
        });
        await descriptionRef.current.setContent(data.text);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <h1>Update Blog</h1>
      <form>
        {/* Creation Date */}

        <div className="row mb-3 align-items-center">
          <div className="col-2">
            <Label>Date</Label>
          </div>
          <div className="col-10">
            <p>{formState.dateCreated}</p>
          </div>
        </div>

        {/* URL */}

        <div className="row mb-3 align-items-center">
          <div className="col-2">
            <Label>URL</Label>
          </div>
          <div className="col-10">
            <Input
              type="text"
              value={formState.url}
              onChange={handleChange("url")}
            />
          </div>
        </div>

        {/* Title */}

        <div className="row mb-3 align-items-center">
          <div className="col-2">
            <Label>Title</Label>
          </div>
          <div className="col-10">
            <Input
              type="text"
              value={formState.title}
              onChange={handleChange("title")}
            />
          </div>
        </div>

        {/* Tag */}

        <div className="row mb-3 align-items-center">
          <div className="col-2">
            <Label>Tag</Label>
          </div>
          <div className="col-10">
            <Input
              type="text"
              value={formState.tag}
              onChange={handleChange("tag")}
            />
          </div>
        </div>

        {/* Image */}

        <div className="row mb-3 align-items-center">
          <div className="col-2">
            <Label>Current Image</Label>
          </div>
          <div className="col-10">
            <img src={formState.image} className={styles.Image} />
          </div>
        </div>

        <div className="row mb-3 align-items-center">
          <div className="col-2">
            <Label>New Image</Label>
          </div>
          <div className="col-10">
            <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
        </div>

        {/* Description */}

        <div className="row mb-3">
          <div className="col-2">
            <Label>Text</Label>
          </div>
          <div className="col-10">
            <TextEditor
              onInit={(_evt, editor) => (descriptionRef.current = editor)}
            />
          </div>
        </div>

        {/* Button */}

        <div className="col-12 text-center mt-5">
          {currentState === "active" && (
            <div>
              {alert}
              <PrimaryButton onClick={handleFunction}>Add Blog</PrimaryButton>
            </div>
          )}
          {currentState === "loading" && (
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
      </form>
    </>
  );
}
