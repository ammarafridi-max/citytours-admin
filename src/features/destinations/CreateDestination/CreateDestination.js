import { statusOptions, useDestinations } from "../useDestinations";
import { Helmet } from "react-helmet";
import { Editor } from "@tinymce/tinymce-react";
import { createUrl } from "../../../utils/createUrl";
import { countries } from "../../../utils/countries";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import InputGroup from "../../../components/FormElements/InputGroup";
import Loading from "../../../components/Loading/Loading";
import SelectGroup from "../../../components/FormElements/SelectGroup";

export default function DestinationForm() {
  const {
    isLoading,
    newDestinationData,
    setNewDestinationData,
    editorRef,
    handleCreateDestination,
  } = useDestinations();

  const handleChange = (state) => (e) => {
    const value = state === "image" ? e.target.files[0] : e.target.value;
    setNewDestinationData((prevState) => {
      const newState = { ...prevState, [state]: value };
      if (state === "name") {
        newState.url = createUrl(value);
      }
      return newState;
    });
  };

  return (
    <>
      {isLoading && <Loading />}
      <Helmet>
        <title>Create Destination</title>
      </Helmet>
      <div>
        <h1>Create Destination</h1>
        <form onSubmit={handleCreateDestination}>
          <BasicDetailsSection
            newDestinationData={newDestinationData}
            handleChange={handleChange}
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

const BasicDetailsSection = ({ newDestinationData, handleChange }) => (
  <div className="row mb-5">
    <h2>Basic Details</h2>

    <InputGroup
      groupType="long"
      label="Name"
      type="text"
      name="name"
      value={newDestinationData.name}
      onChange={handleChange("name")}
    />

    <InputGroup
      groupType="long"
      label="Url"
      type="text"
      name="url"
      value={newDestinationData.url}
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
      value={newDestinationData.status}
      onChange={handleChange("status")}
    >
      {statusOptions.map((statusOption, i) => (
        <option key={i} value={statusOption}>
          {statusOption}
        </option>
      ))}
    </SelectGroup>

    <SelectGroup
      groupType="long"
      label="Country"
      name="country"
      value={newDestinationData.country}
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
