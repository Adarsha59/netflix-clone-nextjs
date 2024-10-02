// components/CustomVideoPlayer.jsx

"use client";
import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const CustomVideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const player = videojs(videoRef.current, {
      controls: true,
      autoplay: true,
      preload: "auto",
    });

    // Locking and disabling controls
    if (isLocked) {
      player.controlBar.playToggle.hide(); // Hide play/pause
      player.controlBar.progressControl.hide(); // Hide seek bar
      player.controlBar.currentTimeDisplay.hide(); // Hide current time
      player.controlBar.durationDisplay.hide(); // Hide duration
      player.controlBar.fullscreenToggle.hide(); // Hide fullscreen
    } else {
      player.controlBar.playToggle.show(); // Show play/pause
      player.controlBar.progressControl.show(); // Show seek bar
      player.controlBar.currentTimeDisplay.show(); // Show current time
      player.controlBar.durationDisplay.show(); // Show duration
      player.controlBar.fullscreenToggle.show(); // Show fullscreen
    }

    return () => {
      if (player) player.dispose();
    };
  }, [isLocked]);

  return (
    <div>
      <video
        ref={videoRef}
        className="video-js"
        controls
        preload="auto"
        width="600"
      >
        <source src={src} />
        {/* You can add additional sources here if needed */}
      </video>
      <button onClick={() => setIsLocked((prev) => !prev)}>
        {isLocked ? "Unlock Controls" : "Lock Controls"}
      </button>
    </div>
  );
};

export default CustomVideoPlayer;
