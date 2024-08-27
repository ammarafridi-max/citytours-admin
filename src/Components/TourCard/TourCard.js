import React, { useState } from "react";
import styles from "./TourCard.module.css";
import { MdAccessTime } from "react-icons/md";
import { FiMapPin } from "react-icons/fi";

import { BiSolidDollarCircle } from "react-icons/bi";

import PrimaryButton from "../Buttons/PrimaryButton";

function TourCard({ url, image, name, duration, location, price }) {
  return (
    <div className={styles.CardExterior}>
      <a href={`${url}`}>
        <div className={styles.Card}>
          <Image image={image} />
          <Detail
            name={name}
            duration={duration}
            location={location}
            price={price}
          />
        </div>
      </a>
    </div>
  );
}

function Image({ image }) {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <div className={`${styles.ImageDiv} ${loaded ? styles.loaded : ""}`}>
      <img
        src={image}
        className={`${styles.Image} ${loaded ? "loaded" : ""}`}
        onLoad={handleImageLoad}
        alt="Tour"
      />
    </div>
  );
}

function Detail({ name, duration, location, price }) {
  return (
    <div className={styles.TourDetail}>
      <h3 className={styles.Title}>{name}</h3>

      <p className={styles.IconDiv}>
        <MdAccessTime className={styles.Icon} />
        <span className={styles.Duration}>{duration}</span>
      </p>

      <p className={styles.IconDiv}>
        <FiMapPin className={styles.Icon} />
        <span className={styles.Location}>{location}</span>
      </p>

      {/* <p className={styles.IconDiv}>
        <BiSolidDollarCircle className={styles.Icon} />
        <span className={styles.Location}>AED {price}</span>
      </p> */}

      {/* <hr className="my-3" /> */}

      {/* <div className="row p-0 align-items-center">
        <div className="col-6 light f-14 p-0" style={{ color: "grey" }}>
          from <span className={styles.Price}>AED {price}</span>
        </div>
        <div className="p-0">
          <PrimaryButton width="100%">Book Now</PrimaryButton>
        </div>
      </div> */}
    </div>
  );
}

export default TourCard;
