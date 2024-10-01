"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaBackward,
  FaForward,
  FaSearch,
  FaCog,
  FaClosedCaptioning,
} from "react-icons/fa";
import { IoMdVolumeHigh, IoMdVolumeOff } from "react-icons/io";

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showCaptions, setShowCaptions] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [quality, setQuality] = useState("720p");

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  }, [videoRef]);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setShowOverlay(true); // Show details overlay when paused
      setIsPaused(true);
    } else {
      videoRef.current.play();
      setShowOverlay(false); // Hide details overlay when playing
      setIsPaused(false);
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleSkip = (seconds) => {
    videoRef.current.currentTime += seconds;
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      videoRef.current.volume = volume;
      setIsMuted(false);
    } else {
      videoRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const handleQualityChange = (e) => {
    setQuality(e.target.value);
    // Logic to change video quality source can be added here
  };

  return (
    <div className="relative w-full h-screen bg-black">
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onClick={togglePlay}
        src="https://youtu.be/0RXnxRHGc6Q?si=x5P2rY1Eyri92M_z" // Use a direct MP4 link here
      >
        Your browser does not support the video tag.
      </video>

      {/* Central Play/Pause Button */}
      <button
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-4 transition-all duration-300"
        onClick={togglePlay}
      >
        {isPaused ? (
          <FaPlay className="text-4xl text-black" />
        ) : isPlaying ? (
          <FaPause className="text-4xl text-black" />
        ) : (
          <FaPlay className="text-4xl text-black" />
        )}
      </button>

      {/* Skip Buttons in the Center */}
      {isPaused && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-4">
          <button
            className="bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2"
            onClick={() => handleSkip(-10)}
          >
            <FaBackward className="text-xl text-black" />
          </button>
          <button
            className="bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2"
            onClick={() => handleSkip(10)}
          >
            <FaForward className="text-xl text-black" />
          </button>
        </div>
      )}

      {/* Control Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-4">
            <button
              className="hover:text-blue-400 transition-colors duration-300"
              onClick={() => handleSkip(-10)}
            >
              <FaBackward />
            </button>
            <button
              className="hover:text-blue-400 transition-colors duration-300"
              onClick={togglePlay}
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button
              className="hover:text-blue-400 transition-colors duration-300"
              onClick={() => handleSkip(10)}
            >
              <FaForward />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <span>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            <button
              className="hover:text-blue-400 transition-colors duration-300"
              onClick={() => setShowSearch(!showSearch)}
            >
              <FaSearch />
            </button>
            <button
              className="hover:text-blue-400 transition-colors duration-300"
              onClick={() => setShowCaptions(!showCaptions)}
            >
              <FaClosedCaptioning />
            </button>
            <div className="flex items-center">
              <button
                className="hover:text-blue-400 transition-colors duration-300 mr-2"
                onClick={toggleMute}
              >
                {isMuted ? <IoMdVolumeOff /> : <IoMdVolumeHigh />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20"
              />
            </div>

            {/* Quality Selector */}
            <select
              className="bg-gray-800 text-white p-2 rounded ml-4"
              value={quality}
              onChange={handleQualityChange}
            >
              <option value="360p">360p</option>
              <option value="480p">480p</option>
              <option value="720p">720p</option>
              <option value="1080p">1080p</option>
            </select>
          </div>
        </div>
      </div>

      {/* Video Details Overlay */}
      {showOverlay && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-lg">
            <h2 className="text-2xl font-bold mb-2">Video Title</h2>
            <p className="mb-2">Episode 1 | Season 1</p>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>Runtime: {formatTime(duration)}</p>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {showSearch && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Search</h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowSearch(false)}
              >
                &times;
              </button>
            </div>
            <input
              type="text"
              placeholder="Search for cast, similar titles..."
              className="w-full p-2 border border-gray-300 rounded"
            />
            {/* Add search results here */}
          </div>
        </div>
      )}

      {/* Captions and Language Options */}
      {showCaptions && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-4">
          <div className="text-white">
            <h4 className="font-bold mb-2">Select Language</h4>
            <button className="hover:text-blue-400">English</button>
            <button className="hover:text-blue-400 ml-4">Spanish</button>
            <button className="hover:text-blue-400 ml-4">French</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
