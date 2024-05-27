import React, { createContext, useContext, useEffect, useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { useSnackbar } from "notistack";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [text, setText] = useState(
    "Text-to-speech (TTS) websites convert written text into spoken words, enhancing accessibility and user experience. They are invaluable for visually impaired individuals, those with reading difficulties, and auditory learners. Modern TTS platforms offer customizable features like voice selection, speed adjustment, and natural intonation through advanced natural language processing. These tools are widely used in education for reinforcing learning, in language acquisition for improving pronunciation, and in business for efficient customer service interactions. TTS technology thus bridges the gap between written and spoken content, making information more accessible and engaging for diverse users."
  );
  const [pitch, setPitch] = useState(50);
  const [rate, setRate] = useState(50);
  const [volume, setVolume] = useState(50);
  const { speak, cancel, voices, speaking } = useSpeechSynthesis();
  const [reset, setReset] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  const handleSpeech = () => {
    console.log("jij");
    cancel();
    const scaledPitch = pitch / 50;
    const scaledRate = rate / 50;
    const scaledVolume = volume / 100;

    speak({ text, pitch: scaledPitch, rate: scaledRate, volume: scaledVolume });
  };
  // console.log(voices, "voicdddddddddddes", text);

  const handlePause = () => {
    console.log(speaking, "pauseSepekind");

    if (speaking) {
      cancel();
      // setCurrentlyPlayingIndex(null);
    }
  };
  const handleClickVariant = (variant) => () => {
    enqueueSnackbar("Textfield shod not be empty", { variant });
  };
  return (
    <AppContext.Provider
      value={{
        text,
        setText,
        handleSpeech,
        setPitch,
        setRate,
        setVolume,
        // handleStop,
        pitch,
        rate,
        volume,
        speaking,
        handlePause,
        reset,
        setReset,
        handleClickVariant,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
