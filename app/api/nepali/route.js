// app/api/movies/route.js

import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.TMDB_API_KEY; // Ensure you have your API key stored in an environment variable
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=hi-IN&region=NP&sort_by=popularity.desc&with_original_language=ne`
  );
  // const response = await fetch(
  //   `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=hi-IN&region=IN&sort_by=popularity.desc&with_original_language=ta`
  // );
  //  "/discover/movie?language=hi-IN&region=NP&sort_by=popularity.desc&with_original_language=ne"

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
