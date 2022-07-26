import { useState } from "react";
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";

import RadioCard from "./RadioCard";

export default function RandomPhotoRadio({ choices }) {
  const [customDpUrl, setCustomDpUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const customUrlFieldChange = (e) => {
    setCustomDpUrl(e.target.value);
    choices.url = customDpUrl;
  };
  const onImgTypeChange = (e) => {
    choices.imgType = e.target.value;
  };
  const onRandomImgSetChange = (e) => {
    choices.randomImg = e.target.value;
  };

  return (
    <div className="random-photo-radio">
      <h4>Photo</h4>
      <RadioGroup
        aria-labelledby="dp-optoins"
        defaultValue="Random"
        name="dp-optoins"
        onChange={onImgTypeChange}
      >
        <div id="photo-random">
          <FormControlLabel value="Random" control={<Radio />} label="Random" />
          <RadioGroup
            aria-labelledby="random-dp-optoins"
            defaultValue="Robot"
            name="random-dp-optoins"
            row
            className="dp-radio"
            onChange={onRandomImgSetChange}
          >
            <FormControlLabel
              value="set1"
              control={<RadioCard />}
              label="Robot"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="set4"
              control={<RadioCard set={4} />}
              label="Cat"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="set2"
              control={<RadioCard set={2} />}
              label="Monster"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="set5"
              control={<RadioCard set={5} />}
              label="Human"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </div>
        <div id="photo-custom">
          <FormControlLabel
            value="Custom"
            control={<Radio />}
            label="Custom (url)"
          />
          <br />
          <TextField
            className="dp-radio"
            label="url"
            onChange={customUrlFieldChange}
            value={customDpUrl}
          />
          <Button onClick={() => setImageUrl(customDpUrl)}>Search</Button>
        </div>
        {imageUrl ? <img src={imageUrl} alt="Image not found" /> : <></>}
      </RadioGroup>
    </div>
  );
}
