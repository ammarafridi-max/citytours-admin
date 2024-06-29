import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Components/FormElements/Input";
import Label from "../Components/FormElements/Label";
import PrimaryButton from "../Components/Buttons/PrimaryButton";
import TextEditor from "../TextEditor/TextEditor";
import AlertBox from "../Components/AlertBox/AlertBox";

export default function CreateBlog() {
  const descriptionRef = useRef(null);
  const date = new Date().toLocaleDateString("default", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const [currentState, setCurrentState] = useState("active"); // active | loading | successful
  const [alert, setAlert] = useState();
  const [image, setImage] = useState("");
  const [formState, setFormState] = useState({
    title: "",
    url: "",
    creationDate: date,
    modificationDate: "",
    tag: "",
    description: "",
    image: "", // Initialize image in formState
  });

  function handleImage(e) {
    setImage(e.target.files[0]);
  }

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

  async function handleFunction(e) {
    e.preventDefault();
    setCurrentState("loading");

    let imageUrl = "";
    if (image) {
      imageUrl = await uploadToCloudinary(image);
    }

    const blogData = {
      ...formState,
      description: descriptionRef.current.getContent(),
      image: imageUrl,
    };

    // 1. Ensure all data is complete

    if (
      !formState.title ||
      !formState.url ||
      !imageUrl ||
      !descriptionRef.current.getContent()
    ) {
      setCurrentState("active");
      setAlert(<AlertBox>All fields are required</AlertBox>);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/blogs/add`,
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
        throw new Error("Failed to add blog");
      }

      const data = await response.json();
      setCurrentState("active");
      setAlert(<AlertBox type="success">Blog added successfully</AlertBox>);
      console.log(data);
    } catch (error) {
      setCurrentState("active");
      setAlert(<AlertBox type="error">{error.message}</AlertBox>);
      console.log(error.message);
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

  return (
    <>
      <h1>Add Blog</h1>
      <form>
        {/* Creation Date */}

        <div className="row mb-3 align-items-center">
          <div className="col-1">
            <Label>Date</Label>
          </div>
          <div className="col-11">
            <Input type="text" value={formState.creationDate} disabled={true} />
          </div>
        </div>

        {/* URL */}

        <div className="row mb-3 align-items-center">
          <div className="col-1">
            <Label>URL</Label>
          </div>
          <div className="col-11">
            <Input
              type="text"
              value={formState.url}
              onChange={handleChange("url")}
            />
          </div>
        </div>

        {/* Title */}

        <div className="row mb-3 align-items-center">
          <div className="col-1">
            <Label>Title</Label>
          </div>
          <div className="col-11">
            <Input
              type="text"
              value={formState.title}
              onChange={handleChange("title")}
            />
          </div>
        </div>

        {/* Tag */}

        <div className="row mb-3 align-items-center">
          <div className="col-1">
            <Label>Tag</Label>
          </div>
          <div className="col-11">
            <Input
              type="text"
              value={formState.tag}
              onChange={handleChange("tag")}
            />
          </div>
        </div>

        {/* Image */}

        <div className="row mb-3 align-items-center">
          <div className="col-1">
            <Label>Image</Label>
          </div>
          <div className="col-11">
            <Input type="file" onChange={handleImage} />
          </div>
        </div>

        {/* Description */}

        <div className="row mb-3">
          <div className="col-1">
            <Label>Text</Label>
          </div>
          <div className="col-11">
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

// onInit={(_evt, editor) => (descriptionRef.current = editor)}

// function ReviewBlog(props) {
//   return (
//     <>
//       <div className="row mb-3">
//         <div className="col-2 bold">Title</div>
//         <div className="col-10">{props.title}</div>
//       </div>
//       <div className="row mb-3">
//         <div className="col-2 bold">URL</div>
//         <div className="col-10">{props.url}</div>
//       </div>
//       <div className="row mb-3">
//         <div className="col-2 bold">Creation Date</div>
//         <div className="col-10">{props.creationDate}</div>
//       </div>
//       <div className="row mb-3">
//         <div className="col-2 bold">Tag</div>
//         <div className="col-10">{props.tag}</div>
//       </div>
//       <div className="row mb-3">
//         <div className="col-2 bold">Image</div>
//         <div className="col-10">{props.image}</div>
//       </div>
//       <div className="row mb-3">
//         <div className="col-2 bold">description</div>
//         <div className="col-10">{props.description}</div>
//       </div>
//     </>
//   );
// }
