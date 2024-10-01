"use client";

import English from "../components/alleng";
import Hin from "../components/allhin";

// Make sure your Card component is properly exported

const AllMovie = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-6">All Movies Page</h1>
      <Hin />
      <English />
    </div>
  );
};

export default AllMovie;
