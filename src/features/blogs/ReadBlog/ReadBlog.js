import { useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import DeleteIconButton from "../../../components/Buttons/DeleteIconButton";
import UpdateButton from "../../../components/Buttons/UpdateButton";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import Label from "../../../components/FormElements/Label";
import Loading from "../../../components/Loading/Loading";
import { formatDate } from "../../../utils/formatDate";
import { useBlogs } from "../useBlogs";
import styles from "./ReadBlog.module.css";

export default function ReadBlog() {
  const { url } = useParams();
  const { currentBlog, isLoading, handleDeleteBlog } = useBlogs(url);
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Helmet>
        <title>Read {`${currentBlog.title}`}</title>
      </Helmet>
      {isLoading && <Loading />}
      <h1>{currentBlog.title}</h1>

      <div className="row mx-0 mb-3 align-items-center">
        <div className="col-2">
          <Label>Date Created</Label>
        </div>
        <p className="col-10 my-0 py-0">
          {formatDate(currentBlog.dateCreated)}
        </p>
      </div>

      <div className="row mx-0 mb-3 align-items-center">
        <div className="col-2">
          <Label>Date Updated</Label>
        </div>
        <p className="col-10 my-0 py-0">
          {formatDate(currentBlog.dateUpdated)}
        </p>
      </div>

      <div className="row mx-0 mb-3 align-items-center">
        <div className="col-2">
          <Label>Title</Label>
        </div>
        <p className="col-10 my-0 py-0">{currentBlog.title}</p>
      </div>

      <div className="row mx-0 mb-3 align-items-center">
        <div className="col-2">
          <Label>URL</Label>
        </div>
        <p className="col-10 my-0 py-0">{currentBlog.url}</p>
      </div>

      <div className="row mx-0 mb-3 align-items-center">
        <div className="col-2">
          <Label>Tag</Label>
        </div>
        <p className="col-10 my-0 py-0">{currentBlog.tag}</p>
      </div>

      <div className="row mx-0 mb-3 align-items-center">
        <div className="col-2">
          <Label>Destination</Label>
        </div>
        <p className="col-10 my-0 py-0">{currentBlog.destination}</p>
      </div>

      <div className="row mx-0 mb-3 align-items-center">
        <div className="col-2">
          <Label>Status</Label>
        </div>
        <p className="col-10 my-0 py-0">{currentBlog.status}</p>
      </div>

      <div className="row mx-0 mb-3 align-items-center">
        <div className="col-2">
          <Label>Excerpt</Label>
        </div>
        <p className="col-10 my-0 py-0">{currentBlog.excerpt}</p>
      </div>

      <div className="row mx-0 mb-3 align-items-center">
        <div className="col-2">
          <Label>Content</Label>
        </div>
        <div
          className="col-10 my-0 py-0"
          dangerouslySetInnerHTML={{ __html: currentBlog.content }}
        ></div>
      </div>

      <div className="row mx-0 mb-3 align-items-center">
        <div className="col-2">
          <Label>Image</Label>
        </div>
        <div className="col-6 my-0 py-0">
          <img src={currentBlog.image} width="100%" alt={currentBlog.title} />
        </div>
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
