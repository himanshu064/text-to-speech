import React, { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import avatarImage from "../../../src/assets/avatar1.png";
import { useSpeechSynthesis } from "react-speech-kit";
import { useGlobalContext } from "../../contextApi/contaxtApi";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

export const SelectVoiceStructure = () => {
  const { text } = useGlobalContext();

  const [currentlyPlayingIndex, setCurrentlyPlayingIndex] = useState(null);
  const { voices, speak, cancel, speaking } = useSpeechSynthesis();

  const handleSpeak = (voiceName, index, text) => {
    cancel();
    console.log("spek", voiceName, "voiceName", index, "index");

    const selectedVoice = voices?.find((voice) => voice?.name === voiceName);
    console.log(selectedVoice, "selectedVoices");
    if (selectedVoice) {
      speak({ text: text, voice: selectedVoice });
      setCurrentlyPlayingIndex(index);
    }
  };

  const handlePause = () => {
    console.log(speaking, "pauseSepekind");

    if (speaking) {
      cancel();
      setCurrentlyPlayingIndex(null);
    }
  };

  return (
    <Box className="border-2 h-[52vh] w-full lg:w-[30vw]  rounded-lg overflow-y-auto ">
      {voices &&
        voices?.map((voice, index) => (
          <Box
            key={index}
            className="h-[10.3vh] shadow flex items-center justify-center "
          >
            <Box
              className={`voice-sttings flex gap-4 justify-center items-center rounded-lg ${
                text ? "cursor-pointer" : "cursor-no-drop"
              }`}
            >
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
                    onClick={handlePause}
                  />
                ) : text ? (
                  <PlayCircleIcon
                    className="text-[50px] cursor-pointer"
                    onClick={() => handleSpeak(voice?.name, index, text)}
                  />
                ) : (
                  <PlayCircleIcon className="text-[50px] cursor-no-drop text-gray-300" />
                )}
              </Box>
            </Box>
          </Box>
        ))}
    </Box>
  );
};

export default SelectVoiceStructure;
