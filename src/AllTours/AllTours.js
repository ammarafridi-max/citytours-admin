import styles from "./AllTours.module.css";
import TourCard from "../Components/TourCard/TourCard";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { fetchAllTours } from "../services/tourService";

export default function AllTours() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    async function fetchTours() {
      try {
        const data = await fetchAllTours();
        console.log(data);
        setTours(data);
      } catch (error) {}
    }
    fetchTours();
  }, []);

  return (
    <>
      <Helmet>
        <title>Tours</title>
      </Helmet>
      <h1>Tours</h1>
      {tours.map((tour) => {
        return (
          <div className="col-3" key={tour.url}>
            <TourCard name={tour.name} image={tour.image} url={tour.url} />
          </div>
        );
      })}
    </>
  );
}
