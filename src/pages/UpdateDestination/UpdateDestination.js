import styles from "./UpdateDestination.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  fetchDestination,
  uploadToCloudinary,
} from "../../services/destinationServices";
import { Editor } from "@tinymce/tinymce-react";
import { createUrl } from "../../services/createUrl";
import InputGroup from "../../components/FormElements/InputGroup";
import Label from "../../components/FormElements/Label";
import TextEditor from "../../components/TextEditor/TextEditor";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import SelectGroup from "../../components/FormElements/SelectGroup";

export default function UpdateDestination() {
  const { url } = useParams();
  const [destinationData, setDestinationData] = useState(null);
  const [image, setImage] = useState("");
  const descriptionRef = useRef(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setDestinationData((prevData) => {
      let updatedData = {
        ...prevData,
        [name]: value,
      };
      if (name === "name") {
        updatedData.url = createUrl(value);
      }
      return updatedData;
    });
  }

  function handleImage(e) {
    setImage(e.target.files[0]);
  }

  const handleActiveChange = (e) => {
    const value = e.target.value === "true";
    setDestinationData((prevState) => ({ ...prevState, active: value }));
  };

  useEffect(() => {
    async function getDestination() {
      try {
        const data = await fetchDestination(url);
        if (!data) throw new Error("Destination not found");
        setDestinationData(data);
      } catch (error) {
        alert("Error: " + error);
      }
    }
    getDestination();
  }, [url]);

  async function handleUpdateDestination(e) {
    e.preventDefault();

    try {
      let updatedData = { ...destinationData };

      // 1. Upload the new image to Cloudinary if an image is selected
      if (image) {
        const uploadedImageUrl = await uploadToCloudinary(image);
        updatedData.image = uploadedImageUrl;
      }

      // 2. Send the updated data to the backend API
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/destinations/update/${destinationData._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update destination");
      }

      alert("Destination updated successfully!");
    } catch (error) {
      alert("Error: " + error.message);
    }
  }

  if (!destinationData) {
    return <div>Loading...</div>;
  }

  return (
    <form>
      <h1>Update Destination</h1>
      <InputGroup
        groupType="long"
        label="Name"
        type="text"
        name="name"
        value={destinationData.name}
        onChange={handleChange}
        disabled
      />
      <InputGroup
        groupType="long"
        label="URL"
        type="text"
        name="url"
        value={destinationData.url}
        onChange={handleChange}
        disabled
      />
      <InputGroup
        groupType="long"
        label="New Image"
        type="file"
        name="image"
        onChange={handleImage}
      />
      <SelectGroup
        groupType="long"
        label="Active"
        name="active"
        value={destinationData.active}
        onChange={handleActiveChange}
      >
        <option value={true}>Active</option>
        <option value={false}>Inactive</option>
      </SelectGroup>
      <div className="row mb-3">
        <div className="col-2">
          <Label>Text</Label>
        </div>
        <div className="col-10">
          <DescriptionEditor
            descriptionRef={descriptionRef}
            initialValue={destinationData.description}
          />
        </div>
      </div>

      <div className="col-12 text-center mt-5">
        <PrimaryButton type="submit" onClick={handleUpdateDestination}>
          Update
        </PrimaryButton>
      </div>
    </form>
  );
}

function DescriptionEditor({ descriptionRef, initialValue }) {
  return (
    <Editor
      apiKey={process.env.REACT_APP_TEXT_EDITOR_API_KEY}
      onInit={(_evt, editor) => (descriptionRef.current = editor)}
      initialValue={initialValue}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
    />
  );
}
