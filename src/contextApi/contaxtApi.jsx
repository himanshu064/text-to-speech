import React, { createContext, useContext, useEffect, useState } from "react";
const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [text, setText] = useState(
    "Text-to-speech (TTS) websites convert written text into spoken words, enhancing accessibility and user experience. They are invaluable for visually impaired individuals, those with reading difficulties, and auditory learners. Modern TTS platforms offer customizable features like voice selection, speed adjustment, and natural intonation through advanced natural language processing. These tools are widely used in education for reinforcing learning, in language acquisition for improving pronunciation, and in business for efficient customer service interactions. TTS technology thus bridges the gap between written and spoken content, making information more accessible and engaging for diverse users."
  );
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [reset, setReset] = useState(0);
  const [currentlyPlayingIndex, setCurrentlyPlayingIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(0);
  const [utterance, setUtterance] = useState(null);
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  const speaking = synth.speaking;
  useEffect(() => {
    const u = new SpeechSynthesisUtterance(
      "Text-to-speech feature is now available on relatively any website or blog. It's a game changer that you can listen to the content instead of reading it. Especially effective for people with visual or cognitive impairments or people who are on the go. I came up with the idea to implement it for my blog, so this is how I started doing a research on this topic which ended up being a tutorial for you. So in this tutorial, we will go through the process of building a text-to-speech component in React. We will use the Web Speech API to implement the text-to-speech ."
    );
    setUtterance(u);
  }, []);
  const handleSpeech = (name) => {
    synth.cancel();
    const selectedVoice = voices?.find((voice) => voice?.name === name);
    if (isPaused === 2) {
      synth.resume();
      setIsPaused(1);
    } else {
      utterance.text = text;
      utterance.voice = selectedVoice;
      utterance.pitch = pitch;
      utterance.rate = rate;
      utterance.volume = volume;
      synth.speak(utterance);
      setIsPaused(1);
    }
  };

  const handleSpeechVoiceMAkerUI = (name) => {
    const selectedVoice = voices?.find((voice) => voice?.name === name);
    if (isPaused === 2) {
      synth.resume();
      setIsPaused(1);
    } else {
      utterance.text = text;
      utterance.voice = selectedVoice;
      utterance.pitch = pitch;
      utterance.rate = rate;
      utterance.volume = volume;
      synth.speak(utterance);
      setIsPaused(1);
    }
  };
  const handleStop = () => {
    if (isPaused) {
      synth.cancel();
      setIsPaused(0);
    }
  };
  const handlePause = () => {
    if (isPaused === 1) {
      synth.pause();
      setIsPaused(2);
    }
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
        voices,
        pitch,
        rate,
        volume,
        speaking,
        handleStop,
        reset,
        setReset,
        currentlyPlayingIndex,
        setCurrentlyPlayingIndex,
        isPaused,
        handlePause,
        handleSpeechVoiceMAkerUI,
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
