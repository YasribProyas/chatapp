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
  ...others
}: PhotoRadioProps) {
  return (
    <div className="label-radio-grp">
      <input
        type="radio"
        name="photo-type"
        id={value + "-radio"}
        value={value}
        {...others}
      ></input>
      <label htmlFor={value + "-radio"} className="photo-radio">
        <img src={imgLink} />
        <span>{label || value}</span>
      </label>
    </div>
  );
}
