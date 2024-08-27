import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchTour,
  createTour,
  updateTour,
  deleteTour,
  uploadToCloudinary,
} from "../services/tourServices";
import { createUrl } from "../utils/createUrl";
import AlertBox from "../components/AlertBox/AlertBox";

export const initialTourState = {
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

export function useTours(url) {
  const [tours, setTours] = useState([]);
  const [tourData, setTourData] = useState(initialTourState);
  const [isLoading, setIsLoading] = useState(false);
  const descriptionRef = useRef(null);
  const additionalInformationRef = useRef(null);
  const [alert, setAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // ---------- GET ALL TOURS ----------

  useEffect(() => {
    async function fetchTours() {
      try {
        setIsLoading(true);
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tours`);
        const data = await res.json();
        setTours(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTours();
  }, []);

  // ---------- FORM FUNCTIONS ----------

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTourData((prevData) => ({
      ...prevData,
      [name]: value,
      url: name === "name" ? createUrl(value) : prevData.url,
    }));
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

  const handleListChange = (listName, action, value, index) => {
    setTourData((prevData) => {
      const updatedList =
        action === "add"
          ? [...prevData[listName], value]
          : prevData[listName].filter((_, i) => i !== index);
      return { ...prevData, [listName]: updatedList };
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = await uploadToCloudinary(file);
      setTourData((prevData) => ({ ...prevData, image: imageUrl }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = {
        ...tourData,
        description: descriptionRef.current.getContent(),
        additionalInformation: additionalInformationRef.current.getContent(),
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
      setTimeout(() => navigate("/tours"), 3000);
    } catch (error) {
      setAlert(<AlertBox type="error">{error.message}</AlertBox>);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTour(url);
      setAlert(<AlertBox type="success">Tour deleted successfully.</AlertBox>);
      setTimeout(() => navigate("/tours"), 3000);
    } catch (error) {
      setAlert(<AlertBox type="error">{error.message}</AlertBox>);
    }
  };

  return {
    tours,
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
  };
}
