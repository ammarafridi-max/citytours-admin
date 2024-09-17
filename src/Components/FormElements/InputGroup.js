import Input from "./Input";
import Label from "./Label";

export default function InputGroup(props) {
  return (
    <>
      {props.groupType === "long" ? (
        <div className="col-12 mb-3 row align-items-center m-0">
          <div className="col-2">
            <Label htmlFor={props.name}>{props.label}</Label>
          </div>
          <div className="col-10 ">
            <Input
              type={props.type}
              id={props.name}
              name={props.name}
              value={props.value}
              onChange={props.onChange}
              placeholder={props.placeholder}
              disabled={props.disabled}
              multiple={props.multiple}
            />
          </div>
        </div>
      ) : (
        <div className="col-lg-4 mb-3 mx-0">
          <Label htmlFor={props.name}>{props.label}</Label>
          <Input
            type={props.type}
            id={props.name}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            disabled={props.disabled}
            multiple={props.multiple}
          />
        </div>
      )}
    </>
  );
}
