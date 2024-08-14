import { useRef, useState } from "react";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import { useDestinations } from "../../hooks/useDestinations";
import { today } from "../../services/dates";
import styles from "./CreateBlog.module.css";
import Label from "../../components/FormElements/Label";
import InputGroup from "../../components/FormElements/InputGroup";
import SelectGroup from "../../components/FormElements/SelectGroup";
import { Editor } from "@tinymce/tinymce-react";
import { createUrl } from "../../services/createUrl";
import { tags } from "../../services/blogServices";

export default function CreateBlog() {
  const editorRef = useRef(null);
  const { destinationOptions } = useDestinations();
  const [blogData, setBlogData] = useState({
    title: "",
    url: "",
    dateCreated: today,
    dateUpdated: "",
    tag: tags[1],
    description: "",
    image: "",
    destination: "",
  });

  const handleChange = (state) => (e) => {
    const value = state === "image" ? e.target.files[0] : e.target.value;
    setBlogData((prevState) => {
      const newState = { ...prevState, [state]: value };
      if (state === "title") {
        newState.url = createUrl(value);
      }
      return newState;
    });
  };

  function handleSubmit(e) {
    try {
      e.preventDefault();
      const blog = { ...blogData, description: editorRef.current.getContent() };
      console.log(blog);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Blog</h1>
      <InputGroup
        groupType="long"
        label="Date Create"
        type="text"
        name="dateCreated"
        value={blogData.dateCreated}
        disabled
      />
      <InputGroup
        groupType="long"
        label="Title"
        type="text"
        name="title"
        value={blogData.title}
        onChange={handleChange("title")}
      />
      <InputGroup
        groupType="long"
        label="URL"
        type="text"
        name="url"
        value={blogData.url}
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
        label="Tag"
        name="tag"
        value={blogData.tag}
        onChange={handleChange("tag")}
      >
        {tags.map((tag, i) => (
          <option key={i} value={tag}>
            {tag}
          </option>
        ))}
      </SelectGroup>

      <SelectGroup
        groupType="long"
        label="Destination"
        name="destination"
        value={blogData.destination}
        onChange={handleChange("destination")}
      >
        {destinationOptions.map((destination, i) => (
          <option key={i} value={destination}>
            {destination}
          </option>
        ))}
      </SelectGroup>

      <DescriptionSection editorRef={editorRef} />

      <div className="text-center">
        <PrimaryButton type="submit">Create Blog</PrimaryButton>
      </div>
    </form>
  );
}

function DescriptionSection({ editorRef }) {
  return (
    <div className="row">
      <div className="col-2">
        <Label>Description</Label>
      </div>
      <div className="col-10">
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
    </div>
  );
}
