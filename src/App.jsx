import * as React from "react";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import InputSlider from "./components/slider/slider";
import VoiceMakerLogo from "../src/assets/voice-maker-logo.svg";
import MediaPlayer from "./components/mediaplayer/mediaplayer";
import { useGlobalContext } from "./contextApi/contextApi";
import VoicesDropdown from "./components/voicesDropdown/voicesDropdown";

function App() {
  const { text, setText, textToSpeech, handleStop, setReset, reset } =
    useGlobalContext();

  return (
    <Box className="bg-slate-100 min-h-screen flex flex-col items-center justify-center">
      <Container className=" p-5  ">
        <Box className="flex justify-start  md:space-x-6 mb-4">
          <Box component="div" className="w-1/6 md:w-[15vw] ">
            <img src={VoiceMakerLogo} alt="Voice Maker Logo" />
          </Box>
        </Box>
        <Box className="flex flex-col bg-white shadow border-2 border-slate-300 px-3 md:px-0  ">
          <Box className="bg-white rounded-lg   md:flex md:gap-8   md:items-center md:justify-center py-5 md:py-5">
            {/* Left box */}
            <Box className="md:w-7/12 border-2 border-slate-300 rounded-lg">
              <Box className="h-[96] md:h-auto">
                <TextField
                  placeholder="Type text here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  id="standard-multiline-static"
                  multiline
                  rows={16}
                  variant="standard"
                  className="p-2 w-full "
                  InputProps={{
                    disableUnderline: true,
                    classes: {
                      input: "p-0",
                    },
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      padding: "5px",
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      "&:focus": {
                        borderColor: "blue", // Change border color to blue when focused
                      },
                    },
                    "& .MuiInputBase-input": {
                      padding: "5px",
                      borderBottom: "none",
                      borderColor: "InactiveBorder", // Set default border color
                    },
                  }}
                />
              </Box>

              <Button
                onClick={() => {
                  setText(""), handleStop();
                }}
                color="secondary"
              >
                Clear Text
              </Button>
            </Box>

            {/* Right box */}
            <Box className="md:w-4/12 mt-6 md:mt-0 border-2 border-slate-300 h-[62vh]  rounded-lg">
              <Box className="h-auto md:h-auto flex flex-col justify-center items-center shadow-md ">
                <Typography className="text-xl p-3">Voice Settings</Typography>
              </Box>
              <Box className="h-auto p-2">
                <InputSlider
                  name={"Voice volume"}
                  id={"volume"}
                  reset={reset}
                  setReset={setReset}
                />
              </Box>
              <Box className="h-auto p-2">
                <InputSlider
                  name={"Voice Speed"}
                  id={"speed"}
                  reset={reset}
                  setReset={setReset}
                />
              </Box>
              <Box className="h-auto p-2">
                <InputSlider
                  name={"Voice Pitch"}
                  id={"pitch"}
                  reset={reset}
                  setReset={setReset}
                />
              </Box>
              <Box className="flex justify-end mt-2 md:mt-0  ">
                <Button
                  onClick={() => handleStop()}
                  className="rounded-lg mr-4"
                  variant="outlined"
                >
                  Stop
                </Button>
                <Button
                  onClick={() => setReset(true)}
                  className="rounded-lg mr-4"
                  variant="outlined"
                >
                  Reset
                </Button>
              </Box>
              <Button
                disabled={!text && "disabled"}
                onClick={() => textToSpeech()}
                className={
                  text
                    ? "w-full h-10 md:h-10 shadow mt-12  rounded-lg "
                    : "w-full h-10 md:h-10 shadow mt-12  rounded-lg cursor-not-allowed ... cursor-*"
                }
                variant="contained"
              >
                CONVERT TO SPEECH
              </Button>
            </Box>
          </Box>
          <Box className="flex justify-center items-center gap-8    ">
            <Box className="md:w-7/12 ">
              <MediaPlayer />
            </Box>
            <Box className="md:w-4/12 ">
              <VoicesDropdown />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
