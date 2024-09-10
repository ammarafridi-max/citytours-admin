import styles from "./CreateBlog.module.css";
import { Helmet } from "react-helmet";
import { useDestinations } from "../../destinations/useDestinations";
import { tags, useBlogs } from "../useBlogs";
import { Editor } from "@tinymce/tinymce-react";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import Label from "../../../components/FormElements/Label";
import InputGroup from "../../../components/FormElements/InputGroup";
import SelectGroup from "../../../components/FormElements/SelectGroup";
import Loading from "../../../components/Loading/Loading";
import { formatDate } from "../../../utils/formatDate";

export default function CreateBlog() {
  const {
    isLoading,
    handleCreateBlog,
    editorRef,
    newBlogData,
    setNewBlogData,
  } = useBlogs();
  const { destinationOptions } = useDestinations();

  const handleChange = (state) => (e) => {
    const value = state === "image" ? e.target.files[0] : e.target.value;
    setNewBlogData((prevState) => {
      const newState = { ...prevState, [state]: value };
      return newState;
    });
  };

  return (
    <>
      <Helmet>
        <title>Create Blog</title>
      </Helmet>
      {isLoading && <Loading />}
      <form onSubmit={handleCreateBlog}>
        <h1>Create Blog</h1>
        <InputGroup
          groupType="long"
          label="Date Created"
          type="text"
          name="dateCreated"
          value={formatDate(newBlogData.dateCreated)}
          disabled
        />
        <InputGroup
          groupType="long"
          label="Title"
          type="text"
          name="title"
          value={newBlogData.title}
          onChange={handleChange("title")}
        />
        <InputGroup
          groupType="long"
          label="URL"
          type="text"
          name="url"
          value={newBlogData.url}
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
          value={newBlogData.tag}
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
          value={newBlogData.destination}
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
          value={newBlogData.status}
          onChange={handleChange("status")}
        >
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
          <option value="Archived">Archived</option>
        </SelectGroup>

        <div className="row mx-0">
          <div className="col-2">
            <Label>excerpt</Label>
          </div>
          <div className="col-10">
            <textarea
              value={newBlogData.excerpt}
              onChange={handleChange("excerpt")}
              className={styles.textarea}
            ></textarea>
          </div>
        </div>

        <DescriptionSection editorRef={editorRef} />

        <div className="text-center">
          <PrimaryButton type="submit">Create Blog</PrimaryButton>
        </div>
      </form>
    </>
  );
}

function DescriptionSection({ editorRef }) {
  return (
    <div className="row m-0 my-4">
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
