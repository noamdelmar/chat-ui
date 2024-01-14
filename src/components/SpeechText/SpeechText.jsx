import React, { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import { AudioRecorder } from 'react-audio-voice-recorder';
import MicNoneIcon from '@mui/icons-material/MicNone';
import MicIcon from '@mui/icons-material/Mic';
const SpeechText = ({ socket, username, setChatLog, setRecording }) => {

  const handleRecordingComplete = (blob) => {
    const timestamp = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    // Convert the blob to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result.split(',')[1];

      // Send the base64 audio data through the socket
      const data = {
        type: 'audio',
        content: base64Data,
        username: username
      };
      socket.send(JSON.stringify(data));
      setChatLog((prevChatLog) => [
      ...prevChatLog,
      {
        type: 'audio',
        username,
        content: base64Data,
        timestamp: timestamp
      },
    ]);
    };
    reader.readAsDataURL(blob);
    setRecording(false);
  };

  return (
    <>
      <AudioRecorder
        onRecordingComplete={handleRecordingComplete}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
      />
      {/* Add your toggle button for starting/stopping recording */}
      {/* <IconButton>
        {listening ?
          <MicIcon style={{ fontSize: '2rem', cursor: 'pointer' }} onClick={SpeechRecognition.stopListening} /> :
          <MicNoneIcon style={{ fontSize: '2rem', cursor: 'pointer' }} onClick={SpeechRecognition.startListening} />
        }
      </IconButton> */}
    </>
  );
};

export default SpeechText;
