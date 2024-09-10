import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { uploadToCloudinary } from "../../services/destinationServices";

const DESTINATIONS_URL = `${process.env.REACT_APP_BACKEND_URL}/destinations`;
const OPTIONS_URL = `${process.env.REACT_APP_BACKEND_URL}/destinations/options`;

export const statusOptions = ["Active", "Inactive"];

export const initialState = {
  name: "",
  url: "",
  image: "",
  description: "",
  country: "",
  status: "Active",
};

export function useDestinations() {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const { url } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [destinations, setDestinations] = useState([""]);
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [currentDestination, setCurrentDestination] = useState({});
  const [newDestinationData, setNewDestinationData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  // ---------- GET ALL DESTINATIONS ----------

  useEffect(() => {
    async function getAllDestinations() {
      try {
        setIsLoading(true);
        const res = await fetch(DESTINATIONS_URL);
        const data = await res.json();
        if (!data) throw new Error("Could not find destinations");
        setDestinations(data.data);
      } catch (error) {
        alert("Error: " + error);
      } finally {
        setIsLoading(false);
      }
    }
    getAllDestinations();
  }, []);

  // ---------- GET DESTINATION OPTIONS ----------

  useEffect(() => {
    async function getOptions() {
      try {
        const res = await fetch(OPTIONS_URL);
        const data = await res.json();
        setDestinationOptions(data);
        console.log(data);
      } catch (error) {
        alert(error);
      }
    }
    getOptions();
  }, []);

  // ---------- GET CURRENT DESTINATION ----------

  useEffect(() => {
    async function getDestination() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/destinations/${url}`
        );
        const data = await res.json();
        if (!data) throw new Error("Could not find destination data");
        setCurrentDestination(data);
        console.log(data);
      } catch (error) {
        alert("Error: " + error);
      } finally {
        setIsLoading(false);
      }
    }
    getDestination();
  }, []);

  // ---------- CREATE DESTINATION ----------

  async function handleCreateDestination(e) {
    try {
      e.preventDefault();
      setIsLoading(true);
      let imageUrl = "";
      if (newDestinationData.image) {
        imageUrl = await uploadToCloudinary(newDestinationData.image);
      }

      const destination = {
        ...newDestinationData,
        description: editorRef.current.getContent(),
        image: imageUrl,
      };
      console.log(destination);

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/destinations/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(destination),
        }
      );
      if (response.status === 409) {
        return alert("Destination with the same URL exists");
      }
      if (!response.ok) {
        throw new Error("Failed to add destination");
      }
      const data = await response.json();
      console.log(data);
      alert("Destination added successfully!");
      navigate("/destinations");
    } catch (error) {
      console.error("Failed to add destination:", error.message);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  // ---------- DELETE DESTINATION ----------

  async function handleDeleteDestination() {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/destinations/delete/${url}`,
        { method: "delete" }
      );
      if (!res.ok) throw new Error("An error occurred");
      const data = await res.json();
      if (!data) throw new Error("Destination was not found");
      console.log(data);
      alert("Message: " + data.message);
      navigate("/destinations");
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    destinations,
    destinationOptions,
    newDestinationData,
    currentDestination,
    editorRef,
    isLoading,
    showModal,
    navigate,
    setIsLoading,
    setNewDestinationData,
    setShowModal,
    setCurrentDestination,
    handleCreateDestination,
    handleDeleteDestination,
  };
}

const sampleUserData = {
  name: "Ammar Afridi",
  username: "ammar.afridi",
  email: "ammar.afridi95@gmail.com",
  password: "Obaid123",
  title: "Admin",
  permissions: {
    readBlogs: true,
    createBlogs: true,
    updateBlogs: true,
    deleteBlogs: true,
    readDestinations: true,
    createDestinations: true,
    updateDestinations: true,
    deleteDestinations: true,
    readTours: true,
    createTours: true,
    updateTours: true,
    deleteTours: true,
  },
};
