// // "use client";
// // import React, { useState, useEffect } from "react";
// // import { FaPlay, FaInfo, FaStar, FaPlus, FaShare } from "react-icons/fa";
// // import { IoMdClose } from "react-icons/io";
// // import ContentOverviewModal from "./Modal";

// // const Card = ({ carouselItems }) => {
// //   const [hoveredItem, setHoveredItem] = useState(null);
// //   const [selectedItem, setSelectedItem] = useState(null);
// //   const [showModal, setShowModal] = useState(false);

// //   const handleHover = (id) => {
// //     setHoveredItem(id);
// //     console.log(`Hovered over item: ${id}`);
// //   };

// //   const handlePlayNow = (id) => {
// //     console.log(`Play Now clicked for item: ${id}`);
// //     // Implement play functionality here
// //   };

// //   const handleViewMore = (item) => {
// //     setSelectedItem(item);
// //     setShowModal(true);
// //     console.log(`View More clicked for item: ${item.id}`);
// //   };

// //   const handleCloseModal = () => {
// //     setShowModal(false);
// //     setSelectedItem(null);
// //   };

// //   useEffect(() => {
// //     const handleKeyDown = (event) => {
// //       if (event.key === "Escape") {
// //         handleCloseModal();
// //       }
// //     };

// //     window.addEventListener("keydown", handleKeyDown);

// //     return () => {
// //       window.removeEventListener("keydown", handleKeyDown);
// //     };
// //   }, []);

// //   return (
// //     <>
// //       <div className="flex space-x-4 overflow-x-auto pb-4">
// //         {carouselItems.map((item) => (
// //           <div
// //             key={item.id}
// //             className="relative flex-shrink-0 w-64 h-96 rounded-lg overflow-hidden transition-all duration-300 ease-in-out"
// //             onMouseEnter={() => handleHover(item.id)}
// //             onMouseLeave={() => setHoveredItem(null)}
// //             style={{
// //               transform: hoveredItem === item.id ? "scale(1.05)" : "scale(1)",
// //               boxShadow:
// //                 hoveredItem === item.id
// //                   ? "0 10px 20px rgba(0,0,0,0.2)"
// //                   : "none",
// //             }}
// //           >
// //             <img
// //               src={item.image}
// //               alt={item.title}
// //               className="w-full h-full object-cover"
// //             />
// //             {hoveredItem === item.id && (
// //               <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-end p-4">
// //                 <h3 className="text-white text-xl font-bold mb-2">
// //                   {item.title}
// //                 </h3>
// //                 <p className="text-gray-300 text-sm mb-4">{item.description}</p>
// //                 <div className="flex space-x-2">
// //                   <button
// //                     onClick={() => handlePlayNow(item.id)}
// //                     className="flex items-center justify-center bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors duration-200"
// //                     aria-label="Play Now"
// //                   >
// //                     <FaPlay className="mr-2" /> Play Now
// //                   </button>
// //                   <button
// //                     onClick={() => handleViewMore(item)}
// //                     className="flex items-center justify-center bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-200"
// //                     aria-label="View More"
// //                   >
// //                     <FaInfo className="mr-2" /> View More
// //                   </button>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         ))}
// //       </div>

// //       {/* Use ContentOverviewModal here */}
// //       {/* <ContentOverviewModal

// //       /> */}
// //       <ContentOverviewModal
// //         isOpen={showModal}
// //         onClose={handleCloseModal}
// //         content={selectedItem}
// //       />
// //     </>
// //   );
// // };

// // export default Card;

// // import axios from "axios";

// // export async function GET(request, { params }) {
// //   const { slug } = params;
// //   const endpoint = slug.join("/");
// //   console.log("endpoint", endpoint); // Combine the slug parts into a single endpoint
// //   const apiUrl = `https://api.themoviedb.org/3/${endpoint}`; // Construct the full API URL
// //   const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;
// //   const options = {
// //     method: "GET",
// //     url: apiUrl,
// //     headers: {
// //       accept: "application/json",
// //       Authorization: `Bearer ${token}`, // Replace with your actual token
// //     },
// //   };

// //   try {
// //     const response = await axios.request(options);
// //     return new Response(JSON.stringify(response.data), {
// //       status: 200,
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //     });
// //   } catch (error) {
// //     return new Response(JSON.stringify({ error: error.message }), {
// //       status: error.response?.status || 500,
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //     });
// //   }
// // }
// // import axios from "axios";

// // export async function GET(request, { params }) {
// //   const { slug } = params;
// //   const endpoint = slug.join("/");
// //   console.log("endpoint", endpoint); // Combine the slug parts into a single endpoint
// //   const apiUrl = `https://api.themoviedb.org/3/${endpoint}`; // Construct the full API URL
// //   const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;
// //   const options = {
// //     method: "GET",
// //     url: apiUrl,
// //     headers: {
// //       accept: "application/json",
// //       Authorization: `Bearer ${token}`, // Replace with your actual token
// //     },
// //   };

// //   try {
// //     const response = await axios.request(options);
// //     return new Response(JSON.stringify(response.data), {
// //       status: 200,
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //     });
// //   } catch (error) {
// //     return new Response(JSON.stringify({ error: error.message }), {
// //       status: error.response?.status || 500,
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //     });
// //   }
// // }

// // "use client";

// // import React, { useState, useRef, useEffect } from "react";
// // import ReactPlayer from "react-player";
// // import {
// //   FaPlay,
// //   FaPause,
// //   FaExpand,
// //   FaCompress,
// //   FaVolumeUp,
// //   FaVolumeMute,
// //   FaRedo,
// //   FaSun,
// //   FaMoon,
// //   FaDownload,
// // } from "react-icons/fa";
// // import { BiServer } from "react-icons/bi";

// // const VideoPlayerComponent = () => {
// //   const [playing, setPlaying] = useState(false);
// //   const [volume, setVolume] = useState(1);
// //   const [muted, setMuted] = useState(false);
// //   const [played, setPlayed] = useState(0);
// //   const [loaded, setLoaded] = useState(0);
// //   const [duration, setDuration] = useState(0);
// //   const [playbackRate, setPlaybackRate] = useState(1);
// //   const [loop, setLoop] = useState(false);
// //   const [lightMode, setLightMode] = useState(false);
// //   const [fullscreen, setFullscreen] = useState(false);
// //   const [currentServer, setCurrentServer] = useState(1);

// //   const playerRef = useRef(null);
// //   const playerContainerRef = useRef(null);

// //   const videoUrls = {
// //     1: "https://videos.pexels.com/video-files/3614334/3614334-hd_1920_1080_25fps.mp4",
// //     2: "https://videos.pexels.com/video-files/3614334/3614334-hd_1920_1080_25fps.mp4",
// //     3: "https://example.com/video3.mp4",
// //   };

// //   const handlePlayPause = () => setPlaying(!playing);
// //   const handleVolumeChange = (e) => setVolume(parseFloat(e.target.value));
// //   const handleToggleMute = () => setMuted((prev) => !prev);
// //   const handleProgress = (state) => {
// //     setPlayed(state.played);
// //     setLoaded(state.loaded);
// //   };
// //   const handleDuration = (duration) => setDuration(duration);
// //   const handlePlaybackRateChange = (rate) => setPlaybackRate(rate);
// //   const handleToggleLoop = () => setLoop((prev) => !prev);
// //   const handleToggleLightMode = () => setLightMode((prev) => !prev);

// //   const handleFullscreen = () => {
// //     if (!fullscreen) {
// //       playerContainerRef.current.requestFullscreen();
// //     } else {
// //       document.exitFullscreen();
// //     }
// //     setFullscreen((prev) => !prev);
// //   };

// //   const handleServerChange = (server) => {
// //     setCurrentServer(server);
// //     setPlaying(true);
// //   };

// //   const handleDownload = (quality) => {
// //     // Implement download logic here
// //     console.log(`Downloading ${quality} version`);
// //   };

// //   const formatTime = (seconds) => {
// //     const date = new Date(seconds * 1000);
// //     const hh = date.getUTCHours();
// //     const mm = date.getUTCMinutes();
// //     const ss = date.getUTCSeconds().toString().padStart(2, "0");
// //     return hh ? `${hh}:${mm.toString().padStart(2, "0")}:${ss}` : `${mm}:${ss}`;
// //   };

// //   // Keyboard controls
// //   useEffect(() => {
// //     const handleKeydown = (e) => {
// //       switch (e.key) {
// //         case "ArrowRight":
// //           playerRef.current.seekTo(played + 0.05); // Seek forward
// //           break;
// //         case "ArrowLeft":
// //           playerRef.current.seekTo(played - 0.05); // Seek backward
// //           break;
// //         case " ":
// //           handlePlayPause(); // Toggle play/pause
// //           break;
// //         case "ArrowUp":
// //           setVolume((prev) => Math.min(prev + 0.1, 1)); // Increase volume
// //           break;
// //         case "ArrowDown":
// //           setVolume((prev) => Math.max(prev - 0.1, 0)); // Decrease volume
// //           break;
// //         default:
// //           break;
// //       }
// //     };

// //     window.addEventListener("keydown", handleKeydown);
// //     return () => {
// //       window.removeEventListener("keydown", handleKeydown);
// //     };
// //   }, [playing, played]);

// //   return (
// //     <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
// //       <h1 className="text-4xl font-bold mb-6 text-indigo-400">
// //         Awesome Video Player
// //       </h1>
// //       <div
// //         ref={playerContainerRef}
// //         className="relative w-full h-3/4 max-w-4xl mb-4"
// //       >
// //         <ReactPlayer
// //           ref={playerRef}
// //           url={videoUrls[currentServer]}
// //           width="100%"
// //           height="100%"
// //           playing={playing}
// //           volume={volume}
// //           muted={muted}
// //           playbackRate={playbackRate}
// //           loop={loop}
// //           light={lightMode}
// //           onProgress={handleProgress}
// //           onDuration={handleDuration}
// //           config={{
// //             file: {
// //               attributes: {
// //                 controlsList: "nodownload",
// //               },
// //             },
// //           }}
// //         />
// //         <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 flex flex-col">
// //           <div className="flex items-center justify-between mb-2">
// //             <button
// //               onClick={handlePlayPause}
// //               className="text-3xl hover:text-indigo-400 transition"
// //             >
// //               {playing ? <FaPause /> : <FaPlay />}
// //             </button>
// //             <div className="flex items-center space-x-4">
// //               <button
// //                 onClick={handleToggleMute}
// //                 className="text-3xl hover:text-indigo-400 transition"
// //               >
// //                 {muted ? <FaVolumeMute /> : <FaVolumeUp />}
// //               </button>
// //               <input
// //                 type="range"
// //                 min={0}
// //                 max={1}
// //                 step={0.1}
// //                 value={volume}
// //                 onChange={handleVolumeChange}
// //                 className="w-32 accent-indigo-400"
// //               />
// //             </div>
// //           </div>
// //           <div className="flex items-center justify-between">
// //             <span>{formatTime(played * duration)}</span>
// //             <input
// //               type="range"
// //               min={0}
// //               max={0.999999}
// //               step="any"
// //               value={played}
// //               onChange={(e) =>
// //                 playerRef.current.seekTo(parseFloat(e.target.value))
// //               }
// //               className="w-full mx-2 accent-indigo-400"
// //             />
// //             <span>{formatTime(duration)}</span>
// //           </div>
// //         </div>
// //       </div>
// //       <div className="flex flex-wrap justify-center gap-2 mb-4">
// //         {[1, 1.2, 1.3].map((rate) => (
// //           <button
// //             key={rate}
// //             onClick={() => handlePlaybackRateChange(rate)}
// //             className={`px-4 py-2 rounded transition duration-200 ${
// //               playbackRate === rate
// //                 ? "bg-indigo-600 text-white"
// //                 : "bg-gray-700 hover:bg-gray-600"
// //             }`}
// //           >
// //             {rate}x
// //           </button>
// //         ))}
// //         <button
// //           onClick={handleToggleLoop}
// //           className={`px-4 py-2 rounded transition duration-200 ${
// //             loop ? "bg-indigo-600 text-white" : "bg-gray-700 hover:bg-gray-600"
// //           }`}
// //         >
// //           <FaRedo />
// //         </button>
// //         <button
// //           onClick={handleToggleLightMode}
// //           className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
// //         >
// //           {lightMode ? <FaMoon /> : <FaSun />}
// //         </button>
// //         <button
// //           onClick={handleFullscreen}
// //           className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
// //         >
// //           {fullscreen ? <FaCompress /> : <FaExpand />}
// //         </button>
// //       </div>
// //       <div className="flex justify-center gap-2 mb-4">
// //         {[1, 2, 3].map((server) => (
// //           <button
// //             key={server}
// //             onClick={() => handleServerChange(server)}
// //             className={`flex items-center px-4 py-2 rounded transition duration-200 ${
// //               currentServer === server
// //                 ? "bg-indigo-600 text-white"
// //                 : "bg-gray-700 hover:bg-gray-600"
// //             }`}
// //           >
// //             <BiServer className="mr-2" /> Server {server}
// //           </button>
// //         ))}
// //       </div>
// //       <div className="flex justify-center gap-2">
// //         {["720p", "480p", "360p"].map((quality) => (
// //           <button
// //             key={quality}
// //             onClick={() => handleDownload(quality)}
// //             className="flex items-center px-4 py-2 rounded bg-green-600 text-white hover:bg-green-500 transition"
// //           >
// //             <FaDownload className="mr-2" /> Download {quality}
// //           </button>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default VideoPlayerComponent;

// import React from "react";
// import ReactPlayer from "react-player";

// import React from "react";

// const page = () => {
//   return (
//     <div>
//       // Render a YouTube video player
//       <ReactPlayer url="https://www.youtube.com/watch?v=LXb3EKWsInQ" />
//     </div>
//   );
// };

// export default page;
