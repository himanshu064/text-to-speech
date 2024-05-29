import { Box, Typography, Stack } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import avatarImage from "../../../src/assets/avatar1.png";
import { useGlobalContext } from "../../contextApi/contaxtApi";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import { useSnackbar } from "notistack";

export const SelectVoiceStructure = () => {
  const {
    text,
    speaking,
    handleSpeech,
    setCurrentlyPlayingIndex,
    currentlyPlayingIndex,
    handleStop,
    voices,
  } = useGlobalContext();
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant) => () => {
    console.log(variant);
    console.log("hiiii");
    if (!text.trim()) {
      enqueueSnackbar("Textfield should not be empty", { variant });
    }
  };
  return (
    <Box className="border-2 h-[52vh] w-full lg:w-[30vw]  rounded-lg overflow-y-auto cursor-pointer">
      {voices &&
        voices?.map((voice, index) => (
          <Box
            key={index}
            className="h-[10.3vh] shadow flex items-center justify-center "
          >
            <Box className="voice-sttings flex gap-4 justify-center items-center rounded-lg ">
              <Box>
                <Stack direction="row" spacing={2}>
                  <img
                    src={avatarImage}
                    alt="avatar"
                    style={{ height: "80px", width: "80px" }}
                  />
                </Stack>
              </Box>
              <Box>
                <Typography className="font-bold text-sm sm:w-[20vw]  lg:w-[12.5vw] ">
                  {voice?.name}
                </Typography>
              </Box>
              <Box className="text-lg">
                {currentlyPlayingIndex === index && speaking ? (
                  <PauseCircleIcon
                    className="text-[50px] cursor-pointer"
                    onClick={handleStop}
                  />
                ) : text ? (
                  <PlayCircleIcon
                    className="text-[50px] cursor-pointer"
                    onClick={() => {
                      handleSpeech(voice?.name);
                      setCurrentlyPlayingIndex(index);
                    }}
                  />
                ) : (
                  <PlayCircleIcon
                    onClick={() => handleClickVariant("error")()}
                    className="text-[50px] "
                  />
                )}
              </Box>
            </Box>
          </Box>
        ))}
    </Box>
  );
};

export default SelectVoiceStructure;
