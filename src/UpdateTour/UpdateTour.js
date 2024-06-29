import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import InputGroup from "../Components/FormElements/InputGroup";

export default function UpdateTour() {
  const { url } = useParams();
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

  useEffect(() => {
    async function fetchTour() {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/tours/${url}`
        );
        if (res.status === 404) throw new Error({ message: "Tour not found" });
        const data = await res.json();
        setTourData(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTour();
  }, []);

  return (
    <>
      <Helmet>
        <title>Update Tour - {tourData.name}</title>
      </Helmet>
      <h1>Update Tour</h1>
      <InputGroup />
    </>
  );
}
