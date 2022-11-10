interface PhotoRadioProps {
  value: string;
  label?: string;
  imgLink: string;
  [x: string]: any;
}

export default function PhotoRadio({
  value,
  label,
  imgLink,
  ...x
}: PhotoRadioProps) {
  return (
    <div className="label-radio-grp">
      <input
        type="radio"
        name="photo-type"
        id={value + "-radio"}
        value={value}
        {...x}
      ></input>
      <label htmlFor={value + "-radio"} className="photo-radio">
        <img src={imgLink} />
        <span>{label || value}</span>
      </label>
    </div>
  );
}
