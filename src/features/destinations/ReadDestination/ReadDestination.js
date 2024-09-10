import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import DeleteIconButton from "../../../components/Buttons/DeleteIconButton";
import UpdateButton from "../../../components/Buttons/UpdateButton";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import styles from "./ReadDestination.module.css";
import Label from "../../../components/FormElements/Label";
import { useDestinations } from "../useDestinations";

export default function ReadDestination() {
  const { url } = useParams();
  const {
    currentDestination,
    handleDeleteDestination,
    showModal,
    setShowModal,
  } = useDestinations(url);

  return (
    <>
      <Helmet>
        <title>Read Destination {`${currentDestination.name}`}</title>
      </Helmet>
      {showModal && (
        <DeleteModal
          showModal={showModal}
          onCancel={() => setShowModal(false)}
          onDelete={handleDeleteDestination}
          item={`destination ${currentDestination.name}`}
        />
      )}
      <h1>{currentDestination.name}</h1>

      <div className="row mx-0 mb-3 align-items-center">
        <div className="col-2">
          <Label>Name</Label>
        </div>
        <p className="col-10 py-0 my-0">{currentDestination.name}</p>
      </div>

      <div className="row mx-0 mb-3 align-items-center">
        <div className="col-2">
          <Label>URL</Label>
        </div>
        <p className="col-10 py-0 my-0">{currentDestination.url}</p>
      </div>

      <div className="row mx-0 mb-3 align-items-center">
        <div className="col-2">
          <Label>Country</Label>
        </div>
        <p className="col-10 py-0 my-0">{currentDestination.country}</p>
      </div>

      <div className="row mx-0 mb-3 align-items-center">
        <div className="col-2">
          <Label>status</Label>
        </div>
        <p className="col-10 py-0 my-0">{currentDestination.status}</p>
      </div>

      <div className="row mx-0 mb-3 align-items-center">
        <div className="col-2">
          <Label>Description</Label>
        </div>
        <div
          className="col-10"
          dangerouslySetInnerHTML={{ __html: currentDestination.description }}
        ></div>
      </div>

      <div className="row mx-0 mb-3 align-items-center">
        <div className="col-2">
          <Label>Image</Label>
        </div>
        <div className="col-6">
          <img
            src={currentDestination.image}
            width="100%"
            alt={currentDestination.name}
          />
        </div>
      </div>

      <div className={styles.buttons}>
        <DeleteIconButton mb="10px" onClick={() => setShowModal(true)} />
        <UpdateButton href={`/destinations/update/${url}`} />
      </div>
    </>
  );
}
