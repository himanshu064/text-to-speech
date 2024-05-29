import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import { useGlobalContext } from "../../contextApi/contaxtApi";

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function InputSlider({ name, id }) {
  const { setPitch, setRate, rate, setVolume, reset, setReset } =
    useGlobalContext();
  const initialValue = parseFloat(localStorage.getItem(id)) || 1;
  const [value, setValue] = React.useState(initialValue);

  const handleSliderChange = (newValue) => {
    setValue(newValue);
    localStorage.setItem(id, newValue);
    if (id === "speed") {
      setRate(newValue);
    } else if (id === "pitch") {
      setPitch(newValue);
    } else if (id === "volume") {
      setVolume(newValue);
    }
  };

  React.useEffect(() => {
    if (reset) {
      const defaultValue = 1;
      setValue(defaultValue);
      localStorage.setItem(id, defaultValue);
      setReset(0);
      setPitch(defaultValue);
      setRate(defaultValue);
      setVolume(defaultValue);
    }
  }, [reset]);

  return (
    <Box className="w-[70vw] ">
      <Typography id="input-slider" gutterBottom className="ml-3 absolute">
        {name}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item></Grid>
        <Grid item xs>
          <Slider
            className="mt-5 relative"
            value={value}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            min={0.5}
            max={2}
            step={0.1}
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            inputProps={{
              "aria-labelledby": "input-slider",
            }}
            sx={{
              "&.MuiInput-root": {
                "&:before, &:after": {
                  display: "none",
                },
              },
            }}
            className="p-2  mt-5"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
