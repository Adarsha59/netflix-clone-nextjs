// app/api/movies/route.js

import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.TMDB_API_KEY; // Ensure you have your API key stored in an environment variable
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=ne-NP&region=NP&sort_by=popularity.desc&page=1&primary_release_year=2018&with_original_language=hi`
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
