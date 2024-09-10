import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDestinations } from "../../destinations/useDestinations";
import { Editor } from "@tinymce/tinymce-react";
import { tags, statusOptions, useBlogs } from "../useBlogs";
import InputGroup from "../../../components/FormElements/InputGroup";
import SelectGroup from "../../../components/FormElements/SelectGroup";
import Loading from "../../../components/Loading/Loading";
import Label from "../../../components/FormElements/Label";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import { createUrl } from "../../../utils/createUrl";
import { Helmet } from "react-helmet";
import { formatDate } from "../../../utils/formatDate";

export default function UpdateBlog() {
  const { url } = useParams();
  const {
    handleUpdateBlog,
    currentBlog,
    setCurrentBlog,
    isLoading,
    editorRef,
  } = useBlogs(url);
  const { destinationOptions } = useDestinations();

  const handleChange = (name) => (e) => {
    const value = name === "image" ? e.target.files[0] : e.target.value;
    setCurrentBlog((prevData) => {
      let updatedData = {
        ...prevData,
        [name]: value,
      };
      if (name === "title") {
        updatedData.url = createUrl(value);
      }
      return updatedData;
    });
  };

  return (
    <>
      {isLoading && <Loading />}
      <Helmet>
        <title>{`Update ${currentBlog.title}`}</title>
      </Helmet>
      <h1>Update {currentBlog.title}</h1>
      <form>
        <InputGroup
          groupType="long"
          label="Date Created"
          type="text"
          name="dateCreated"
          value={formatDate(currentBlog.dateCreated)}
          disabled
        />
        <InputGroup
          groupType="long"
          label="Date Updated"
          type="text"
          name="dateUpdated"
          value={formatDate(currentBlog.dateUpdated)}
          disabled
        />
        <InputGroup
          groupType="long"
          label="Title"
          name="title"
          type="text"
          value={currentBlog.title}
          onChange={handleChange("title")}
        />
        <InputGroup
          groupType="long"
          label="URL"
          name="url"
          type="text"
          value={currentBlog.url}
          onChange={handleChange("url")}
        />
        <InputGroup
          groupType="long"
          label="New Image"
          name="image"
          type="file"
        />

        <SelectGroup
          groupType="long"
          label="Tag"
          name="tag"
          value={currentBlog.tag}
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
          value={currentBlog.destination}
          onChange={handleChange("destination")}
        >
          {destinationOptions.map((destination, i) => (
            <option key={i} value={destination}>
              {destination}
            </option>
          ))}
        </SelectGroup>

        <SelectGroup
          groupType="long"
          label="Status"
          name="status"
          value={currentBlog.status}
          onChange={handleChange("status")}
        >
          {statusOptions.map((statusOption, i) => (
            <option key={i} value={statusOption}>
              {statusOption}
            </option>
          ))}
        </SelectGroup>

        <InputGroup
          groupType="long"
          label="Excerpt"
          name="excerpt"
          type="text"
          value={currentBlog.excerpt}
          onChange={handleChange("excerpt")}
        />

        <DescriptionEditor
          initialValue={currentBlog.content}
          editorRef={editorRef}
        />

        <div className="text-center">
          <PrimaryButton onClick={handleUpdateBlog}>Update</PrimaryButton>
        </div>
      </form>
    </>
  );
}

function DescriptionEditor({ editorRef, initialValue }) {
  return (
    <div className="row m-0 my-4">
      <div className="col-2">
        <Label>Content</Label>
      </div>
      <div className="col-10">
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
      </div>
    </div>
  );
}
