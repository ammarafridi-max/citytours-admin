import styles from "./Checkbox.module.css";
import Label from "./Label";

export default function Checkbox({ checked, label, onChange }) {
  return (
    <div className="row mx-0 px-0 mb-2">
      <div className="col-1">
        <input type="checkbox" checked={checked} onChange={onChange} />
      </div>
      <div className="col-11">
        <Label>{label}</Label>
      </div>
    </div>
  );
}
