import DeleteButton from "../Buttons/DeleteButton";
import PrimaryButton from "../Buttons/PrimaryButton";
import styles from "./Modal.module.css";
import { useState } from "react";

export default function Modal({ showModal, onCancel, onDelete }) {
  const [displayModal, setDisplayModal] = useState(true);

  if (displayModal)
    return (
      <div className={styles.ModalOverlay}>
        <div className={styles.Container}>
          <div className={styles.Modal}>
            <p className={styles.Heading}>Confirm deletion</p>
            <p className={styles.Text}>
              Are you sure you want to delete this tour?
            </p>
            <PrimaryButton onClick={onCancel}>Cancel</PrimaryButton>
            <span className="mx-2"></span>
            <DeleteButton>Delete</DeleteButton>
          </div>
        </div>
      </div>
    );
}
