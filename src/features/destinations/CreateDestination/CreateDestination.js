import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { Editor } from "@tinymce/tinymce-react";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import InputGroup from "../../../components/FormElements/InputGroup";
import Loading from "../../../components/Loading/Loading";
import { createUrl } from "../../../utils/createUrl";
import { uploadToCloudinary } from "../../../services/destinationServices";
import { countries } from "../../../services/countries";
import SelectGroup from "../../../components/FormElements/SelectGroup";
import { useNavigate } from "react-router-dom";

export default function DestinationForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [destinationState, setDestinationState] = useState({
    name: "",
    url: "",
    image: "",
    description: "",
    country: "",
    active: true,
  });
  const editorRef = useRef(null);

  const handleChange = (state) => (e) => {
    const value = state === "image" ? e.target.files[0] : e.target.value;
    setDestinationState((prevState) => {
      const newState = { ...prevState, [state]: value };
      if (state === "name") {
        newState.url = createUrl(value);
      }
      return newState;
    });
  };

  const handleActiveChange = (e) => {
    const value = e.target.value === "true";
    setDestinationState((prevState) => ({ ...prevState, active: value }));
  };

  async function handleForm(e) {
    e.preventDefault();

    try {
      setIsLoading(true);
      let imageUrl = "";
      if (destinationState.image) {
        imageUrl = await uploadToCloudinary(destinationState.image);
      }

      const destination = {
        ...destinationState,
        description: editorRef.current.getContent(),
        image: imageUrl,
      };
      console.log(destination);

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
      navigate("/destinations");
    } catch (error) {
      console.error("Failed to add destination:", error.message);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && <Loading />}
      <Helmet>
        <title>Create Destination</title>
      </Helmet>
      <div>
        <h1>Create Destination</h1>
        <form onSubmit={handleForm}>
          <BasicDetailsSection
            destinationState={destinationState}
            handleChange={handleChange}
            handleActiveChange={handleActiveChange}
          />
          <DescriptionSection editorRef={editorRef} />
          <div className="text-center mt-4">
            <PrimaryButton type="submit">Submit</PrimaryButton>
          </div>
        </form>
      </div>
    </>
  );
}

const BasicDetailsSection = ({
  destinationState,
  handleActiveChange,
  handleChange,
  handleCountryChange,
}) => (
  <div className="row mb-5">
    <h2>Basic Details</h2>

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
      onChange={handleChange("image")}
    />

    <SelectGroup
      groupType="long"
      label="Status"
      name="status"
      value={destinationState.active}
      onChange={handleActiveChange}
    >
      <option value={true}>Active</option>
      <option value={false}>Inactive</option>
    </SelectGroup>

    <SelectGroup
      groupType="long"
      label="Country"
      name="country"
      value={destinationState.country}
      onChange={handleChange("country")}
    >
      {countries.map((country, i) => (
        <option key={i} value={country}>
          {country}
        </option>
      ))}
    </SelectGroup>
  </div>
);

const DescriptionSection = ({ initialDescription, onChange, editorRef }) => (
  <div className="row mb-5">
    <h2>Description</h2>
    <Editor
      apiKey={process.env.REACT_APP_TEXT_EDITOR_API_KEY}
      onInit={(_evt, editor) => (editorRef.current = editor)}
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
  </div>
);
