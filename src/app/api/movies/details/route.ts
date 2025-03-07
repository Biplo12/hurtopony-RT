import axios from "axios";
import { NextResponse } from "next/server";
import { MOVIE_DB_BASE_URL } from "~/constants/request";
import { MOVIE_DB_API_KEY } from "~/constants/env";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const movieId = searchParams.get("movieId");

  const response = await axios.get(`${MOVIE_DB_BASE_URL}/movie/${movieId}`, {
    params: {
      api_key: MOVIE_DB_API_KEY,
    },
  });

  return NextResponse.json(response.data);
}
