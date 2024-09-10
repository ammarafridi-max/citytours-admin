import styles from "./CreateTour.module.css";
import { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { useDestinations } from "../../destinations/useDestinations";
import { formatDate } from "../../../utils/formatDate";
import { createUrl } from "../../../utils/createUrl";
import { Editor } from "@tinymce/tinymce-react";
import { uploadToCloudinary } from "../../../services/tourServices";
import { useTours, initialTourState } from "../useTours";
import { PrimarySection } from "../../../components/Sections/Sections";
import InputGroup from "../../../components/FormElements/InputGroup";
import Label from "../../../components/FormElements/Label";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import Loading from "../../../components/Loading/Loading";
import Input from "../../../components/FormElements/Input";
import SelectGroup from "../../../components/FormElements/SelectGroup";
import { useNavigate } from "react-router-dom";

export default function CreateTour() {
  const navigate = useNavigate();
  const descriptionRef = useRef(null);
  const { destinationOptions } = useDestinations();
  const [isLoading, setIsLoading] = useState(false);
  const [tour, setTour] = useState({
    dateCreated: formatDate(new Date()),
    dateUpdated: "",
    title: "",
    url: "",
    image: "",
    description: "",
    duration: { days: "", nights: "" },
    inclusions: [],
    exclusions: [],
    destination: "",
    status: "",
    age: { adults: "13+", children: "3 - 12", infants: "0 - 2" },
    price: { adults: 0, children: 0, infants: 0 },
  });

  const handleChange = (state) => (e) => {
    const value = state === "image" ? e.target.files[0] : e.target.value;
    setTour((prevState) => {
      const newState = { ...prevState, [state]: value };
      return newState;
    });
  };

  const handleAgeChange = (key) => (e) => {
    const value = e.target.value;
    setTour((prevState) => ({
      ...prevState,
      age: {
        ...prevState.age,
        [key]: value,
      },
    }));
  };

  async function handleAddTour(e) {
    try {
      e.preventDefault();
      setIsLoading(true);

      let imageUrl = tour.image;
      if (tour.image && tour.image instanceof File) {
        imageUrl = await uploadToCloudinary(tour.image);
      }

      const updatedTour = {
        ...tour,
        image: imageUrl,
        description: descriptionRef.current.getContent(),
        url: !tour.url && createUrl(tour.title),
        status: tour.status.toUpperCase(),
        inclusions: tour.inclusions.split("\n"),
        exclusions: tour.exclusions.split("\n"),
      };

      console.log(updatedTour);

      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/tours/create`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTour),
        }
      );

      if (res.status === 409) return alert("Tour with same URL exists");

      if (!res.ok) {
        throw new Error("Failed to add blog");
      }

      if (res.status === 200) alert("Tour added");
      navigate("/tours");
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && <Loading />}
      <Helmet>
        <title>Create Tour</title>
      </Helmet>
      <h1>Create Tour</h1>
      <div>
        <BasicInformation
          handleChange={handleChange}
          dateCreated={tour.dateCreated}
          title={tour.title}
          url={tour.url}
          image={tour.image}
          destination={tour.destination}
          duration={tour.duration}
          setTour={setTour}
          status={tour.status}
        />

        <AgeDetails
          adults={tour.age.adults}
          children={tour.age.children}
          infants={tour.age.infants}
          handleAgeChange={handleAgeChange}
        />

        <Price
          adults={tour.price.adults}
          children={tour.price.children}
          infants={tour.price.infants}
          setTour={setTour}
        />

        <InclusionsExclusions
          inclusions={tour.inclusions}
          exclusions={tour.exclusions}
          onChange={handleChange}
        />

        <TourDescription descriptionRef={descriptionRef} />

        <div className="text-center">
          <PrimaryButton onClick={handleAddTour}>Update</PrimaryButton>
        </div>
      </div>
    </>
  );
}

function BasicInformation({
  dateCreated,
  title,
  url,
  image,
  destination,
  duration,
  setTour,
  status,
  handleChange,
}) {
  const { destinationOptions } = useDestinations();

  return (
    <PrimarySection>
      <h2>Basic Information</h2>
      <InputGroup
        groupType="long"
        name="dateCreated"
        label="Date Created"
        value={dateCreated}
        type="text"
        disabled
      />

      <InputGroup
        groupType="long"
        name="title"
        label="Title"
        value={title}
        type="text"
        onChange={handleChange("title")}
      />

      <InputGroup
        groupType="long"
        name="url"
        label="URL"
        value={url}
        type="text"
        onChange={handleChange("url")}
      />

      <InputGroup
        groupType="long"
        name="image"
        label="Image"
        type="file"
        onChange={handleChange("image")}
      />

      <SelectGroup
        groupType="long"
        label="Destination"
        value={destination}
        onChange={handleChange("destination")}
      >
        <option value="" selected="selected"></option>
        {destinationOptions.map((destination, i) => (
          <option key={i} value={destination}>
            {destination}
          </option>
        ))}
      </SelectGroup>

      <SelectGroup
        groupType="long"
        label="Status"
        value={status}
        onChange={handleChange("status")}
      >
        <option value="" selected="selected"></option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="archive">Archive</option>
      </SelectGroup>

      <Duration
        days={duration.days}
        nights={duration.nights}
        setTour={setTour}
      />
    </PrimarySection>
  );
}

function Duration({ days, nights, setTour }) {
  const handleDurationChange = (key) => (e) => {
    const value = e.target.value;
    setTour((prevState) => ({
      ...prevState,
      duration: {
        ...prevState.duration,
        [key]: value,
      },
    }));
  };

  return (
    <div className="row mx-0 align-items-center">
      <div className="col-2">
        <Label>Duration</Label>
      </div>
      <div className="col-5">
        <Input
          type="text"
          name="days"
          placeholder="Days"
          value={days}
          onChange={handleDurationChange("days")}
        />
      </div>
      <div className="col-5">
        <Input
          type="text"
          name="nights"
          placeholder="Nights"
          value={nights}
          onChange={handleDurationChange("nights")}
        />
      </div>
    </div>
  );
}

function Price({ setTour, adults, children, infants }) {
  const handlePriceChange = (key) => (e) => {
    const value = e.target.value;
    setTour((prevState) => ({
      ...prevState,
      price: {
        ...prevState.price,
        [key]: value,
      },
    }));
  };

  return (
    <>
      <PrimarySection mt="50px">
        <h2>Price</h2>
        <div className="row mx-0">
          <InputGroup
            groupType="short"
            label="Adults"
            value={adults}
            onChange={handlePriceChange("adults")}
          />
          <InputGroup
            groupType="short"
            label="Children"
            value={children}
            onChange={handlePriceChange("children")}
          />
          <InputGroup
            groupType="short"
            label="Infants"
            value={infants}
            onChange={handlePriceChange("infants")}
          />
        </div>
      </PrimarySection>
    </>
  );
}

function AgeDetails({ adults, children, infants, handleAgeChange }) {
  return (
    <PrimarySection mt="50px">
      <h2>Age Details</h2>

      <div className="row mx-0">
        <InputGroup
          groupType="short"
          label="Adults"
          value={adults}
          onChange={handleAgeChange("adults")}
        />
        <InputGroup
          groupType="short"
          label="Children"
          value={children}
          onChange={handleAgeChange("children")}
        />
        <InputGroup
          groupType="short"
          label="Infants"
          value={infants}
          onChange={handleAgeChange("infants")}
        />
      </div>
    </PrimarySection>
  );
}

function InclusionsExclusions({ inclusions, exclusions, onChange }) {
  return (
    <PrimarySection my="50px">
      <div className="row mx-0">
        <div className="col-6">
          <h2>Inclusions</h2>
          <textarea
            className={styles.textarea}
            value={inclusions}
            onChange={onChange("inclusions")}
          />
        </div>
        <div className="col-6">
          <h2>Exclusions</h2>
          <textarea
            className={styles.textarea}
            value={exclusions}
            onChange={onChange("exclusions")}
          />
        </div>
      </div>
    </PrimarySection>
  );
}

function TourDescription({ descriptionRef }) {
  return (
    <PrimarySection>
      <h2>Description</h2>

      <Editor
        apiKey={process.env.REACT_APP_TEXT_EDITOR_API_KEY}
        onInit={(_evt, editor) => (descriptionRef.current = editor)}
        init={{
          height: 400,
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
    </PrimarySection>
  );
}
