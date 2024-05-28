import React from "react";
import { Box } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import { useGlobalContext } from "../../contextApi/contextApi";
import { useSnackbar } from "notistack";

const MediaPlayer = () => {
  const { text } = useGlobalContext();
  const { enqueueSnackbar } = useSnackbar();
  const { textToSpeech, handleStop, speaking } = useGlobalContext();

  const togglePlay = () => {
    if (speaking) {
      handleStop();
    } else {
      if (text) {
        textToSpeech();
      } else {
        handleClickVariant("error")();
      }
    }
  };

  const handleClickVariant = (variant) => () => {
    console.log("hiii clicked");
    // variant could be success, error, warning, info, or default
    enqueueSnackbar("The text is required !", { variant });
  };
  return (
    <Box className="flex items-center justify-center space-x-4 w-[50vw] md:w-[45vw] ">
      {speaking ? (
        <PauseCircleFilledIcon
          className="text-blue-500 cursor-pointer ... "
          onClick={togglePlay}
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
