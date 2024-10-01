import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query"); // Get the search query from the request
  const page = searchParams.get("page") || 1; // Default to page 1 if not provided
  const apiKey = process.env.TMDB_API_KEY; // Store TMDB API key in environment variable

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=hi-IN&query=${query}&page=${page}&include_adult=false`
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
