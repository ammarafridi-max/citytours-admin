import styles from "./AllTours.module.css";
import TourCard from "../../components/TourCard/TourCard";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { fetchAllTours } from "../../services/tourServices";

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
      <div className="row">
        {tours.map((tour) => {
          return (
            <div className="col-4 p-0" key={tour.url}>
              <TourCard
                url={`update/${tour.url}`}
                name={tour.name}
                image={tour.image}
                duration={tour.duration}
                location={`${tour.location.city}, ${tour.location.country}`}
                price={tour.price.adults}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
