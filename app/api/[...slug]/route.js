import axios from "axios";

export async function GET(request, { params }) {
  const { slug } = params;
  const endpoint = slug.join("/");
  console.log("endpoint", endpoint); // Combine the slug parts into a single endpoint
  const apiUrl = `https://api.themoviedb.org/3/${endpoint}`; // Construct the full API URL
  const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const options = {
    method: "GET",
    url: apiUrl,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`, // Replace with your actual token
    },
  };

  try {
    const response = await axios.request(options);
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.response?.status || 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
