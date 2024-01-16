import React, { useRef, useState } from 'react';
import './styles.css';

const AudioItem = ({ audio, username }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    const audioElement = audioRef.current;

    if (!isPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className={`chat-message ${username === audio.username ? "my-chat-message" : ""}`}>
      <p className='message-sender' style={{color: username === audio.username ? 'white' : undefined}}>{audio.username}</p>
      <audio className='audio-player' ref={audioRef} controls onClick={playAudio}>
        <source src={`data:audio/wav;base64,${audio.content}`} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
      <span className='message-time' style={{color: username === audio.username ? 'white' : undefined}}>{audio.timestamp}</span>
    </div>
  );
};

export default AudioItem;
