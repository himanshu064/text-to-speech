import React, { useState } from "react";

export const TextToSpeechConverter = () => {
  const [text, setText] = useState("");

  const handleSpeak = () => {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to convert to speech"
      />
      <button onClick={handleSpeak}>Speak</button>
    </div>
  );
};
