import { useParams } from "react-router-dom";
import { useTours, initialTourState } from "../useTours";
import DeleteIconButton from "../../../components/Buttons/DeleteIconButton";
import UpdateButton from "../../../components/Buttons/UpdateButton";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import Label from "../../../components/FormElements/Label";
import Loading from "../../../components/Loading/Loading";
import { PrimarySection } from "../../../components/Sections/Sections";
import styles from "./ReadTour.module.css";

export default function ReadTour() {
  const { url } = useParams();
  const {
    tour,
    isLoading,
    setIsLoading,
    handleDeleteTour,
    navigate,
    showModal,
    setShowModal,
  } = useTours(url);

  return (
    <div>
      {isLoading && <Loading />}
      <BasicInformation
        dateCreated={tour.dateCreated}
        dateUpdated={tour.dateUpdated}
        title={tour.title}
        url={tour.url}
        image={tour.image}
        days={tour.duration.days}
        nights={tour.duration.nights}
        destination={tour.destination}
        status={tour.status}
        price={tour.price}
        age={tour.age}
      />

      <InclusionsExclusions
        inclusions={tour.inclusions}
        exclusions={tour.exclusions}
      />

      <Description description={tour.description} />

      <Buttons
        title={tour.title}
        url={tour.url}
        onDelete={handleDeleteTour}
        showModal={showModal}
        setShowModal={setShowModal}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        navigate={navigate}
      />
    </div>
  );
}

function BasicInformation({
  dateCreated,
  dateUpdated,
  title,
  url,
  image,
  days,
  nights,
  destination,
  status,
  price,
  age,
}) {
  return (
    <PrimarySection>
      <h2>Basic Information</h2>
      <div className="row mx-0 mb-2">
        <div className="col-2">
          <Label>Date Created:</Label>
        </div>
        <p className="col-10 my-0">{dateCreated}</p>
      </div>

      <div className="row mx-0 mb-2">
        <div className="col-2">
          <Label>Date Updated:</Label>
        </div>
        <p className="col-10 my-0">{dateUpdated ? dateUpdated : "N/A"}</p>
      </div>

      <div className="row mx-0 mb-2">
        <div className="col-2">
          <Label>Title:</Label>
        </div>
        <p className="col-10 my-0">{title}</p>
      </div>

      <div className="row mx-0 mb-2">
        <div className="col-2">
          <Label>URL:</Label>
        </div>
        <p className="col-10 my-0">{url}</p>
      </div>

      <div className="row mx-0 mb-2">
        <div className="col-2">
          <Label>Duration:</Label>
        </div>
        <p className="col-10 my-0">
          {days} days - {nights} nights
        </p>
      </div>

      <div className="row mx-0 mb-2">
        <div className="col-2">
          <Label>Destination:</Label>
        </div>
        <p className="col-10 my-0">{destination}</p>
      </div>

      <div className="row mx-0 mb-2">
        <div className="col-2">
          <Label>Status:</Label>
        </div>
        <p className="col-10 my-0">{status}</p>
      </div>

      <div className="row mx-0 mb-2">
        <div className="col-2">
          <Label>Price:</Label>
        </div>
        <div className="col-10 row mx-0">
          <p className="col m-0 p-0">
            Adults: <span className="bold">{price.adults}</span>
          </p>
          <p className="col m-0 p-0">
            Children: <span className="bold">{price.children}</span>
          </p>
          <p className="col m-0 p-0">
            Infants: <span className="bold">{price.infants}</span>
          </p>
        </div>
      </div>

      <div className="row mx-0 mb-2">
        <div className="col-2">
          <Label>Age:</Label>
        </div>
        <div className="col-10 row mx-0">
          <p className="col m-0 p-0">
            Adults: <span className="bold">{age.adults}</span>
          </p>
          <p className="col m-0 p-0">
            Children: <span className="bold">{age.children}</span>
          </p>
          <p className="col m-0 p-0">
            Infants: <span className="bold">{age.infants}</span>
          </p>
        </div>
      </div>
    </PrimarySection>
  );
}

function InclusionsExclusions({ inclusions, exclusions }) {
  return (
    <PrimarySection mt="50px">
      <div className="row mx-0">
        <div className="col-6">
          <h2>Inclusions</h2>
          {inclusions.map((inc) => (
            <p className="p-0 m-0 mb-1">{inc}</p>
          ))}
        </div>

        <div className="col-6">
          <h2>Exclusions</h2>
          {exclusions.map((exc) => (
            <p className="p-0 m-0 mb-1">{exc}</p>
          ))}
        </div>
      </div>
    </PrimarySection>
  );
}

function Description({ description }) {
  return (
    <PrimarySection mt="50px">
      <h2>Description</h2>
      <div dangerouslySetInnerHTML={{ __html: description }}></div>
    </PrimarySection>
  );
}

function Buttons({
  title,
  url,
  showModal,
  setShowModal,
  onDelete,
  isLoading,
  setIsLoading,
  navigate,
}) {
  return (
    <>
      <div className={styles.buttons}>
        <DeleteIconButton mb="10px" onClick={() => setShowModal(true)} />
        <UpdateButton href={`/tours/update/${url}`} />
      </div>
      {showModal && (
        <DeleteModal
          onCancel={() => setShowModal(false)}
          onDelete={onDelete}
          item={`tour ${title}`}
        />
      )}
    </>
  );
}
