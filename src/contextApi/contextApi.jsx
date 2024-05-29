import { enqueueSnackbar } from "notistack";
import { createContext, useContext, useEffect, useState } from "react";

export const getSynth = () => {
  return window.speechSynthesis;
};

const AppContext = createContext();

// In AppProvider component
const AppProvider = ({ children }) => {
  const [text, setText] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [voice, setVoice] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const [reset, setReset] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [playIcon, setPlayIcon] = useState(false);

  const getSelectedvoice = (event) => {
    const selectedVoiceName = event.target.value;
    setSelectedVoice(selectedVoiceName);
    const allVoices = window?.speechSynthesis?.getVoices();
    const voice = allVoices?.find((voice) => voice.name === selectedVoiceName);
    return voice;
  };

  const speak = () => {
    const synth = getSynth();
    utterance.text = text;
    utterance.voice = voice;
    utterance.pitch = pitch;
    utterance.rate = speed;
    utterance.volume = volume;
    synth.speak(utterance);
    setPlayIcon(true);
  };

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    setUtterance(u);

    synth.addEventListener("voiceschanged", () => {
      const voice = synth.getVoices();
      setVoice(voice[0]);
    });
  }, []);

  const handleChange = (event) => {
    const synth = window.speechSynthesis;
    const selectedVoice = getSelectedvoice(event);
    setVoice(selectedVoice);
    if (text) {
      if (synth.speaking) {
        handleStop();
        if (selectedVoice) {
          utterance.voice = selectedVoice;
          utterance.pitch = pitch;
          utterance.rate = speed;
          utterance.volume = volume;
          synth.speak(utterance);
          setPlayIcon(true);
        }
      } else {
        if (selectedVoice) {
          utterance.voice = selectedVoice;
          utterance.pitch = pitch;
          utterance.rate = speed;
          utterance.volume = volume;
          synth.speak(utterance);
          setPlayIcon(true);
        }
      }
    }
  };
  function textToSpeech() {
    const synth = getSynth();
    if (isPaused) {
      synth.resume();
      setPlayIcon(true);
    } else {
      speak();
    }
    setIsPaused(false);
  }

  function handleStop() {
    const synth = getSynth();
    setIsPaused(false);
    synth.cancel();
    setPlayIcon(false);
  }

  const handlePause = () => {
    const synth = getSynth();
    setIsPaused(true);
    synth.pause();
    setPlayIcon(false);
  };

  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar("The text is required !", { variant });
    utterance.text = "The Text is Required! ";
    speak();
  };

  useEffect(() => {
    const synth = getSynth();
    if (synth.speaking) {
      handleStop();
      setTimeout(() => {
        textToSpeech();
      }, 100);
    }
  }, [volume, speed, pitch]);

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
        selectedVoice,
        handleClickVariant,
        setIsPaused,
        handlePause,
        getSynth,
        handleChange,
        playIcon,
        setPlayIcon,
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
