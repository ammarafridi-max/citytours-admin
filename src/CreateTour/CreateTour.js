import styles from "./CreateTour.module.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createUrl } from "../CreateDestination/CreateDestination";
import { FaTrash, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { PrimarySection } from "../Components/Sections/Sections";
import TextEditor from "../TextEditor/TextEditor";
import Input from "../Components/FormElements/Input";
import InputGroup from "../Components/FormElements/InputGroup";
import PrimaryButton from "../Components/Buttons/PrimaryButton";
import SectionTitle from "./SectionTitle";
import AlertBox from "../Components/AlertBox/AlertBox";
import { Helmet } from "react-helmet";

export default function CreateTour() {
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
      infant: "0 - 2",
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
  const [inclusionText, setInclusionText] = useState("");
  const [exclusionText, setExclusionText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState();
  const description = useRef(null);
  const additionalInformation = useRef(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTourData((prevData) => {
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
    setTourData((prevData) => ({
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
      setTourData((prevData) => ({
        ...prevData,
        inclusions: [...prevData.inclusions, inclusionText],
      }));
      setInclusionText("");
    }
  };

  const handleRemoveInclusion = (index) => {
    setTourData((prevData) => ({
      ...prevData,
      inclusions: prevData.inclusions.filter((_, i) => i !== index),
    }));
  };

  const handleAddExclusion = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (exclusionText.length > 0) {
      setTourData((prevData) => ({
        ...prevData,
        exclusions: [...prevData.exclusions, exclusionText],
      }));
      setExclusionText("");
    }
  };

  const handleRemoveExclusion = (index) => {
    setTourData((prevData) => ({
      ...prevData,
      exclusions: prevData.exclusions.filter((_, i) => i !== index),
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setTourData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      `${process.env.REACT_APP_CLOUDINARY_TOUR_PRESET}`
    );
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "post", body: formData }
    );
    const data = await response.json();
    return data.secure_url;
  }

  async function handleForm(e) {
    try {
      setIsLoading(true);
      e.preventDefault();

      let imageUrl = "";
      if (tourData.image) {
        imageUrl = await uploadToCloudinary(tourData.image);
      }

      const newTourData = {
        ...tourData,
        image: imageUrl,
        description: description.current
          ? description.current.getContent()
          : "",
        additionalInformation: additionalInformation.current
          ? additionalInformation.current.getContent()
          : "",
      };

      console.log(newTourData);

      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/tours/create`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTourData),
        }
      );
      if (res.status === 409) throw new Error("Tour with same url exists");
      if (!res.ok) throw new Error("Tour could not be added");
      const data = await res.json();

      setAlert(<AlertBox type="success">Tour added successfully</AlertBox>);

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setAlert(<AlertBox type="error">{error.message}</AlertBox>);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Create Tour</title>
      </Helmet>
      <PrimarySection>
        <h1>Create Tour</h1>
        <form onSubmit={handleForm}>
          <div className="row mb-5">
            <SectionTitle>Basic Details</SectionTitle>

            <InputGroup
              groupType="long"
              label="Image"
              type="file"
              name="name"
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
              // onChange={handleInputChange}
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

          {/* Age Details */}
          <div className="row mb-5">
            <SectionTitle>Age Details</SectionTitle>

            <InputGroup
              groupType="long"
              label="Adults Age"
              type="text"
              name="adults"
              value={tourData.age.adults}
              onChange={(e) => handleNestedInputChange(e, "age", "adults")}
              placeholder="18 - 60"
            />

            <InputGroup
              groupType="long"
              label="Children Age"
              type="text"
              name="children"
              value={tourData.age.children}
              onChange={(e) => handleNestedInputChange(e, "age", "children")}
              placeholder="2 - 17"
            />

            <InputGroup
              groupType="long"
              label="Infants Age"
              type="text"
              name="infant"
              value={tourData.age.infant}
              onChange={(e) => handleNestedInputChange(e, "age", "infant")}
              placeholder="0 - 2"
            />
          </div>

          {/* price Details */}

          <div className="row mb-5">
            <SectionTitle>Price</SectionTitle>

            <InputGroup
              groupType="long"
              label="Adults Price"
              type="number"
              name="adultsPrice"
              value={tourData.price.adults}
              onChange={(e) => handleNestedInputChange(e, "price", "adults")}
            />

            <InputGroup
              groupType="long"
              label="Children Price"
              type="number"
              name="childrenPrice"
              value={tourData.price.children}
              onChange={(e) => handleNestedInputChange(e, "price", "children")}
            />

            <InputGroup
              groupType="long"
              label="Infant Price"
              type="number"
              name="infantPrice"
              value={tourData.price.infants}
              onChange={(e) => handleNestedInputChange(e, "price", "infants")}
            />
          </div>

          {/* Location Details */}
          <div className="row mb-5">
            <SectionTitle>Location</SectionTitle>

            <InputGroup
              groupType="long"
              label="City"
              type="text"
              name="city"
              value={tourData.location.city}
              onChange={(e) => handleNestedInputChange(e, "location", "city")}
            />

            <InputGroup
              groupType="long"
              label="Country"
              type="text"
              name="country"
              value={tourData.location.country}
              onChange={(e) =>
                handleNestedInputChange(e, "location", "country")
              }
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
              list={tourData.inclusions}
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
              list={tourData.exclusions}
              onChange={(e) => setExclusionText(e.target.value)}
            />
          </div>

          {/* Description */}

          <div className="row mb-5">
            <SectionTitle>Description</SectionTitle>
            <TextEditor
              onInit={(_evt, editor) => (description.current = editor)}
            />
          </div>

          {/* Additional Details */}

          <div className="row mb-5">
            <SectionTitle>Additional Details</SectionTitle>
            <TextEditor
              onInit={(_evt, editor) =>
                (additionalInformation.current = editor)
              }
            />
          </div>

          {/* Alert */}

          {alert}

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
              <PrimaryButton onClick={handleForm}>Submit</PrimaryButton>
            )}
          </div>
        </form>
      </PrimarySection>
    </>
  );
}

function ListGroup(props) {
  return (
    <div className="col-12 row">
      <div className="col-6 row">
        <div className="col-lg-10">
          <Input
            type="text"
            name={props.name}
            value={props.value}
            onChange={props.onChange}
          />
        </div>
        <div className="col-lg-2 p-0">
          <button
            className={styles.AddBtn}
            onClick={(e) => {
              e.preventDefault();
              props.onAddItem(e);
            }}
          >
            Add
          </button>
        </div>
      </div>
      <div className="col-6">
        <ul className={`${styles.InclusionsList}`}>
          {props.list.map((item, i) => (
            <li key={i} className="col-12 d-flex justify-content-between">
              <span>{item}</span>
              <div>
                <button
                  className={styles.RemoveBtn}
                  onClick={() => props.onRemoveItem(i)}
                >
                  <FaTrash />
                </button>
                <button
                  className={styles.MoveUpBtn}
                  onClick={() => props.onMoveUpItem(i)}
                >
                  <FaChevronUp />
                </button>
                <button
                  className={styles.MoveUpBtn}
                  onClick={() => props.onMoveDownItem(i)}
                >
                  <FaChevronDown />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
