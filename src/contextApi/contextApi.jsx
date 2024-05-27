import { Pause } from "@mui/icons-material";
import { createContext, useContext, useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
const AppContext = createContext();

// In AppProvider component
const AppProvider = ({ children }) => {
  const { speak, cancel, voices, speaking, pause } = useSpeechSynthesis();
  const [text, setText] = useState(
    "This site was created by John Potter and is maintained by uidotdev. If you find any bugs or have a feature request, please open an issue on github!"
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [pitch, setPitch] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(1); // Add volume state
  const [reset, setReset] = useState(false);

  function textToSpeech() {
    speak({ text: text, pitch: pitch, rate: speed, volume: volume }); // Use volume in speak
    setIsPlaying(!isPlaying);
  }

  function handleStop() {
    cancel();
    setIsPlaying(!isPlaying);
  }

  return (
    <AppContext.Provider
      value={{
        text,
        setText,
        textToSpeech,
        pitch,
        setPitch,
        speed,
        setSpeed,
        volume, // Add volume to context
        setVolume,
        handleStop,
        reset,
        setReset,
        voices,
        speaking,
        isPlaying,
        setIsPlaying,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
