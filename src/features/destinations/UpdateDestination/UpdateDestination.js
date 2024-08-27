import styles from "./UpdateDestination.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  fetchDestination,
  uploadToCloudinary,
} from "../../../services/destinationServices";
import { Editor } from "@tinymce/tinymce-react";
import { createUrl } from "../../../utils/createUrl";
import InputGroup from "../../../components/FormElements/InputGroup";
import Label from "../../../components/FormElements/Label";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import SelectGroup from "../../../components/FormElements/SelectGroup";
import { countries } from "../../../services/countries";
import Loading from "../../../components/Loading/Loading";
import { Helmet } from "react-helmet";

export default function UpdateDestination() {
  const navigate = useNavigate();
  const { url } = useParams();
  const editorRef = useRef(null);
  const [destinationData, setDestinationData] = useState({
    name: "",
    url: "",
    image: "",
    description: "",
    country: "",
    active: false,
  });
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (name) => (e) => {
    const value = name === "image" ? e.target.files[0] : e.target.value;
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
  };

  useEffect(() => {
    async function getDestination() {
      try {
        setIsLoading(true);
        const data = await fetchDestination(url);
        if (!data) throw new Error("Destination not found");
        setDestinationData(data);
      } catch (error) {
        alert("Error: " + error);
      } finally {
        setIsLoading(false);
      }
    }
    getDestination();
  }, [url, setDestinationData]);

  async function handleUpdateDestination(e) {
    try {
      e.preventDefault();
      setIsLoading(true);

      let updatedData = {
        ...destinationData,
        description: editorRef.current.getContent(),
      };

      console.log(updatedData);

      if (destinationData.image) {
        const uploadedImageUrl = await uploadToCloudinary(
          destinationData.image
        );
        updatedData.image = uploadedImageUrl;
      }

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
      navigate("/destinations");
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  // if (!destinationData) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      {isLoading && <Loading />}

      <form>
        <Helmet>
          <title>{`Update Destination ${destinationData.name}`}</title>
        </Helmet>
        <h1>Update Destination</h1>
        <InputGroup
          groupType="long"
          label="Name"
          type="text"
          name="name"
          value={destinationData.name}
          onChange={handleChange("name")}
        />
        <InputGroup
          groupType="long"
          label="URL"
          type="text"
          name="url"
          value={destinationData.url}
          onChange={handleChange("url")}
          disabled
        />
        <InputGroup
          groupType="long"
          label="New Image"
          type="file"
          name="image"
          onChange={handleChange("image")}
        />

        <SelectGroup
          groupType="long"
          label="Active"
          name="active"
          value={destinationData.active}
          onChange={handleChange("active")}
        >
          <option value={true}>Active</option>
          <option value={false}>Inactive</option>
        </SelectGroup>

        <SelectGroup
          groupType="long"
          label="Country"
          name="country"
          value={destinationData.country}
          onChange={handleChange("country")}
        >
          {countries.map((country, i) => (
            <option key={i} value={country}>
              {country}
            </option>
          ))}
        </SelectGroup>

        <div className="row mb-3">
          <div className="col-2">
            <Label>Text</Label>
          </div>
          <div className="col-10">
            <DescriptionEditor
              editorRef={editorRef}
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
    </>
  );
}

function DescriptionEditor({ editorRef, initialValue }) {
  return (
    <Editor
      apiKey={process.env.REACT_APP_TEXT_EDITOR_API_KEY}
      onInit={(_evt, editor) => (editorRef.current = editor)}
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
