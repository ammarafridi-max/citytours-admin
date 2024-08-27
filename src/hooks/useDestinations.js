import { useEffect, useState } from "react";

const DESTINATIONS_URL = `${process.env.REACT_APP_BACKEND_URL}/destinations`;
const OPTIONS_URL = `${process.env.REACT_APP_BACKEND_URL}/destinations/options`;

export function useDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // ---------- GET ALL DESTINATIONS ----------

  useEffect(() => {
    async function getAllDestinations() {
      try {
        setIsLoading(true);
        const res = await fetch(DESTINATIONS_URL);
        const data = await res.json();
        if (!data) throw new Error("Could not find destinations");
        setDestinations(data);
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

  // ---------- DELETE DESTINATION ----------

  async function deleteDestination(url) {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.BACKEND_URL}/destinations/delete/${url}`,
        {
          method: "delete",
        }
      );
      const data = await res.json();
      alert("Message: " + data);
    } catch (error) {
      alert("Error: " + error);
    }
  }

  return { destinations, isLoading, destinationOptions, deleteDestination };
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
