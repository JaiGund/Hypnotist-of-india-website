import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const WatchVideo = () => {
  const { videoId } = useParams();
  const playerRef = useRef(null);
  const [isYTReady, setIsYTReady] = useState(false);
  const [videoInfo, setVideoInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hasPurchased, setHasPurchased] = useState(false); // Set this based on your backend
  const [isPlaying, setIsPlaying] = useState(false);

  // Load YouTube Iframe API
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

  // Fetch video data
  useEffect(() => {
    const fetchVideoInfo = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/homevideos/${videoId}`, {
          withCredentials: true,
        });
        setVideoInfo(res.data);
        setLoading(false);

        // In the future: Set hasPurchased based on backend response
        // For now, fake it: setHasPurchased(true); 
      } catch (err) {
        setError('Failed to fetch video');
        setLoading(false);
      }
    };

    fetchVideoInfo();
  }, [videoId]);

  // Load the player
  useEffect(() => {
    if (isYTReady && !playerRef.current && videoInfo) {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: videoInfo.videoId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
        },
      });
    }
  }, [isYTReady, videoInfo]);

  const playVideo = () => {
    if (playerRef.current) {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const pauseVideo = () => {
    if (playerRef.current) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    }
  };

  const handleBuyNow = async () => {
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/payment/order',
        { videoId: videoInfo._id }, // Pass videoId for purchasing videos
        { withCredentials: true }
      );
  
      const loadRazorpayScript = () => {
        return new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });
      };
  
      const isRazorpayLoaded = await loadRazorpayScript();
      if (!isRazorpayLoaded) {
        console.error('Razorpay SDK failed to load.');
        return;
      }
  
      const options = {
        key: data.razorpayKey,
        amount: data.amount,
        currency: data.currency,
        name: 'Meditation Of India',
        description: videoInfo.title,
        order_id: data.orderId,
        handler: async (response) => {
          try {
            const verifyResponse = await axios.post(
              'http://localhost:5000/api/payment/verify',
              {
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
                videoId: videoInfo._id,
              },
              { withCredentials: true }
            );
            console.log(verifyResponse.data.message);
            setHasPurchased(true); // Unlock the video after successful payment
          } catch (err) {
            console.error('Error verifying payment:', err);
          }
        },
        theme: {
          color: '#3399cc',
        },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Error initiating purchase:', err);
    }
  };
  
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const isLocked = videoInfo.isPaid && !hasPurchased;

  return (
    <div style={containerStyle}>
      <h2>{videoInfo.title}</h2>

      <div style={playerWrapperStyle}>
        <div id="youtube-player" style={iframeStyle}></div>
        {/* Overlay always present */}
        <div style={overlayStyle}></div>
      </div>

      {isLocked ? (
        <button onClick={handleBuyNow} style={btnStyle}>
          🔒 Buy Now for ₹{videoInfo.price}
        </button>
      ) : (
        <div style={controlsStyle}>
          <button onClick={playVideo} style={btnStyle}>▶️ Play</button>
          <button onClick={pauseVideo} style={btnStyle}>⏸ Pause</button>
        </div>
      )}
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
  backgroundColor: 'rgba(0,0,0,0)',
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
