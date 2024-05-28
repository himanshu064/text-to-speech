import { createContext, useContext, useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
const AppContext = createContext();

// In AppProvider component
const AppProvider = ({ children }) => {
  const { speak, cancel, voices, speaking } = useSpeechSynthesis();
  const [text, setText] = useState(
    "This site was created by John Potter and is maintained by uidotdev. If you find any bugs or have a feature request, please open an issue on github!"
  );
  const [selectedVoiceObj, setSelectedVoiceObj] = useState(voices[0]);
  const [pitch, setPitch] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(1); // Add volume state
  const [reset, setReset] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState();

  const handleVoiceChange = (event) => {
    const selectedVoiceName = event.target.value;
    setSelectedVoice(selectedVoiceName);

    // Find the selected voice object
    const selectedVoiceObj = voices?.find(
      (voice) => voice?.name === selectedVoiceName
    );

    if (selectedVoiceObj) {
      setSelectedVoiceObj(selectedVoiceObj);

      if (speaking) {
        handleStop();
      }

      speak({
        text: text,
        pitch: pitch,
        rate: speed,
        volume: volume,
        voice: selectedVoiceObj,
      });
    } else {
      console.error("Selected voice not found.");
    }
  };

  function textToSpeech() {
    if (speaking) {
      handleStop();
    }

    speak({
      text: text,
      pitch: pitch,
      rate: speed,
      volume: volume,
      voice: selectedVoiceObj,
    });
  }

  function handleStop() {
    cancel();
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
        volume,
        setVolume,
        handleStop,
        reset,
        setReset,
        voices,
        speaking,
        handleVoiceChange,
        selectedVoice,
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
