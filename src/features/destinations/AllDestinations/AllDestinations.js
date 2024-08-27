import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import DestinationCard from "../../../components/DestinationCard/DestinationCard";
import Loading from "../../../components/Loading/Loading";
import styles from "./AllDestinations.module.css";
import { useDestinations } from "../../../hooks/useDestinations";

export default function AllDestinations() {
  const { isLoading, destinations } = useDestinations();

  return (
    <>
      <Helmet>
        <title>Destinations</title>
      </Helmet>
      {isLoading && <Loading />}
      <h1>Destinations</h1>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>URL</th>
            <th>Country</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {destinations.map((destination) => (
            <tr>
              <td>
                <a href={`destinations/${destination.url}`}>
                  {destination.name}
                </a>
              </td>
              <td>{destination.url}</td>
              <td>{destination.country}</td>
              <td>{destination.active ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
