import TourCard from "../../../components/TourCard/TourCard";
import { Helmet } from "react-helmet";
import { useTours } from "../useTours";
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
            <th>Title</th>
            <th>URL</th>
            <th>Destination</th>
            <th>Status</th>
            <th>Duration</th>
            <th>Date Created</th>
            <th>Date Updated</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((tour) => (
            <tr>
              <td>
                <a href={`tours/${tour.url}`}>{tour.title}</a>
              </td>
              <td>
                <a href={`tours/${tour.url}`}>{tour.url}</a>
              </td>
              <td>{tour.destination}</td>
              <td>{tour.status}</td>
              <td>
                {tour.duration.days} days - {tour.duration.nights} nights
              </td>
              <td>{tour.dateCreated}</td>
              <td>{tour.dateUpdated ? tour.dateUpdated : "NA"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
