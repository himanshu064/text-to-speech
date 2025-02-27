import React from "react";
import { Box } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import { useGlobalContext } from "../../contextApi/contextApi";

const MediaPlayer = () => {
  const { textToSpeech, text, handleClickVariant, handlePause, playIcon } =
    useGlobalContext();

  const togglePlay = () => {
    if (text) {
      textToSpeech();
    } else {
      handleClickVariant("error")();
    }
  };

  return (
    <Box className="flex items-center justify-center space-x-4 w-[50vw] md:w-[45vw] ">
      {playIcon ? (
        <PauseCircleFilledIcon
          className="text-blue-500 cursor-pointer ... "
          onClick={handlePause}
          style={{ fontSize: 48 }} // Adjust the size as needed
        ></PauseCircleFilledIcon>
      ) : (
        <PlayCircleIcon
          className="text-blue-500 cursor-pointer ... "
          onClick={togglePlay}
          style={{ fontSize: 48 }} // Adjust the size as needed
        ></PlayCircleIcon>
      )}
    </Box>
  );
};

export default MediaPlayer;
