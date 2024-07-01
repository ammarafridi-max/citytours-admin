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
import Modal from "../Components/Modal/Modal";

export default function TourForm() {
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

  const [newTourData, setNewTourData] = useState({ ...tourData });
  const { url } = useParams();
  const navigate = useNavigate();
  const [inclusionText, setInclusionText] = useState("");
  const [exclusionText, setExclusionText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const descriptionRef = useRef(null);
  const additionalInformationRef = useRef(null);
  const [alert, setAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (url) {
      async function fetchTour() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/tours/${url}`
          );
          if (res.status === 404) throw new Error("Tour not found");
          const data = await res.json();
          setTourData(data);
          setNewTourData(data);
        } catch (error) {
          setAlert(<AlertBox type="error">{error.message}</AlertBox>);
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
      fetchTour();
    } else {
      setNewTourData({
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
    setNewTourData((prevData) => ({
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

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let imageUrl = "";
      if (newTourData.image && newTourData.image instanceof File) {
        imageUrl = await uploadToCloudinary(newTourData.image);
      }

      const updatedTourData = {
        ...newTourData,
        image: imageUrl || newTourData.image,
        description: descriptionRef.current
          ? descriptionRef.current.getContent()
          : "",
        additionalInformation: additionalInformationRef.current
          ? additionalInformationRef.current.getContent()
          : "",
      };

      const endpoint = url
        ? `${process.env.REACT_APP_BACKEND_URL}/tours/update/${tourData.url}`
        : `${process.env.REACT_APP_BACKEND_URL}/tours/create`;
      const method = url ? "POST" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTourData),
      });

      if (!res.ok) {
        const errorText = url
          ? "Tour could not be updated"
          : "Tour could not be added";
        throw new Error(errorText);
      }

      const data = await res.json();
      const successMessage = url
        ? "Tour updated successfully."
        : "Tour added successfully.";
      setAlert(<AlertBox type="success">{successMessage}</AlertBox>);

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setAlert(<AlertBox type="error">{error.message}</AlertBox>);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTour = async (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <>
      <Helmet>
        <title>{url ? `Update Tour - ${tourData.name}` : "Create Tour"}</title>
      </Helmet>
      <PrimarySection>
        <h1>{url ? "Update Tour" : "Create Tour"}</h1>
        <form onSubmit={handleForm}>
          <div className="row mb-5">
            <h2>Basic Details</h2>
            {url && (
              <InputGroup
                groupType="long"
                label="Current Image"
                type="text"
                value={newTourData.image}
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
              initialValue={url ? tourData.description : ""}
            />
          </div>

          <div className="row mb-5">
            <h2>Additional Details</h2>
            <TextEditor
              onInit={(_evt, editor) =>
                (additionalInformationRef.current = editor)
              }
              initialValue={url ? tourData.additionalInformation : ""}
            />
          </div>

          {alert}

          {url && showModal && (
            <Modal
              onCancel={() => {
                setShowModal(false);
              }}
              onDelete={handleDeleteTour}
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
              <PrimaryButton
                type="submit"
                disabled={
                  JSON.stringify(tourData) === JSON.stringify(newTourData)
                }
              >
                Submit
              </PrimaryButton>
            )}
          </div>
        </form>
      </PrimarySection>
    </>
  );
}
