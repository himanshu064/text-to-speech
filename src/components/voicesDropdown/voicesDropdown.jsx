import React from "react";
import { Select, MenuItem, InputLabel, FormControl, Box } from "@mui/material";
import { useGlobalContext } from "../../contextApi/contextApi";

const VoicesDropdown = () => {
  const { selectedVoice, handleChange } = useGlobalContext();

  return (
    <Box className="w-auto border-2 ">
      <FormControl className="md:w-64 lg:w-64 sm:w-64 xl:w-[25vw]">
        <InputLabel id="demo-simple-select-label" className="font-bold">
          Voices
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="voices"
          value={selectedVoice}
          onChange={handleChange}
        >
          {window.speechSynthesis.getVoices()?.map((voice) => (
            <MenuItem key={voice?.name} value={voice?.name}>
              {voice?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default VoicesDropdown;
