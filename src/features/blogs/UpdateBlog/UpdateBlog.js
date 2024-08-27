import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { tags } from "../../../services/blogServices";
import { useDestinations } from "../../../hooks/useDestinations";
import { today } from "../../../services/dates";
import { Editor } from "@tinymce/tinymce-react";
import InputGroup from "../../../components/FormElements/InputGroup";
import SelectGroup from "../../../components/FormElements/SelectGroup";
import Loading from "../../../components/Loading/Loading";
import Label from "../../../components/FormElements/Label";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import { createUrl } from "../../../utils/createUrl";
import { Helmet } from "react-helmet";

export default function UpdateBlog() {
  const { url } = useParams();
  const editorRef = useRef(null);
  const { destinationOptions } = useDestinations();
  const [isLoading, setIsLoading] = useState(false);
  const [blog, setBlog] = useState({});

  const handleChange = (name) => (e) => {
    const value = name === "image" ? e.target.files[0] : e.target.value;
    setBlog((prevData) => {
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

  async function handleUpdateBlog(e) {
    try {
      e.preventDefault();
      setIsLoading(true);

      const updatedBlog = {
        ...blog,
        content: editorRef.current.getContent(),
        dateUpdated: today,
      };

      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/blogs/update/${url}`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedBlog),
        }
      );
      if (!res.ok) throw new Error("Could not delete blog");
      const data = await res.json();
      alert("Blog updated successfully");
      console.log(data);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function getBlog() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/blogs/get/${url}`
        );
        const data = await res.json();
        setBlog(data);
        console.log(data);
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    }
    getBlog();
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <Helmet>
        <title>{`Update ${blog.title}`}</title>
      </Helmet>
      <h1>Update {blog.title}</h1>
      <form>
        <InputGroup
          groupType="long"
          label="Date Created"
          type="text"
          name="dateCreated"
          value={blog.dateCreated}
          disabled
        />
        <InputGroup
          groupType="long"
          label="Date Updated"
          type="text"
          name="dateUpdated"
          value={blog.dateUpdated || ""}
          disabled
        />
        <InputGroup
          groupType="long"
          label="Title"
          name="title"
          type="text"
          value={blog.title}
          onChange={handleChange("title")}
        />
        <InputGroup
          groupType="long"
          label="URL"
          name="url"
          type="text"
          value={blog.url}
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
          value={blog.tag}
          onChange={handleChange("tag")}
          //   onChange={handleChange("tag")}
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
          value={blog.destination}
          onChange={handleChange("destination")}
          //   onChange={handleChange("destination")}
        >
          {destinationOptions.map((destination, i) => (
            <option key={i} value={destination}>
              {destination}
            </option>
          ))}
        </SelectGroup>

        <DescriptionEditor initialValue={blog.content} editorRef={editorRef} />

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
