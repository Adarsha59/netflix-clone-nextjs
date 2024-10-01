// "use client";
// import React, { useState, useEffect } from "react";
// import { FaPlay, FaInfo, FaStar, FaPlus, FaShare } from "react-icons/fa";
// import { IoMdClose } from "react-icons/io";
// import ContentOverviewModal from "./Modal";

// const Card = ({ carouselItems }) => {
//   const [hoveredItem, setHoveredItem] = useState(null);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const handleHover = (id) => {
//     setHoveredItem(id);
//     console.log(`Hovered over item: ${id}`);
//   };

//   const handlePlayNow = (id) => {
//     console.log(`Play Now clicked for item: ${id}`);
//     // Implement play functionality here
//   };

//   const handleViewMore = (item) => {
//     setSelectedItem(item);
//     setShowModal(true);
//     console.log(`View More clicked for item: ${item.id}`);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setSelectedItem(null);
//   };

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === "Escape") {
//         handleCloseModal();
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   return (
//     <>
//       <div className="flex space-x-4 overflow-x-auto pb-4">
//         {carouselItems.map((item) => (
//           <div
//             key={item.id}
//             className="relative flex-shrink-0 w-64 h-96 rounded-lg overflow-hidden transition-all duration-300 ease-in-out"
//             onMouseEnter={() => handleHover(item.id)}
//             onMouseLeave={() => setHoveredItem(null)}
//             style={{
//               transform: hoveredItem === item.id ? "scale(1.05)" : "scale(1)",
//               boxShadow:
//                 hoveredItem === item.id
//                   ? "0 10px 20px rgba(0,0,0,0.2)"
//                   : "none",
//             }}
//           >
//             <img
//               src={item.image}
//               alt={item.title}
//               className="w-full h-full object-cover"
//             />
//             {hoveredItem === item.id && (
//               <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-end p-4">
//                 <h3 className="text-white text-xl font-bold mb-2">
//                   {item.title}
//                 </h3>
//                 <p className="text-gray-300 text-sm mb-4">{item.description}</p>
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => handlePlayNow(item.id)}
//                     className="flex items-center justify-center bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors duration-200"
//                     aria-label="Play Now"
//                   >
//                     <FaPlay className="mr-2" /> Play Now
//                   </button>
//                   <button
//                     onClick={() => handleViewMore(item)}
//                     className="flex items-center justify-center bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-200"
//                     aria-label="View More"
//                   >
//                     <FaInfo className="mr-2" /> View More
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Use ContentOverviewModal here */}
//       {/* <ContentOverviewModal

//       /> */}
//       <ContentOverviewModal
//         isOpen={showModal}
//         onClose={handleCloseModal}
//         content={selectedItem}
//       />
//     </>
//   );
// };

// export default Card;

// import axios from "axios";

// export async function GET(request, { params }) {
//   const { slug } = params;
//   const endpoint = slug.join("/");
//   console.log("endpoint", endpoint); // Combine the slug parts into a single endpoint
//   const apiUrl = `https://api.themoviedb.org/3/${endpoint}`; // Construct the full API URL
//   const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;
//   const options = {
//     method: "GET",
//     url: apiUrl,
//     headers: {
//       accept: "application/json",
//       Authorization: `Bearer ${token}`, // Replace with your actual token
//     },
//   };

//   try {
//     const response = await axios.request(options);
//     return new Response(JSON.stringify(response.data), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: error.response?.status || 500,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }
// }
// import axios from "axios";

// export async function GET(request, { params }) {
//   const { slug } = params;
//   const endpoint = slug.join("/");
//   console.log("endpoint", endpoint); // Combine the slug parts into a single endpoint
//   const apiUrl = `https://api.themoviedb.org/3/${endpoint}`; // Construct the full API URL
//   const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;
//   const options = {
//     method: "GET",
//     url: apiUrl,
//     headers: {
//       accept: "application/json",
//       Authorization: `Bearer ${token}`, // Replace with your actual token
//     },
//   };

//   try {
//     const response = await axios.request(options);
//     return new Response(JSON.stringify(response.data), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: error.response?.status || 500,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }
// }
