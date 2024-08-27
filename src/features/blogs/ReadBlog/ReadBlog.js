import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import DeleteIconButton from "../../../components/Buttons/DeleteIconButton";
import UpdateButton from "../../../components/Buttons/UpdateButton";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import InputGroup from "../../../components/FormElements/InputGroup";
import Label from "../../../components/FormElements/Label";
import Loading from "../../../components/Loading/Loading";
import styles from "./ReadBlog.module.css";

export default function ReadBlog() {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [blog, setBlog] = useState({});
  const navigate = useNavigate();
  const { url } = useParams();

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

  async function handleDeleteBlog() {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/blogs/delete/${blog._id}`,
        { method: "delete" }
      );
      if (!res.ok) throw new Error("An error occurred");
      const data = await res.json();
      alert(data.message);
      navigate("/blogs");
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Helmet>
        <title>Read {`${blog.title}`}</title>
      </Helmet>
      {isLoading && <Loading />}
      <h1>{blog.title}</h1>

      <InputGroup
        groupType="long"
        label="Date Created"
        name="dateCreated"
        value={blog.dateCreated}
        disabled
      />

      <InputGroup
        groupType="long"
        label="Date Updated"
        name="dateCreated"
        value={blog.dateUpdated}
        disabled
      />

      <InputGroup
        groupType="long"
        label="Title"
        name="title"
        value={blog.title}
        disabled
      />

      <InputGroup
        groupType="long"
        label="URL"
        name="url"
        value={blog.url}
        disabled
      />

      <InputGroup
        groupType="long"
        label="Tag"
        name="tag"
        value={blog.tag}
        disabled
      />

      <InputGroup
        groupType="long"
        label="Destination"
        name="destination"
        value={blog.destination}
        disabled
      />

      <div className="row m-0 mb-3 align-items-center">
        <div className="col-2">
          <Label>Image</Label>
        </div>
        <img className="col-6" src={blog.image} />
      </div>

      <div className="row mb-3 align-items-center">
        <div className="col-2">
          <Label>Content</Label>
        </div>
        <p
          className="col-6"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></p>
      </div>

      <div className={styles.buttons}>
        <DeleteIconButton mb="10px" onClick={() => setShowModal(true)} />
        <UpdateButton href={`/blogs/update/${url}`} />
      </div>
      {showModal && (
        <DeleteModal
          onCancel={() => setShowModal(false)}
          onDelete={handleDeleteBlog}
        />
      )}
    </div>
  );
}
