import DeleteButton from "../Buttons/DeleteButton";
import PrimaryButton from "../Buttons/PrimaryButton";
import styles from "./DeleteModal.module.css";

export default function DeleteModal({ onCancel, onDelete, item }) {
  return (
    <div className={styles.ModalOverlay}>
      <div className={styles.Container}>
        <div className={styles.Modal}>
          <p className={styles.Heading}>Confirm deletion</p>
          <p className={styles.Text}>Are you sure you want to delete {item}?</p>
          <PrimaryButton onClick={onCancel}>Cancel</PrimaryButton>
          <span className="mx-2"></span>
          <DeleteButton onClick={onDelete}>Delete</DeleteButton>
        </div>
      </div>
    </div>
  );
}
