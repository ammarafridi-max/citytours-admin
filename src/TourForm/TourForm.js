import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams, useNavigate } from "react-router-dom";
import { createUrl } from "../CreateDestination/CreateDestination";
import InputGroup from "../Components/FormElements/InputGroup";
import { PrimarySection } from "../Components/Sections/Sections";
import ListGroup from "../Components/FormElements/ListGroup";
import TextEditor from "../TextEditor/TextEditor";
import PrimaryButton from "../Components/Buttons/PrimaryButton";
import AlertBox from "../Components/AlertBox/AlertBox";
import DeleteButton from "../Components/Buttons/DeleteButton";
import DeleteModal from "../Components/DeleteModal/DeleteModal";
import {
  fetchTour,
  createTour,
  updateTour,
  deleteTour,
  uploadToCloudinary,
} from "../services/tourService";
import { today } from "../services/dates";

export default function TourForm() {
  const { url } = useParams();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tourData, setTourData] = useState(initialTourState);
  const [newTourData, setNewTourData] = useState({ ...tourData });
  const [inclusionText, setInclusionText] = useState("");
  const [exclusionText, setExclusionText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const descriptionRef = useRef(null);
  const additionalInformationRef = useRef(null);

  useEffect(() => {
    if (url) {
      async function loadTour() {
        setIsLoading(true);
        try {
          const data = await fetchTour(url);
          setTourData(data);
          setNewTourData(data);
          if (descriptionRef.current)
            descriptionRef.current.setContent(data.description);
          if (additionalInformationRef.current)
            additionalInformationRef.current.setContent(
              data.additionalInformation
            );
        } catch (error) {
          setAlert(<AlertBox type="error">{error.message}</AlertBox>);
        } finally {
          setIsLoading(false);
        }
      }
      loadTour();
    } else {
      setNewTourData(initialTourState);
    }
  }, [url]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTourData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };
      if (name === "name") {
        updatedData.url = createUrl(value);
      }
      return updatedData;
    });
  };

  const handleNestedInputChange = (e, field, nestedField) => {
    const { value } = e.target;
    setNewTourData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        [nestedField]: value,
      },
    }));
  };

  const handleAddInclusion = (e) => {
    e.preventDefault();
    if (inclusionText.length > 0) {
      setNewTourData((prevData) => ({
        ...prevData,
        inclusions: [...prevData.inclusions, inclusionText],
      }));
      setInclusionText("");
    }
  };

  const handleRemoveInclusion = (index) => {
    setNewTourData((prevData) => ({
      ...prevData,
      inclusions: prevData.inclusions.filter((_, i) => i !== index),
    }));
  };

  const handleAddExclusion = (e) => {
    e.preventDefault();
    if (exclusionText.length > 0) {
      setNewTourData((prevData) => ({
        ...prevData,
        exclusions: [...prevData.exclusions, exclusionText],
      }));
      setExclusionText("");
    }
  };

  const handleRemoveExclusion = (index) => {
    setNewTourData((prevData) => ({
      ...prevData,
      exclusions: prevData.exclusions.filter((_, i) => i !== index),
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewTourData((prevData) => ({ ...prevData, image: file }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let imageUrl = "";
      if (newTourData.image && newTourData.image instanceof File) {
        imageUrl = await uploadToCloudinary(newTourData.image);
      }

      const formData = {
        ...newTourData,
        image: imageUrl || newTourData.image,
        description: descriptionRef.current.getContent(),
        additionalInformation: additionalInformationRef.current.getContent(),
        dateUpdated: today,
      };
      if (url) {
        await updateTour(url, formData);
        setAlert(
          <AlertBox type="success">Tour updated successfully.</AlertBox>
        );
      } else {
        await createTour(formData);
        setAlert(
          <AlertBox type="success">Tour created successfully.</AlertBox>
        );
      }
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      setAlert(<AlertBox type="error">{error.message}</AlertBox>);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteTour(url);
      setAlert(<AlertBox type="success">Tour deleted successfully.</AlertBox>);
      setTimeout(() => navigate("/tours"), 3000);
    } catch (error) {
      setAlert(<AlertBox type="error">{error.message}</AlertBox>);
    }
  };

  return (
    <>
      <Helmet>
        <title>{url ? `Update Tour - ${tourData.name}` : "Create Tour"}</title>
      </Helmet>
      <PrimarySection>
        <h1>{url ? "Update Tour" : "Create Tour"}</h1>
        <form onSubmit={handleFormSubmit}>
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
            {!url && (
              <InputGroup
                groupType="long"
                label="Date Created"
                type="text"
                value={tourData.dateCreated}
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
              value={newTourData.name}
              onChange={handleInputChange}
            />
            <InputGroup
              groupType="long"
              label="URL"
              type="text"
              name="url"
              value={newTourData.url}
              onChange={handleInputChange}
              disabled
            />
            <InputGroup
              groupType="long"
              label="Duration"
              type="text"
              name="duration"
              value={newTourData.duration}
              onChange={handleInputChange}
            />
          </div>

          <div className="row mb-5">
            <h2>Age Details</h2>
            <InputGroup
              groupType="long"
              label="Adults Age"
              type="text"
              name="adults"
              value={newTourData.age.adults}
              onChange={(e) => handleNestedInputChange(e, "age", "adults")}
              placeholder="18 - 60"
            />
            <InputGroup
              groupType="long"
              label="Children Age"
              type="text"
              name="children"
              value={newTourData.age.children}
              onChange={(e) => handleNestedInputChange(e, "age", "children")}
              placeholder="2 - 17"
            />
            <InputGroup
              groupType="long"
              label="Infants Age"
              type="text"
              name="infants"
              value={newTourData.age.infants}
              onChange={(e) => handleNestedInputChange(e, "age", "infants")}
              placeholder="0 - 2"
            />
          </div>

          <div className="row mb-5">
            <h2>Price</h2>
            <InputGroup
              groupType="long"
              label="Adults Price"
              type="number"
              name="adultsPrice"
              value={newTourData.price.adults}
              onChange={(e) => handleNestedInputChange(e, "price", "adults")}
            />
            <InputGroup
              groupType="long"
              label="Children Price"
              type="number"
              name="childrenPrice"
              value={newTourData.price.children}
              onChange={(e) => handleNestedInputChange(e, "price", "children")}
            />
            <InputGroup
              groupType="long"
              label="Infant Price"
              type="number"
              name="infantPrice"
              value={newTourData.price.infants}
              onChange={(e) => handleNestedInputChange(e, "price", "infants")}
            />
          </div>

          <div className="row mb-5">
            <h2>Location</h2>
            <InputGroup
              groupType="long"
              label="City"
              type="text"
              name="city"
              value={newTourData.location.city}
              onChange={(e) => handleNestedInputChange(e, "location", "city")}
            />
            <InputGroup
              groupType="long"
              label="Country"
              type="text"
              name="country"
              value={newTourData.location.country}
              onChange={(e) =>
                handleNestedInputChange(e, "location", "country")
              }
            />
          </div>

          <div className="row mb-5">
            <h2>Inclusions</h2>
            <ListGroup
              title="Inclusions"
              name="inclusionText"
              value={inclusionText}
              onAddItem={handleAddInclusion}
              onRemoveItem={handleRemoveInclusion}
              list={newTourData.inclusions}
              onChange={(e) => setInclusionText(e.target.value)}
            />
          </div>

          <div className="row mb-5">
            <h2>Exclusions</h2>
            <ListGroup
              title="Exclusions"
              name="exclusionText"
              value={exclusionText}
              onAddItem={handleAddExclusion}
              onRemoveItem={handleRemoveExclusion}
              list={newTourData.exclusions}
              onChange={(e) => setExclusionText(e.target.value)}
            />
          </div>

          <div className="row mb-5">
            <h2>Description</h2>
            <TextEditor
              onInit={(_evt, editor) => (descriptionRef.current = editor)}
              initialValue={url ? newTourData.description : ""}
            />
          </div>

          <div className="row mb-5">
            <h2>Additional Details</h2>
            <TextEditor
              onInit={(_evt, editor) =>
                (additionalInformationRef.current = editor)
              }
              initialValue={url ? newTourData.additionalInformation : ""}
            />
          </div>

          {alert}

          {url && showModal && (
            <DeleteModal
              item={newTourData.name}
              onCancel={() => {
                setShowModal(false);
              }}
              onDelete={handleDelete}
            />
          )}

          <div className="col-6 mx-auto text-center">
            {url && (
              <>
                <DeleteButton
                  onClick={(e) => {
                    e.preventDefault();
                    setShowModal(true);
                  }}
                >
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
              <PrimaryButton type="submit" disabled={tourData === newTourData}>
                Submit
              </PrimaryButton>
            )}
          </div>
        </form>
      </PrimarySection>
    </>
  );
}

const initialTourState = {
  dateCreated: today,
  dateUpdated: "",
  name: "",
  url: "",
  image: "",
  description: "",
  duration: "",
  location: { city: "", country: "" },
  age: { adults: "18 - 60", children: "2 - 17", infants: "0 - 2" },
  price: { adults: 0, children: 0, infants: 0 },
  inclusions: [],
  exclusions: [],
  additionalInformation: "",
};
