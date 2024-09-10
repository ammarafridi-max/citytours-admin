import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadToCloudinary } from "../../services/tourServices";
import { createUrl } from "../../utils/createUrl";

export const initialTourState = {
  dateCreated: new Date(),
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
  const [newTour, setNewTour] = useState(initialTourState);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const additionalInformationRef = useRef(null);
  const descriptionRef = useRef(null);
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

  // ---------- GET A PARTICULAR TOUR ----------

  async function handleCreateTour(e) {
    try {
      e.preventDefault();
      setIsLoading(true);

      let imageUrl = newTour.image;
      if (newTour.image && newTour.image instanceof File) {
        imageUrl = await uploadToCloudinary(newTour.image);
      }

      const updatedTour = {
        ...newTour,
        description: descriptionRef.current.getContent(),
        url: !newTour.url && createUrl(newTour.title),
        status: newTour.status.toLowerCase(),
        inclusions: newTour.inclusions.split("\n"),
        exclusions: newTour.exclusions.split("\n"),
      };

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
    newTour,
    isLoading,
    showModal,
    setTour,
    setNewTour,
    setIsLoading,
    alert,
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
    handleCreateTour,
  };
}
