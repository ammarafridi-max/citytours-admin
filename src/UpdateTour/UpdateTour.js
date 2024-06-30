import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { createUrl } from "../CreateDestination/CreateDestination";
import InputGroup from "../Components/FormElements/InputGroup";
import { PrimarySection } from "../Components/Sections/Sections";
import SectionTitle from "../CreateTour/SectionTitle";
import ListGroup from "../Components/FormElements/ListGroup";
import TextEditor from "../TextEditor/TextEditor";
import PrimaryButton from "../Components/Buttons/PrimaryButton";

export default function UpdateTour() {
  const [tourData, setTourData] = useState({
    name: "",
    url: "",
    image: "",
    description: "",
    duration: "",
    location: {
      city: "",
      country: "",
    },
    age: {
      adults: "18 - 60",
      children: "2 - 17",
      infants: "0 - 2",
    },
    price: {
      adults: 0,
      children: 0,
      infants: 0,
    },
    inclusions: [],
    exclusions: [],
    additionalInformation: "",
  });
  const [newTourData, setNewTourData] = useState({
    name: "",
    url: "",
    image: "",
    description: "",
    duration: "",
    location: {
      city: "",
      country: "",
    },
    age: {
      adults: "18 - 60",
      children: "2 - 17",
      infants: "0 - 2",
    },
    price: {
      adults: 0,
      children: 0,
      infants: 0,
    },
    inclusions: [],
    exclusions: [],
    additionalInformation: "",
  });
  const { url } = useParams();
  const [inclusionText, setInclusionText] = useState("");
  const [exclusionText, setExclusionText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const descriptionRef = useRef(tourData.description);
  const additionalInformationRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTourData((prevData) => {
      const newtourData = {
        ...prevData,
        [name]: value,
      };
      if (name === "name") {
        newtourData.url = createUrl(value);
      }
      return newtourData;
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
    e.preventDefault(); // Prevent default form submission
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
    setNewTourData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  useEffect(() => {
    async function fetchTour() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/tours/${url}`
        );
        if (res.status === 404) throw new Error({ message: "Tour not found" });
        const data = await res.json();
        setTourData(data);
        setNewTourData(data);
        console.log(tourData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTour();
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    console.log(tourData);
    console.log(newTourData);
  };

  return (
    <>
      <Helmet>
        <title>Update Tour - {tourData.name}</title>
      </Helmet>
      <PrimarySection>
        <h1>Update Tour</h1>

        <div className="mb-5">
          <InputGroup
            groupType="long"
            label="Image"
            type="file"
            name="name"
            value=""
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

        {/* Age Details */}
        <div className="row mb-5">
          <SectionTitle>Age Details</SectionTitle>

          <InputGroup
            groupType="long"
            label="Adults Age"
            type="text"
            name="adults"
            value={newTourData.age.adults}
            placeholder="18 - 60"
            onChange={(e) => handleNestedInputChange(e, "age", "adults")}
          />

          <InputGroup
            groupType="long"
            label="Children Age"
            type="text"
            name="children"
            value={newTourData.age.children}
            placeholder="2 - 17"
            onChange={(e) => handleNestedInputChange(e, "age", "children")}
          />

          <InputGroup
            groupType="long"
            label="Infants Age"
            type="text"
            name="infant"
            value={newTourData.age.infants}
            placeholder="0 - 2"
            onChange={(e) => handleNestedInputChange(e, "age", "infants")}
          />
        </div>

        {/* Price */}
        <div className="row mb-5">
          <SectionTitle>Price</SectionTitle>

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

        {/* Location */}
        <div className="row mb-5">
          <SectionTitle>Location</SectionTitle>

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
            onChange={(e) => handleNestedInputChange(e, "location", "country")}
          />
        </div>

        {/* Inclusions */}
        <div className="row mb-5">
          <SectionTitle>Inclusions</SectionTitle>

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

        {/* Exclusions */}
        <div className="row mb-5">
          <SectionTitle>Exclusions</SectionTitle>

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

        {/* Description */}

        <div className="row mb-5">
          <SectionTitle>Description</SectionTitle>
          <TextEditor
            onInit={(_evt, editor) => (descriptionRef.current = editor)}
          />
        </div>

        {/* Additional Details */}

        <div className="row mb-5">
          <SectionTitle>Additional Details</SectionTitle>
          <TextEditor
            onInit={(_evt, editor) =>
              (additionalInformationRef.current = editor)
            }
          />
        </div>

        {/* Button */}

        <div className="col-6 mx-auto text-center">
          {isLoading && (
            <PrimaryButton onClick={handleForm}>
              <span
                className="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Loading
            </PrimaryButton>
          )}
          {!isLoading && (
            <PrimaryButton
              onClick={handleForm}
              disabled={tourData === newTourData}
            >
              Submit
            </PrimaryButton>
          )}
        </div>
      </PrimarySection>
    </>
  );
}
