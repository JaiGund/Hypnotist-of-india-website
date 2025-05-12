// utils/loadYouTubeAPI.js
export const loadYouTubeAPI = () => {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve(window.YT);
    } else {
      const existingScript = document.getElementById('youtube-api');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.id = 'youtube-api';
        document.body.appendChild(script);
      }

      window.onYouTubeIframeAPIReady = () => {
        resolve(window.YT);
      };
    }
  });
};
