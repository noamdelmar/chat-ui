import React, { useRef, useState } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; // You can replace this with your icon library
import PauseIcon from '@mui/icons-material/Pause';
import './styles.css';

const AudioItem = ({ audio, username }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    const audioElement = audioRef.current;

    // Play or pause the audio
    if (!isPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
    }

    // Toggle the play state
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="chat-message" style={{ alignSelf: username === audio.username ? 'self-end' : undefined }}>
      {username !== audio.username && <p className='message-sender'>{audio.username}</p>}
      <audio className='audio-player' ref={audioRef} controls onClick={playAudio}>
        <source src={`data:audio/wav;base64,${audio.content}`} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
      <span className='message-time'>{audio.timestamp}</span>
    </div>
  );
};

export default AudioItem;
