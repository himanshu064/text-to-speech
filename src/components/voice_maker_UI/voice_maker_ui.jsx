import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Avatar, Button, Container, TextField } from "@mui/material";
import InputSlider from "../input-slider/input-slider";
import { SelectVoiceStructure } from "../select-voice/select-voice-structure";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import { useGlobalContext } from "../../contextApi/contaxtApi";
import { useSnackbar } from "notistack";

export const VoiceMakerUi = () => {
  const { enqueueSnackbar } = useSnackbar();

  const {
    text,
    setText,
    handleSpeech,
    setPitch,
    setRate,
    setVolume,
    pitch,
    rate,
    volume,
    handlePause,
    speaking,
    reset,
    setReset,
  } = useGlobalContext();

  const [activeTab, setActiveTab] = useState("voice-settings");

  const handleClickVariant = (variant) => () => {
    enqueueSnackbar("Textfield should not be empty", { variant });
  };

  const renderContent = () => {
    if (activeTab === "voice-settings") {
      return (
        <>
          <Box className="h-[11vh] shadow flex items-center justify-center">
            <InputSlider name="Voice Volume" id="volume" />
          </Box>
          <Box className="h-[11vh] shadow flex items-center justify-center">
            <InputSlider name="Voice Speed" id="speed" />
          </Box>
          <Box className="h-[11vh] shadow flex items-center justify-center">
            <InputSlider name="Voice Pitch" id="pitch" />
          </Box>
          <Box className="h-[11vh] shadow flex items-center justify-end pr-5">
            <Button
              variant="outlined"
              className="text-slate-500 border-1 border-slate-400"
              onClick={() => setReset(1)}
            >
              RESET
            </Button>
          </Box>
        </>
      );
    } else if (activeTab === "select-voice") {
      return <SelectVoiceStructure />;
    }
  };

  return (
    <Box className="parent min-h-screen py-10 bg-slate-100 flex items-center justify-center flex-col gap-6">
      <Container className="flex w-[80vw] ">
        <Box className="w-[230px] flex ml-[-28px]">
          <img src="../../../src/assets/voice-maker-logo.svg" alt="logo" />
        </Box>
      </Container>
      <Container className="bg-white min-h-[70vh]  w-[80vw] rounded-lg shadow flex flex-col  lg:flex-row gap-6 items-center justify-center">
        <Box className="left border-2 min-h-[63vh] w-full lg:w-[44vw] shadow rounded-lg gap-4 order-1 lg:order-none mt-6 lg:mt-0">
          <Box className="h-full rounded-lg ">
            <TextField
              placeholder="Enter your Text.."
              value={text}
              onChange={(e) => setText(e.target.value)}
              id="standard-multiline-static"
              multiline
              rows={12}
              variant="standard"
              className="p-1 w-full lg:w-[43vw]"
              InputProps={{
                disableUnderline: true,
                classes: {
                  input: "p-0",
                },
              }}
              sx={{
                "& .MuiInputBase-root": {
                  padding: "10px",
                  paddingLeft: "15px",
                  backgroundColor: "transparent",
                  boxShadow: "none",
                },
                "& .MuiInputBase-input": {
                  paddingLeft: "15px",
                  padding: "10px",
                  borderBottom: "none",
                },
              }}
            />
            <Box className="my-4">
              <Button
                variant="outlined"
                onClick={() => {
                  setText("");
                  handlePause();
                }}
                className="text-slate-500 border-1 border-slate-400 text-xs ml-5 mb-2"
              >
                CLEAR
              </Button>
            </Box>
            <hr className="shadow border-[1.5px]" />
            <Box className="rounded-lg h-[12vh] items-center flex justify-center">
              {speaking ? (
                <PauseCircleIcon
                  className="text-[60px] cursor-pointer text-blue-500"
                  onClick={handlePause}
                />
              ) : !text ? (
                <PlayCircleIcon
                  className="text-[60px] cursor-pointer  text-blue-500"
                  onClick={() => {
                    // handleSpeech();
                    handleClickVariant("error")();
                  }}
                />
              ) : (
                <PlayCircleIcon
                  className="text-[60px] cursor-pointer  text-blue-500"
                  onClick={() => {
                    handleSpeech();
                    // handleClickVariant("error")();
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>
        <Box className="right select-settings border-2 min-h-[63vh] w-full lg:w-[30vw] shadow rounded-lg order-2 lg:order-none mb-6 lg:mb-0">
          <Box className="flex">
            <Box
              className={`h-[11vh] shadow flex items-center justify-center w-1/2 lg:w-[15vw] text-xl cursor-pointer ${
                activeTab === "voice-settings" ? "bg-gray-200" : ""
              }`}
              onClick={() => setActiveTab("voice-settings")}
            >
              Voice Settings
            </Box>
            <Box
              className={`h-[11vh] shadow flex items-center justify-center w-1/2 lg:w-[15vw] text-xl cursor-pointer ${
                activeTab === "select-voice" ? "bg-gray-200" : ""
              }`}
              onClick={() => setActiveTab("select-voice")}
            >
              Select Voice
            </Box>
          </Box>
          {renderContent()}
          {activeTab === "voice-settings" && (
            <Button
              disabled={!text}
              className="w-full lg:w-[30vw] h-[8vh] font-medium "
              variant="contained"
              onClick={handleSpeech}
            >
              CONVERT TO SPEECH
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
};
