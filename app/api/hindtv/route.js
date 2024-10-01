// app/api/movies/route.js

import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.TMDB_API_KEY; // Store your API key in an environment variable
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=hi-IN&region=IN&sort_by=popularity.desc&page=${page}&with_original_language=hi`
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
