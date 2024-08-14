import styles from "./AllDestinations.module.css";
import DestinationCard from "../../components/DestinationCard/DestinationCard";
import Loading from "../../components/Loading/Loading";
import { useDestinations } from "../../hooks/useDestinations";

const URL = `${process.env.REACT_APP_BACKEND_URL}/destinations`;

export default function AllDestinations() {
  const { isLoading, destinations } = useDestinations();

  return (
    <>
      {isLoading && <Loading />}
      <h1>Destinations</h1>
      <div className="row justify-content-between">
        {destinations.map((destination) => (
          <DestinationCard
            name={destination.name}
            image={destination.image}
            href={`${destination.url}`}
          />
        ))}
      </div>
    </>
  );
}
