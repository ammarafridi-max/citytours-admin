import Label from "./Label";
import Select from "./Select";

export default function SelectGroup(props) {
  return (
    <div className="col-lg-4 mb-3">
      <Label htmlFor={props.name}>{props.label}</Label>
      <Select
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      >
        {props.children}
      </Select>
    </div>
  );
}
