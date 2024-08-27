import Label from "./Label";
import Select from "./Select";

export default function SelectGroup({
  name,
  label,
  value,
  onChange,
  children,
  groupType,
}) {
  if (groupType === "short" || !groupType)
    return (
      <div className="col-lg-4 mb-3">
        <Label htmlFor={name}>{label}</Label>
        <Select id={name} name={name} value={value} onChange={onChange}>
          {children}
        </Select>
      </div>
    );

  if (groupType === "long")
    return (
      <div className="col-12 mb-3 row align-items-center m-0">
        <div className="col-2 ">
          <Label htmlFor={name}>{label}</Label>
        </div>
        <div className="col-10 ">
          <Select id={name} name={name} value={value} onChange={onChange}>
            {children}
          </Select>
        </div>
      </div>
    );
}
