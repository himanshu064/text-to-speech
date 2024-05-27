import React from "react";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useSpeechSynthesis } from "react-speech-kit";
import { useGlobalContext } from "../../contextApi/contextApi";

const VoicesDropdown = () => {
  const { text, voices, handleStop } = useGlobalContext();
  const { speak, speaking } = useSpeechSynthesis(); // 2seconds

  //   setTimeout(() => {
  // console.log(voices, "voices voices");
  //   }, 5000);
  const [selectedVoice, setSelectedVoice] = React.useState(""); // undeefined

  const handleVoiceChange = (event) => {
    const selectedVoiceName = event.target.value;
    setSelectedVoice(selectedVoiceName);

    // Find the selected voice object
    const selectedVoiceObj = voices?.find(
      (voice) => voice?.name === selectedVoiceName
    );
    console.log(speaking, "wwwwwwww");

    if (speaking) {
      console.log(speaking, "if");
      handleStop();
      speak({ text: text, voice: selectedVoiceObj });
    } else {
      console.log(speaking, "else");

      // Speak using the selected voice
      speak({ text: text, voice: selectedVoiceObj });
    }
  };

  return (
    <FormControl className="w-[30vw]">
      <InputLabel className="font-bold">Voices</InputLabel>
      <Select value={selectedVoice} onChange={handleVoiceChange}>
        {voices &&
          voices?.map((voice) => (
            <MenuItem key={voice?.name} value={voice?.name}>
              {voice?.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default VoicesDropdown;
