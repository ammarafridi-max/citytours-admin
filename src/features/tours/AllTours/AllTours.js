import TourCard from "../../../components/TourCard/TourCard";
import { Helmet } from "react-helmet";
import { useTours } from "../../../hooks/useTours";
import styles from "./AllTours.module.css";

export default function AllTours() {
  const { tours } = useTours();

  return (
    <>
      <Helmet>
        <title>Tours</title>
      </Helmet>
      <h1>Tours</h1>
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
          {tours.map((tour) => (
            <tr>
              <td>
                <a href={`destinations/${tour.url}`}>{tour.name}</a>
              </td>
              <td>{tour.url}</td>
              <td>{tour.country}</td>
              <td>{tour.active ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
