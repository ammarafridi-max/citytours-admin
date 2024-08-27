import styles from "./DestinationCard.module.css";

function DestinationCard({ href, image, name, country }) {
  return (
    <div className={styles.destinationCard}>
      <a href={`destinations/${href}`}>
        <div className={styles.destinationImageDiv}>
          <img src={image} className={styles.destinationImage} alt={name} />
        </div>
        <div className={styles.DestinationDetail}>
          <h4>{name}</h4>
          <h5>{country}</h5>
        </div>
      </a>
    </div>
  );
}

export default DestinationCard;
