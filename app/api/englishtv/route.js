// app/api/discover/movie/route.js

import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || 1; // Get page number from the query string, default to 1 if not provided
  const apiKey = process.env.TMDB_API_KEY; // Store your API key in an environment variable

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&region=IN&sort_by=popularity.desc&page=${page}&with_original_language=en`
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
