import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import Label from "../../../components/FormElements/Label";
import { useUsers } from "../useUsers";
import styles from "./ReadUser.module.css";
import { formatDate } from "../../../utils/formatDate";
import DeleteIconButton from "../../../components/Buttons/DeleteIconButton";
import UpdateButton from "../../../components/Buttons/UpdateButton";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";

export default function ReadUser() {
  const { username } = useParams();
  const { currentUser, showModal, setShowModal, handleDeleteUser } =
    useUsers(username);

  return (
    <>
      <Helmet>
        <title>Read User</title>
      </Helmet>

      {showModal && (
        <DeleteModal
          showModal={showModal}
          onCancel={() => setShowModal(false)}
          onDelete={handleDeleteUser}
          item={`user ${currentUser.name}`}
        />
      )}

      <h1>Read User {currentUser.name}</h1>

      <Card label="Date Created">{formatDate(currentUser.dateCreated)}</Card>
      <Card label="Date Update">
        {currentUser.dateUpdated === null
          ? ""
          : formatDate(currentUser.dateCreated)}
      </Card>
      <Card label="Name">{currentUser.name}</Card>
      <Card label="Username">{currentUser.username}</Card>
      <Card label="Email">{currentUser.email}</Card>
      <Card label="Role">{currentUser.role}</Card>
      <Card label="Status">{currentUser.status}</Card>

      <div className={styles.buttons}>
        <DeleteIconButton mb="10px" onClick={() => setShowModal(true)} />
        <UpdateButton href={`/destinations/update/${username}`} />
      </div>
    </>
  );
}

function Card({ label, children }) {
  return (
    <div className="row mx-0 px-0 mb-3 align-items-center">
      <div className="col-2">
        <Label>{label}</Label>
      </div>
      <div className="col-10">
        <p className="py-0 my-0">{children}</p>
      </div>
    </div>
  );
}
