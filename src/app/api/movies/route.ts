import axios from "axios";
import { NextResponse } from "next/server";
import { MOVIE_DB_BASE_URL } from "~/constants/request";
import { MOVIE_DB_API_KEY } from "~/constants/env";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    const page = searchParams.get("page") ?? "1";

    searchParams.set("api_key", MOVIE_DB_API_KEY);
    searchParams.set("page", page);
    searchParams.set("include_adult", "false");
    searchParams.set("include_video", "false");

    const endpoint = query
      ? `${MOVIE_DB_BASE_URL}/search/movie`
      : `${MOVIE_DB_BASE_URL}/discover/movie`;

    const response = await axios.get(endpoint, {
      params: searchParams,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: 500 },
    );
  }
}
