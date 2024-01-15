import React from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';

const SpeechText = ({ socket, username, setChatLog, setRecording }) => {

  const handleRecordingComplete = (blob) => {
    const timestamp = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result.split(',')[1];

      const data = {
        type: 'audio',
        content: base64Data,
        username: username,
      };
      socket.send(JSON.stringify(data));
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        {
          type: 'audio',
          username,
          content: base64Data,
          timestamp: timestamp,
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
    </>
  );
};

export default SpeechText;
