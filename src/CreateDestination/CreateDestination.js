import PrimaryButton from "../Components/Buttons/PrimaryButton";
import InputGroup from "../Components/FormElements/InputGroup";
import TextEditor from "../TextEditor/TextEditor";
import { useState, useRef } from "react";

export function createUrl(text) {
  const url = text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[,'"?.:]/g, "");
  return url;
}

export default function CreateDestination() {
  const descriptionRef = useRef(null);
  const [destinationState, setDestinationState] = useState({
    name: "",
    url: "",
    description: "",
    image: "",
  });

  function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_BlOG_PRESET // Ensure this matches one of the presets
    );

    return fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.secure_url) {
          throw new Error(data.error.message || "Upload failed");
        }
        console.log("File uploaded to Cloudinary:", data);
        return data.secure_url;
      })
      .catch((error) => {
        console.error("Error uploading file to Cloudinary:", error);
        throw error;
      });
  }

  const handleChange = (state) => (e) => {
    const { value } = e.target;
    setDestinationState((prevState) => {
      const newState = { ...prevState, [state]: value };
      if (state === "name") {
        newState.url = createUrl(value);
      }
      return newState;
    });
  };

  async function handleForm(e) {
    e.preventDefault();

    try {
      let imageUrl = "";
      if (destinationState.image) {
        imageUrl = await uploadToCloudinary(destinationState.image);
      }

      const destination = {
        ...destinationState,
        description: descriptionRef.current.getContent(),
        image: imageUrl,
      };

      // if (
      //   !destination.name ||
      //   !destination.url ||
      //   !destination.description ||
      //   !destination.image
      // ) {
      //   console.log(destination);
      //   return alert("All fields are required");
      // }

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/destinations/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(destination),
        }
      );

      if (response.status === 409) {
        return alert("Destination with the same URL exists");
      }

      if (!response.ok) {
        throw new Error("Failed to add destination");
      }

      const data = await response.json();
      console.log(data);
      alert("Destination added successfully!");
    } catch (error) {
      console.error("Failed to add destination:", error.message);
      alert(`Error: ${error.message}`);
    }
  }

  return (
    <div>
      <h1>Add Destination</h1>
      <form>
        <InputGroup
          groupType="long"
          label="Name"
          type="text"
          name="name"
          value={destinationState.name}
          onChange={handleChange("name")}
        />
        <InputGroup
          groupType="long"
          label="Url"
          type="text"
          name="url"
          value={destinationState.url}
          onChange={handleChange("url")}
        />
        <InputGroup
          groupType="long"
          label="Image"
          type="file"
          name="image"
          value={destinationState.image}
          onChange={handleChange("image")}
        />
        <TextEditor
          onInit={(_evt, editor) => (descriptionRef.current = editor)}
        />

        <div className="text-center mt-4">
          <PrimaryButton onClick={handleForm}>Submit</PrimaryButton>
        </div>
      </form>
    </div>
  );
}
