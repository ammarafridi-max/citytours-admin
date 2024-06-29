import styles from "./Tours.module.css";
import TourCard from "../Components/TourCard/TourCard";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

export default function Tours() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    async function fetchTours() {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tours`);
        console.log(res);
        const data = await res.json();
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
