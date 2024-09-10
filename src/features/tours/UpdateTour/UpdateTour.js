import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Label from "../../../components/FormElements/Label";
import Loading from "../../../components/Loading/Loading";
import { PrimarySection } from "../../../components/Sections/Sections";
import { useTours } from "../useTours";
import { useDestinations } from "../../destinations/useDestinations";
import InputGroup from "../../../components/FormElements/InputGroup";
import SelectGroup from "../../../components/FormElements/SelectGroup";
import styles from "./UpdateTour.module.css";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";

export default function UpdateTour() {
  const { url } = useParams();
  const { tour, setTour, isLoading, setIsLoading } = useTours(url);
  const { destinationOptions } = useDestinations();
  const [newImage, setNewImage] = useState("");

  const handleChange = (state) => (e) => {
    const value = state === "image" ? e.target.files[0] : e.target.value;
    setTour((prevState) => {
      const newState = { ...prevState, [state]: value };
      return newState;
    });
  };

  async function handleUpdateTour(e) {
    try {
      e.preventDefault();
      setIsLoading(true);
      console.log(tour);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && <Loading />}
      <BasicInformation
        dateCreated={tour.dateCreated}
        dateUpdated={tour.dateUpdated}
        title={tour.title}
        url={tour.url}
        newImage={newImage}
        days={tour.duration.days}
        nights={tour.duration.nights}
        destination={tour.destination}
        status={tour.status}
        price={tour.price}
        age={tour.age}
        destinationOptions={destinationOptions}
        handleChange={handleChange}
      />
      <div className="text-center">
        <PrimaryButton onClick={handleUpdateTour}>Update</PrimaryButton>
      </div>
    </>
  );
}

function BasicInformation({
  dateCreated,
  dateUpdated,
  title,
  url,
  newImage,
  days,
  nights,
  destination,
  status,
  price,
  age,
  destinationOptions,
  handleChange,
}) {
  return (
    <PrimarySection>
      <h2>Basic Information</h2>

      <InputGroup
        groupType="long"
        label="Date Created"
        name="dateCreated"
        value={dateCreated}
        disabled
      />

      <InputGroup
        groupType="long"
        label="Date Updated"
        name="dateUpdated"
        value={dateUpdated}
        disabled
      />

      <InputGroup
        groupType="long"
        label="Title"
        name="title"
        type="text"
        value={title}
        onChange={handleChange("title")}
      />

      <InputGroup
        groupType="long"
        label="URL"
        name="url"
        type="text"
        value={url}
        onChange={handleChange("url")}
      />

      <InputGroup
        groupType="long"
        label="New Image"
        name="newImage"
        type="file"
        onChange={handleChange("newImage")}
      />

      <SelectGroup
        groupType="long"
        label="Destination"
        value={destination}
        onChange={handleChange("destination")}
      >
        <option value=""></option>
        {destinationOptions.map((destination) => (
          <option value={destination}>{destination}</option>
        ))}
      </SelectGroup>

      <SelectGroup
        groupType="long"
        label="Status"
        value={status}
        onChange={handleChange("status")}
      >
        <option value=""></option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="archive">Archive</option>
      </SelectGroup>
    </PrimarySection>
  );
}

function Duration({ duration }) {
  return (
    <div className="row mx-0">
      <div className="col-2">
        <Label>Duration</Label>
      </div>
    </div>
  );
}
