import { Helmet } from "react-helmet";
import Loading from "../../../components/Loading/Loading";
import styles from "./AllDestinations.module.css";
import { useDestinations } from "../useDestinations";
import Pill from "../../../components/Pills/Pill";
import SuccessPill from "../../../components/Pills/SuccessPill";
import DangerPill from "../../../components/Pills/DangerPill";

export default function AllDestinations() {
  const { isLoading, destinations } = useDestinations();

  return (
    <>
      <Helmet>
        <title>Destinations</title>
      </Helmet>
      {isLoading && <Loading />}
      <h1>Destinations</h1>

      <div className={styles.tableContainer}>
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
              <tr key={destination.url}>
                <td>
                  <a href={`destinations/${destination.url}`}>
                    {destination.name}
                  </a>
                </td>
                <td>{destination.url}</td>
                <td>{destination.country}</td>
                <td>
                  {destination.status === "Active" && (
                    <SuccessPill>{destination.status}</SuccessPill>
                  )}
                  {destination.status === "Inactive" && (
                    <DangerPill>{destination.status}</DangerPill>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
