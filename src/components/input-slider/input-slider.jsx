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
  const { setPitch, setRate, setVolume, reset, setReset } = useGlobalContext();
  const [value, setValue] = React.useState(50);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    if (id === "speed") {
      setRate(newValue);
    } else if (id === "pitch") {
      setPitch(newValue);
    } else if (id === "volume") {
      setVolume(newValue);
    }
  };
  React.useEffect(() => {
    console.log(reset);
    if (reset) {
      setValue(50);
      setReset(0);
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
            className=" mt-5 relative "
            value={value}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            min={0}
            max={100}
            step={1}
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            inputProps={{
              step: 1,
              min: 0,
              max: 100,
              "aria-labelledby": "input-slider",
            }}
            sx={{
              "&.MuiInput-root": {
                "&:before, &:after": {
                  display: "none",
                },
              },
            }}
            className="p-2 bg-white-200 mt-5"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
