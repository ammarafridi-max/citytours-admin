import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadToCloudinary } from "../../services/tourServices";
import { createUrl } from "../../utils/createUrl";
import { formatDate } from "../../utils/formatDate";

export const initialTourState = {
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
};

export function useTours(url) {
  const [tours, setTours] = useState([]);
  const [tour, setTour] = useState(initialTourState);
  const [isLoading, setIsLoading] = useState(false);
  const descriptionRef = useRef(null);
  const additionalInformationRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const statusOptions = ["Active", "Inactive", "Archive"];

  // ---------- GET ALL TOURS ----------

  useEffect(() => {
    async function fetchTours() {
      try {
        setIsLoading(true);
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tours`);
        const data = await res.json();
        setTours(data.data);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTours();
  }, []);

  // ---------- GET A PARTICULAR TOUR ----------

  useEffect(() => {
    async function getTour() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/tours/${url}`
        );
        const data = await res.json();
        setTour(data);
        console.log(data);
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    }

    getTour();
  }, [url]);

  // ---------- DELETE A TOUR ----------

  async function handleDeleteTour() {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/tours/delete/${url}`,
        { method: "delete" }
      );
      if (!res.ok) throw new Error("An error occurred");
      const data = await res.json();
      alert(data.message);
      navigate("/tours");
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }

  // ---------- FORM FUNCTIONS ----------

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTour((prevData) => ({
      ...prevData,
      [name]: value,
      url: name === "name" ? createUrl(value) : prevData.url,
    }));
  };

  const handleNestedInputChange = (e, field, nestedField) => {
    const { value } = e.target;
    setTour((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        [nestedField]: value,
      },
    }));
  };

  const handleListChange = (listName, action, value, index) => {
    setTour((prevData) => {
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
      setTour((prevData) => ({ ...prevData, image: imageUrl }));
    }
  };

  return {
    tours,
    tour,
    setTour,
    isLoading,
    setIsLoading,
    alert,
    showModal,
    descriptionRef,
    additionalInformationRef,
    statusOptions,
    navigate,
    setShowModal,
    handleInputChange,
    handleNestedInputChange,
    handleListChange,
    handleFileChange,
    handleDeleteTour,
  };
}
