import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import MicNoneIcon from '@mui/icons-material/MicNone';
import MicIcon from '@mui/icons-material/Mic';
import IconButton from '@mui/material/IconButton';

const SpeechText = ({setMessage}) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  
    useEffect(() => {
        if(transcript) setMessage(transcript);
    }, [transcript, setMessage]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <IconButton>
      {listening ? 
        <MicIcon style={{fontSize: '2rem', cursor:'pointer'}} onClick={SpeechRecognition.stopListening}/> :
        <MicNoneIcon style={{fontSize: '2rem', cursor:'pointer'}} onClick={SpeechRecognition.startListening} />
      }
      {/* <button onClick={resetTranscript}>Reset</button> */}
    </IconButton>
  );
};
export default SpeechText;