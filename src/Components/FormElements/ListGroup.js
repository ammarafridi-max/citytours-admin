import styles from "./ListGroup.module.css";
import Input from "./Input";
import { FaTrash, FaChevronUp, FaChevronDown } from "react-icons/fa";

export default function ListGroup(props) {
  return (
    <div className="col-12 row">
      <div className="col-6 row">
        <div className="col-lg-10">
          <Input
            type="text"
            name={props.name}
            value={props.value}
            onChange={props.onChange}
          />
        </div>
        <div className="col-lg-2 p-0">
          <button
            className={styles.AddBtn}
            onClick={(e) => {
              e.preventDefault();
              props.onAddItem(e);
            }}
          >
            Add
          </button>
        </div>
      </div>
      <div className="col-6">
        <ul className={`${styles.InclusionsList}`}>
          {props.list.map((item, i) => (
            <li key={i} className="col-12 d-flex justify-content-between">
              <span>{item}</span>
              <div>
                <button
                  className={styles.RemoveBtn}
                  onClick={() => props.onRemoveItem(i)}
                >
                  <FaTrash />
                </button>
                <button
                  className={styles.MoveUpBtn}
                  onClick={() => props.onMoveUpItem(i)}
                >
                  <FaChevronUp />
                </button>
                <button
                  className={styles.MoveUpBtn}
                  onClick={() => props.onMoveDownItem(i)}
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
