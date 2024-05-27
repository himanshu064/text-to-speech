import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import { useGlobalContext } from "../../contextApi/contextApi";
import App from "../../App";

// Override default CSS styles for Input component
const Input = styled(MuiInput)`
  width: 42px;
  &.MuiInput-underline:before {
    border-bottom: none; /* Remove the underline */
  }
  &.MuiInput-underline:after {
    border-bottom: none; /* Remove the underline when focused */
  }
`;

export default function InputSlider({ name, id, reset, setReset }) {
  const { setSpeed, setPitch, setVolume } = useGlobalContext();
  const [value, setValue] = React.useState(1);

  React.useEffect(() => {
    if (reset) {
      setValue(1);
      setReset("false");
    }
  }, [reset]);

  const handleSliderChange = (e, newValue) => {
    setValue(newValue);
    if (id === "speed") {
      setSpeed(newValue);
    } else if (id === "pitch") {
      setPitch(newValue);
    } else if (id === "volume") {
      setVolume(newValue);
    }
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? 0 : parseFloat(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  return (
    <Box>
      <Typography id="input-slider" className="ml-[11px] " gutterBottom>
        {name}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        {/* <Grid item><VolumeUp /></Grid> */}
        <Grid item xs>
          <Slider
            // className="w-[23vw] "
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            step={0.1}
            min={0.5}
            max={2}
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              // step: 0.1,
              // min: 0.5,
              // max: 100,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
      {/* <App sliderReset={sliderReset} /> */}
    </Box>
  );
}
