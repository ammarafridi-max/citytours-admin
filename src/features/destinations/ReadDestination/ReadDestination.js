import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDestination } from "../../../services/destinationServices";
import InputGroup from "../../../components/FormElements/InputGroup";
import DeleteButton from "../../../components/Buttons/DeleteButton";
import DeleteIconButton from "../../../components/Buttons/DeleteIconButton";
import UpdateButton from "../../../components/Buttons/UpdateButton";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import styles from "./ReadDestination.module.css";
import Label from "../../../components/FormElements/Label";

export default function ReadDestination() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [destination, setDestination] = useState({});
  const [showModal, setShowModal] = useState(false);
  const { url } = useParams();

  useEffect(() => {
    async function getDestinationData() {
      try {
        setIsLoading(true);
        const data = await fetchDestination(url);
        if (!data) throw new Error("Could not find destination data");
        setDestination(data);
        console.log(data);
      } catch (error) {
        alert("Error: " + error);
      } finally {
        setIsLoading(false);
      }
    }
    getDestinationData();
  }, []);

  async function handleDeleteDestination() {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/destinations/delete/${url}`,
        { method: "delete" }
      );
      if (!res.ok) throw new Error("An error occurred");
      const data = await res.json();
      if (!data) throw new Error("Destination was not found");
      console.log(data);
      alert("Message: " + data.message);
      navigate("/destinations");
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Helmet>
        <title>Read Destination {`${destination.name}`}</title>
      </Helmet>
      {showModal && (
        <DeleteModal
          showModal={showModal}
          onCancel={() => setShowModal(false)}
          onDelete={handleDeleteDestination}
        />
      )}
      <h1>{destination.name}</h1>

      <InputGroup
        groupType="long"
        label="Name"
        value={destination.name}
        disabled
      />

      <InputGroup
        groupType="long"
        label="URL"
        value={destination.url}
        disabled
      />

      <InputGroup
        groupType="long"
        label="country"
        value={destination.country}
        disabled
      />

      <InputGroup
        groupType="long"
        label="Active"
        value={destination.active ? "Yes" : "No"}
        disabled
      />

      <div className="row mb-5 align-items-center p-0 m-0">
        <div className="col-2">
          <Label>Image</Label>
        </div>
        <img className="col-10" src={destination.image} />
      </div>

      <div className="row mb-5 align-items-center p-0 m-0">
        <div className="col-2">
          <Label>Description</Label>
        </div>
        <div
          className="col-10"
          dangerouslySetInnerHTML={{ __html: destination.description }}
        ></div>
      </div>

      <div className={styles.buttons}>
        <DeleteIconButton mb="10px" onClick={() => setShowModal(true)} />
        <UpdateButton href={`/destinations/update/${url}`} />
      </div>
    </div>
  );
}
