import { useState } from "react";
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";

import RadioCard from "./RadioCard";

export default function RandomPhotoRadio() {
  const [customDpUrl, setCustomDpUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const customUrlFieldChange = (e) => {
    setCustomDpUrl(e.target.value);
  };

  return (
    <div className="random-photo-radio">
      <h4>Photo</h4>
      <RadioGroup
        aria-labelledby="dp-optoins"
        defaultValue="Random"
        name="dp-optoins"
      >
        <div id="photo-random">
          <FormControlLabel value="Random" control={<Radio />} label="Random" />
          <RadioGroup
            aria-labelledby="random-dp-optoins"
            defaultValue="Robot"
            name="random-dp-optoins"
            row
            className="dp-radio"
          >
            <FormControlLabel
              value="Robot"
              control={<RadioCard />}
              label="Robot"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="Cat"
              control={<RadioCard set={4} />}
              label="Cat"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="Monster"
              control={<RadioCard set={2} />}
              label="Monster"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="Human"
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
