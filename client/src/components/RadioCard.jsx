import { Paper, Radio } from "@mui/material";
import { styled } from "@mui/material/styles";
import { css } from "@emotion/react";

const RadioCardIcon = ({ set }) => (
  <Paper elevation={2} className="radio-card">
    <img
      src={
        "https://robohash.org/Proyas" + "?set=set" + set ?? 1 + "?size=100x100"
      }
      alt="Image for a card option"
    />
  </Paper>
);

const CheckedRadioCard = ({ set }) => (
  <Paper elevation={2} className="radio-card radio-card-selected">
    <img
      src={
        "https://robohash.org/Proyas" + "?set=set" + set ?? 1 + "?size=100x100"
      }
      alt="Image for a card option"
    />
  </Paper>
);

export default function RadioCard(props) {
  return (
    <Radio
      icon={<RadioCardIcon set={props.set} />}
      checkedIcon={<CheckedRadioCard set={props.set} />}
      {...props}
    ></Radio>
  );
}
