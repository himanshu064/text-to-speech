import "./App.css";
import { TextToSpeechConverter } from "./components/select-voice/select-voice-types";
import { VoiceMakerUi } from "./components/voice_maker_UI/voice_maker_ui";

function App() {
  return (
    <>
      <VoiceMakerUi />
      {/* <TextToSpeechConverter /> */}
    </>
  );
}

export default App;
