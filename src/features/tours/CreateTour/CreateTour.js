import styles from "./CreateTour.module.css";
import { Helmet } from "react-helmet";
import { useDestinations } from "../../destinations/useDestinations";
import { formatDate } from "../../../utils/formatDate";
import { Editor } from "@tinymce/tinymce-react";
import { useTours } from "../useTours";
import { PrimarySection } from "../../../components/Sections/Sections";
import InputGroup from "../../../components/FormElements/InputGroup";
import Label from "../../../components/FormElements/Label";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import Loading from "../../../components/Loading/Loading";
import Input from "../../../components/FormElements/Input";
import SelectGroup from "../../../components/FormElements/SelectGroup";

export default function CreateTour() {
  const { descriptionRef, isLoading, handleCreateTour, newTour, setNewTour } =
    useTours();

  const handleChange = (state) => (e) => {
    const value = state === "image" ? e.target.files[0] : e.target.value;
    setNewTour((prevState) => {
      const newState = { ...prevState, [state]: value };
      return newState;
    });
  };

  const handleAgeChange = (key) => (e) => {
    const value = e.target.value;
    setNewTour((prevState) => ({
      ...prevState,
      age: {
        ...prevState.age,
        [key]: value,
      },
    }));
  };

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
          dateCreated={formatDate(newTour.dateCreated)}
          title={newTour.title}
          url={newTour.url}
          image={newTour.image}
          destination={newTour.destination}
          duration={newTour.duration}
          setNewTour={setNewTour}
          status={newTour.status}
        />

        <AgeDetails
          adults={newTour.age.adults}
          children={newTour.age.children}
          infants={newTour.age.infants}
          handleAgeChange={handleAgeChange}
        />

        <Price
          adults={newTour.price.adults}
          children={newTour.price.children}
          infants={newTour.price.infants}
          setNewTour={setNewTour}
        />

        <InclusionsExclusions
          inclusions={newTour.inclusions}
          exclusions={newTour.exclusions}
          onChange={handleChange}
        />

        <TourDescription descriptionRef={descriptionRef} />

        <div className="text-center">
          <PrimaryButton onClick={handleCreateTour}>Update</PrimaryButton>
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
  setNewTour,
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
        setNewTour={setNewTour}
      />
    </PrimarySection>
  );
}

function Duration({ days, nights, setNewTour }) {
  const handleDurationChange = (key) => (e) => {
    const value = e.target.value;
    setNewTour((prevState) => ({
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

function Price({ setNewTour, adults, children, infants }) {
  const handlePriceChange = (key) => (e) => {
    const value = e.target.value;
    setNewTour((prevState) => ({
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
