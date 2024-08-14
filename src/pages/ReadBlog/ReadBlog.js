import { useState } from "react";
import { useParams } from "react-router-dom";
import DeleteButton from "../../components/Buttons/DeleteButton";
import UpdateButton from "../../components/Buttons/UpdateButton";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import styles from "./ReadBlog.module.css";

export default function ReadBlog() {
  const [showModal, setShowModal] = useState(false);
  const { url } = useParams();

  return (
    <div>
      <h1>Read Blog</h1>
      <div className={styles.buttons}>
        <DeleteButton mb="10px" onClick={() => setShowModal(true)} />
        <UpdateButton href={`/blogs/update/${url}`} />
      </div>
      {showModal && <DeleteModal onCancel={() => setShowModal(false)} />}
    </div>
  );
}
