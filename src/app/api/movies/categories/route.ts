import axios from "axios";
import { NextResponse } from "next/server";
import { MOVIE_DB_BASE_URL } from "~/constants/request";
import { MOVIE_DB_API_KEY } from "~/constants/env";

export async function GET() {
  const response = await axios.get(`${MOVIE_DB_BASE_URL}/genre/movie/list`, {
    params: {
      api_key: MOVIE_DB_API_KEY,
    },
  });

  return NextResponse.json(response.data);
}
