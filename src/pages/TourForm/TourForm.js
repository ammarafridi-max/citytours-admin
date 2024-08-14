import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { PrimarySection } from "../../components/Sections/Sections";
import InputGroup from "../../components/FormElements/InputGroup";
import ListGroup from "../../components/FormElements/ListGroup";
import TextEditor from "../../components/TextEditor/TextEditor";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import DeleteButton from "../../components/Buttons/DeleteButton";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import { useTourForm, initialTourState } from "../../hooks/useTourForm";
import Loading from "../../components/Loading/Loading";

export default function TourForm() {
  const { url } = useParams();
  const {
    tourData,
    isLoading,
    alert,
    showModal,
    descriptionRef,
    additionalInformationRef,
    setShowModal,
    handleInputChange,
    handleNestedInputChange,
    handleListChange,
    handleFileChange,
    handleFormSubmit,
    handleDelete,
  } = useTourForm(url);

  return (
    <>
      {isLoading && <Loading />}
      <Helmet>
        <title>{url ? `Update Tour - ${tourData.name}` : "Create Tour"}</title>
      </Helmet>
      <PrimarySection>
        <h1>{url ? "Update Tour" : "Create Tour"}</h1>
        <form onSubmit={handleFormSubmit}>
          <BasicDetailsSection
            url={url}
            tourData={tourData}
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
          />
          <LocationSection
            location={tourData.location}
            handleNestedInputChange={handleNestedInputChange}
          />
          <AgeDetailsSection
            age={tourData.age}
            handleNestedInputChange={handleNestedInputChange}
          />
          <PriceSection
            price={tourData.price}
            handleNestedInputChange={handleNestedInputChange}
          />
          <InclusionExclusionSection
            inclusions={tourData.inclusions}
            exclusions={tourData.exclusions}
            handleListChange={handleListChange}
          />
          <DescriptionSection
            descriptionRef={descriptionRef}
            additionalInformationRef={additionalInformationRef}
            initialDescription={tourData.description}
            initialAdditionalInformation={tourData.additionalInformation}
          />
          {alert}
          {url && showModal && (
            <DeleteModal
              item={tourData.name}
              onCancel={() => setShowModal(false)}
              onDelete={handleDelete}
            />
          )}
          <FormButtons
            url={url}
            isLoading={isLoading}
            setShowModal={setShowModal}
            isFormChanged={
              JSON.stringify(tourData) === JSON.stringify(initialTourState)
            }
          />
        </form>
      </PrimarySection>
    </>
  );
}

const BasicDetailsSection = ({
  url,
  tourData,
  handleInputChange,
  handleFileChange,
}) => (
  <div className="row mb-5">
    <h2>Basic Details</h2>
    {url && (
      <InputGroup
        groupType="long"
        label="Current Image"
        type="text"
        value={tourData.image}
        name="currentImage"
        disabled
      />
    )}
    <InputGroup
      groupType="long"
      label="Image"
      type="file"
      name="image"
      onChange={handleFileChange}
    />
    <InputGroup
      groupType="long"
      label="Name"
      type="text"
      name="name"
      value={tourData.name}
      onChange={handleInputChange}
    />
    <InputGroup
      groupType="long"
      label="URL"
      type="text"
      name="url"
      value={tourData.url}
      onChange={handleInputChange}
      disabled
    />
    <InputGroup
      groupType="long"
      label="Duration"
      type="text"
      name="duration"
      value={tourData.duration}
      onChange={handleInputChange}
    />
  </div>
);

const LocationSection = ({ location, handleNestedInputChange }) => (
  <div className="row mb-5">
    <h2>Location</h2>
    <InputGroup
      groupType="long"
      label="City"
      type="text"
      name="city"
      value={location.city}
      onChange={(e) => handleNestedInputChange(e, "location", "city")}
    />
    <InputGroup
      groupType="long"
      label="Country"
      type="text"
      name="country"
      value={location.country}
      onChange={(e) => handleNestedInputChange(e, "location", "country")}
    />
  </div>
);

const AgeDetailsSection = ({ age, handleNestedInputChange }) => (
  <div className="row mb-5">
    <h2>Age Details</h2>
    {["adults", "children", "infants"].map((ageGroup) => (
      <InputGroup
        key={ageGroup}
        groupType="long"
        label={`${ageGroup.charAt(0).toUpperCase() + ageGroup.slice(1)} Age`}
        type="text"
        name={ageGroup}
        value={age[ageGroup]}
        onChange={(e) => handleNestedInputChange(e, "age", ageGroup)}
        placeholder={
          ageGroup === "adults"
            ? "18 - 60"
            : ageGroup === "children"
            ? "2 - 17"
            : "0 - 2"
        }
      />
    ))}
  </div>
);

const PriceSection = ({ price, handleNestedInputChange }) => (
  <div className="row mb-5">
    <h2>Price</h2>
    {["adults", "children", "infants"].map((priceGroup) => (
      <InputGroup
        key={priceGroup}
        groupType="long"
        label={`${
          priceGroup.charAt(0).toUpperCase() + priceGroup.slice(1)
        } Price`}
        type="number"
        name={priceGroup}
        value={price[priceGroup]}
        onChange={(e) => handleNestedInputChange(e, "price", priceGroup)}
      />
    ))}
  </div>
);

const InclusionExclusionSection = ({
  inclusions,
  exclusions,
  handleListChange,
}) => {
  const [inclusionText, setInclusionText] = useState("");
  const [exclusionText, setExclusionText] = useState("");

  return (
    <>
      <ListGroup
        title="Inclusions"
        name="inclusionText"
        value={inclusionText}
        onAddItem={() => {
          handleListChange("inclusions", "add", inclusionText);
          setInclusionText("");
        }}
        onRemoveItem={(index) =>
          handleListChange("inclusions", "remove", null, index)
        }
        list={inclusions}
        onChange={(e) => setInclusionText(e.target.value)}
      />
      <ListGroup
        title="Exclusions"
        name="exclusionText"
        value={exclusionText}
        onAddItem={() => {
          handleListChange("exclusions", "add", exclusionText);
          setExclusionText("");
        }}
        onRemoveItem={(index) =>
          handleListChange("exclusions", "remove", null, index)
        }
        list={exclusions}
        onChange={(e) => setExclusionText(e.target.value)}
      />
    </>
  );
};

const DescriptionSection = ({
  descriptionRef,
  additionalInformationRef,
  initialDescription,
  initialAdditionalInformation,
}) => (
  <>
    <div className="row mb-5">
      <h2>Description</h2>
      <TextEditor
        onInit={(_evt, editor) => (descriptionRef.current = editor)}
        initialValue={initialDescription}
      />
    </div>
    <div className="row mb-5">
      <h2>Additional Details</h2>
      <TextEditor
        onInit={(_evt, editor) => (additionalInformationRef.current = editor)}
        initialValue={initialAdditionalInformation}
      />
    </div>
  </>
);

const FormButtons = ({ url, isLoading, setShowModal, isFormChanged }) => (
  <div className="col-6 mx-auto text-center">
    {url && (
      <>
        <DeleteButton type="button" onClick={() => setShowModal(true)}>
          Delete
        </DeleteButton>
        <span className="mx-2"></span>
      </>
    )}
    {isLoading ? (
      <PrimaryButton disabled>
        <span
          className="spinner-grow spinner-grow-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Loading
      </PrimaryButton>
    ) : (
      <PrimaryButton type="submit" disabled={isFormChanged}>
        Submit
      </PrimaryButton>
    )}
  </div>
);
