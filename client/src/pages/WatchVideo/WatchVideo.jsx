import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const WatchVideo = () => {
  const { videoId } = useParams();
  const playerRef = useRef(null);
  const [isYTReady, setIsYTReady] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(script);

    window.onYouTubeIframeAPIReady = () => {
      setIsYTReady(true);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (isYTReady && !playerRef.current) {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
        },
      });
    }
  }, [isYTReady, videoId]);

  const playVideo = () => {
    if (playerRef.current) playerRef.current.playVideo();
  };

  const pauseVideo = () => {
    if (playerRef.current) playerRef.current.pauseVideo();
  };

  return (
    <div style={containerStyle}>
      <h2>Watch Video</h2>

      <div style={playerWrapperStyle}>
        <div id="youtube-player" style={iframeStyle}></div>
        <div style={overlayStyle}></div> {/* Block interaction */}
      </div>

      <div style={controlsStyle}>
        <button onClick={playVideo} style={btnStyle}>▶️ Play</button>
        <button onClick={pauseVideo} style={btnStyle}>⏸ Pause</button>
      </div>

      {/* <p style={{ marginTop: '30px' }}>
        Share this video: <code>{window.location.href}</code>
      </p> */}
    </div>
  );
};

const containerStyle = {
  padding: '40px',
  textAlign: 'center',
};

const playerWrapperStyle = {
  position: 'relative',
  width: '90%',
  maxWidth: '960px',
  height: '500px',
  margin: '0 auto',
};

const iframeStyle = {
  width: '100%',
  height: '100%',
  zIndex: 1,
};

const overlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 2,
  backgroundColor: 'transparent', // optional: use rgba(0,0,0,0.1) to show dimmed effect
  cursor: 'not-allowed',
};

const controlsStyle = {
  marginTop: '20px',
};

const btnStyle = {
  padding: '10px 20px',
  margin: '0 10px',
  backgroundColor: '#6b8e72',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '4px',
  fontSize: '16px',
};

export default WatchVideo;
