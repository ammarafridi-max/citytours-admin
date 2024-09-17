import TourCard from "../../../components/TourCard/TourCard";
import { Helmet } from "react-helmet";
import { useTours } from "../useTours";
import styles from "./AllTours.module.css";
import { formatDate } from "../../../utils/formatDate";

export default function AllTours() {
  const { tours } = useTours();

  return (
    <>
      <Helmet>
        <title>Tours</title>
      </Helmet>
      <h1>Tours</h1>
      <div className={styles.tableContainer}>
        <table className={styles.styledTable}>
          <thead>
            <tr>
              <th>Title</th>
              <th>URL</th>
              <th>Country</th>
              <th>Status</th>
              <th>Date Created</th>
              <th>Date Updated</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour) => (
              <tr>
                <td>
                  <a href={`/tours/${tour.url}`}>{tour.title}</a>
                </td>
                <td>{tour.url}</td>
                <td>{tour.destination}</td>
                <td>{tour.status}</td>
                <td>{formatDate(tour.dateCreated)}</td>
                <td>{tour.dateUpdated && formatDate(tour.dateUpdated)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
