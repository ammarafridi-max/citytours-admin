import styles from "./ListGroup.module.css";
import Input from "./Input";
import { FaTrash, FaChevronUp, FaChevronDown } from "react-icons/fa";

export default function ListGroup({
  name,
  value,
  onChange,
  onAddItem,
  list,
  onRemoveItem,
  onMoveUpItem,
  onMoveDownItem,
}) {
  return (
    <div className="col-12 row">
      <div className="col-6 row">
        <div className="col-lg-10">
          <Input type="text" name={name} value={value} onChange={onChange} />
        </div>
        <div className="col-lg-2 p-0">
          <button
            className={styles.AddBtn}
            onClick={(e) => {
              e.preventDefault();
              onAddItem(e);
            }}
          >
            Add
          </button>
        </div>
      </div>
      <div className="col-6">
        <ul className={`${styles.InclusionsList}`}>
          {list.map((item, i) => (
            <li key={i} className="col-12 d-flex justify-content-between">
              <span>{item}</span>
              <div>
                <button
                  className={styles.RemoveBtn}
                  onClick={() => onRemoveItem(i)}
                >
                  <FaTrash />
                </button>
                <button
                  className={styles.MoveUpBtn}
                  onClick={() => onMoveUpItem(i)}
                >
                  <FaChevronUp />
                </button>
                <button
                  className={styles.MoveUpBtn}
                  onClick={() => onMoveDownItem(i)}
                >
                  <FaChevronDown />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
