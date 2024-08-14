import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeleteButton from "../../components/Buttons/DeleteButton";
import UpdateButton from "../../components/Buttons/UpdateButton";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import {
  deleteDestination,
  fetchDestination,
} from "../../services/destinationServices";
import styles from "./ReadDestination.module.css";

export default function ReadDestination() {
  const [destination, setDestination] = useState({});
  const [showModal, setShowModal] = useState(false);
  const { url } = useParams();

  useEffect(() => {
    async function getDestinationData() {
      try {
        const data = await fetchDestination(url);
        if (!data) throw new Error("Could not find destination data");
        setDestination(data);
      } catch (error) {
        alert("Error: " + error);
      }
    }
    getDestinationData();
  }, []);

  async function handleDeleteDestination() {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/destinations/delete/${url}`,
        {
          method: "delete",
        }
      );
      if (!res.ok) throw new Error("An error occurred");
      const data = await res.json();
      if (!data) throw new Error("Destination was not found");
      console.log(data);
      alert("Message: " + data.message);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div>
      {showModal && (
        <DeleteModal
          showModal={showModal}
          onCancel={() => setShowModal(false)}
          onDelete={handleDeleteDestination}
        />
      )}
      <h1>{destination.name}</h1>
      <div className="row mb-5">
        <h4 className="col-2">URL</h4>
        <p className="col-8">{destination.url}</p>
      </div>
      <div className="row mb-5">
        <h4 className="col-2">Image</h4>
        <img className="col-8" src={destination.image} />
      </div>
      <div className="row mb-5">
        <h4 className="col-2">Description</h4>
        <div
          className="col-10"
          dangerouslySetInnerHTML={{ __html: destination.description }}
        ></div>
      </div>
      <div className={styles.buttons}>
        <DeleteButton mb="10px" onClick={() => setShowModal(true)} />
        <UpdateButton href={`/destinations/update/${url}`} />
      </div>
    </div>
  );
}
